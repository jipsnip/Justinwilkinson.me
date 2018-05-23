var db = require('../../config/database');
var runescapeapi = require('runescape-api');
var Promise = require('bluebird');

/**
 * Return all the items in the DB whose xp is that of the given skill, Ascending order on level
 * @param skill
 */
function findItemBySkill(skill) {
    return new Promise(function (resolve, reject) {
        db.items.find({
            item_xp_type: skill
        }, {
            order: "_level asc"
        }, function (err, item) {
            if (err) {
                reject(err);
            }
            else {
                resolve(item);
            }
        });
    });
}
exports.findItemBySkill = findItemBySkill;


/**
 * Returns the price data on the item with the provided id from the API
 * @param id
 */
function findItemPriceById(id) {
    return runescapeapi.rs.ge.itemInformation(id).then(function (price) {
        return price.item.current.price;
    },
    function (err) {
        console.log(err);
    }).catch(function (err) {
        console.log(err);
    });
}
exports.findItemPriceById = findItemPriceById;

/**
 * Updates the item_price field in the db with the provided price
 * @param price
 * @param id
 */
function updatePrimaryItemPrice(price, id) {
    return new Promise(function (resolve, reject) {
        db.items.update({
            item_id: id
        }, {
            item_price: price
        }, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.updatePrimaryItemPrice = updatePrimaryItemPrice;

/**
 * Updates the material_price field in the db with the provided price
 * @param price
 * @param id
 */
function updateMaterialItemPrice(price, id) {
    return new Promise(function (resolve, reject) {
        db.items.update({
            material_id: id
        }, {
            material_price: price
        }, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.updateMaterialItemPrice = updateMaterialItemPrice;

/**
 * Updates the secondary_material_price field in the db with the provided price
 * @param price
 * @param id
 */
function updateSecondaryMaterialPrice(price, id) {
    return new Promise(function (resolve, reject) {
        db.items.update({
            secondary_item_id: id
        }, {
            secondary_material_price: price
        }, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.updateSecondaryMaterialPrice = updateSecondaryMaterialPrice;

/**
 * Middleware function for applying a timeout to the searchForItemPrice() function
 * @param item
 */
function searchForPrimaryItemPrice(item) {
    return wait(15000).then(function(){
        return searchForItemPrice(item.item_id, 'primary');
    });
}

/**
 * Middleware function for applying a timeout to the searchForItemPrice() function
 * @param item
 */
function searchForMaterialItemPrice(item) {
    return wait(15000).then(function(){
        return searchForItemPrice(item.material_id, 'material');
    });
}

/**
 * Middleware function for applying a timeout to the searchForItemPrice() function
 * @param item
 */
function searchForSecondaryMaterialItemPrice(item) {
    return wait(15000).then(function(){
        return searchForItemPrice(item.secondary_item_id, 'secondary_material');
    });
}

/**
 * sets a timeout of t seconds before resolving
 * @param t
 */
function wait(t){
    return new Promise(function(resolve){
        setTimeout(resolve, t);
    });
}

/**
 *
 * @param id
 * @param mode
 * @returns {*}
 */
function searchForItemPrice(id, mode) {
    if (id >= 100000) {
        return Promise.resolve({id: id, price: 0});
    }


    return findItemPriceById(id).then(function (price) {

        if (typeof price === 'string') {
            price = price.replace(/\,/g, '');
            if (price.indexOf('k') >= 0) {
                price = trimOffMoneyUnit(price);
            }
        }
        var actionMap = {
            primary: updatePrimaryItemPrice,
            material: updateMaterialItemPrice,
            secondary_material: updateSecondaryMaterialPrice
        };
        var action = actionMap[mode];
        return action(price, id);
    }, function (err) {
        console.log(err);
        return err;
    });
}

/**
 * Finds all items of a given skill, searches for their prices, then sends the mapped series to mapProfitPrices
 * @param skill
 */
function updateTablePrices(skill) {
    return findItemBySkill(skill).then(function (items) {
        console.log('found items', items);
        return Promise.mapSeries(items, searchForItemPrices).then(mapProfitPrices, Promise.resolve)
        .then(function () {
            return {message: 'success'};
        }, Promise.resolve);
    }, Promise.resolve);
}
exports.updateTablePrices = updateTablePrices;

/**
 * Calculates and updates the profit prices in the db (cost/gpxp/buy)
 * @param items
 * @returns {Array}
 */
function mapProfitPrices(items) {

    return Promise.map(items, function (item) {
        var prices = {};
        while(Array.isArray(item)) {
            item = item[0];
        }
        console.log('item', item);
        var itemPriceData = calculateItemPriceData(item.item_price, item.material_price, item.secondary_material_price, item.material_count, item.item_xp, item.secondary_material_count);
        prices.id = item.item_id;
        prices.cost = itemPriceData.cost;
        prices.gpxp = itemPriceData.gpxp;
        prices.buy = itemPriceData.buy;
        console.log('item price data', itemPriceData);
        return updateProfitPrices(prices);
    }, {concurrency: 4});
}

/**
 * main function for updating the items prices in the DB
 * @param item
 */
function searchForItemPrices(item) {
    console.log('search for prices', item);
    return new Promise(function (resolve, reject) {
        return searchForPrimaryItemPrice(item).then(function (primaryPrice) {
            return searchForMaterialItemPrice(item).then(function (secondaryPrice) {
                if (item.secondary_item_material) {
                    return  searchForSecondaryMaterialItemPrice(item).then(function (secondaryMaterialPrice) {
                        resolve([primaryPrice, secondaryPrice, secondaryMaterialPrice])
                    });
                }
                else {
                    resolve([primaryPrice, secondaryPrice])
                }
            });
        }, function err(err){
            console.log(err);
        });
    }, function err(err){
        console.log(err);
    });
}


/**
 * Calculates the item price data of the items in the DB
 * @param itemPrice
 * @param matPrice
 * @param secMatPrice
 * @param matCount
 * @param itemXp
 * @param secMatCount
 * @returns {{}}
 */
function calculateItemPriceData(itemPrice, matPrice, secMatPrice, matCount, itemXp, secMatCount) {
    var item = {};
    if (secMatPrice) {
        item.buy = ((matPrice * matCount) + (secMatPrice * secMatCount));
    }
    else {
        item.buy = (matPrice * matCount);
    }
    item.cost = (itemPrice - item.buy);
    item.gpxp = (item.cost / itemXp).toFixed(2);
    return item;
}

/**
 * trims off the money unit at the end of a string 'k' or 'm'
 * @param price
 * @returns {number}
 */
function trimOffMoneyUnit(price) {
    var unit = price.substring(price.length - 1, price.length);
    price = parseFloat(price.substring(0, price.length - 1));
    switch (unit) {
        case 'k':
        return (price * 1000);
        case 'm':
        return (price * 1000000);
        default:
        return 0;
    }
}

/**
 * updates the buy/cost/gpxp values in the DB
 * @param prices
 * @returns {*}
 */
function updateProfitPrices(prices) {
    console.log('trying to update price', prices);
    if (isNaN(prices.cost)) {
        return Promise.resolve();
    }

    return new Promise(function (resolve, reject) {
        db.items.update({
            item_id: prices.id
        }, {
            item_cost: prices.cost,
            item_buy: prices.buy,
            item_gpxp: prices.gpxp
        }, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    });
}
exports.updateProfitPrices = updateProfitPrices;