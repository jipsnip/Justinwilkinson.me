var db = require('../../config/database');
var Bluebird = require('bluebird');

/**
 *
 * @param table
 * @param values
 */
function insert(table, values) {
    return new Bluebird(function (resolve, reject) {
        db[table].insert(values, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
exports.insert = insert;

/**
 *
 * @param table
 * @param values
 */
function save(table, values) {
    return new Bluebird(function (resolve, reject) {
        db[table].save(values, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
exports.save = save;

/**
 *
 * @param table
 * @param query
 * @param values
 */
function update(table, query, values) {
    return new Bluebird(function (resolve, reject) {
        db[table].update(query, values, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
exports.update = update;

/**
 *
 * @param table
 * @param query
 */
function destroy(table, query) {
    return new Bluebird(function (resolve, reject) {
        db[table].destroy(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
exports.destroy = destroy;

/**
 *
 * @param {string} table
 * @param {object} query
 * @param {object=} options
 */
function find(table, query, options) {
    return new Bluebird(function (resolve, reject) {
        if (table) {
            db[table].find(query, options, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } else {
            reject({
                message: 'No table found.',
                data: {
                    table: table,
                    query: query,
                    options: options
                }
            });
        }
    });
}
exports.find = find;