var request = require('request');
var cheerio = require('cheerio');
var URL = 'http://services.runescape.com/m=hiscore/ranking?category_type=0&table=0&time_filter=0&date=1501299812913&page=';
var fs = require('fs');
var Bluebird = require('bluebird');
var COMPARE_URL = 'http://services.runescape.com/m=hiscore/compare?user1=';
var USER_URL = 'http://services.runescape.com/m=hiscore/ranking?table=0&category_type=0&time_filter=0&date=1503469832163&user=';

function makeRequest(url){
    return new Promise(function(resolve, reject){
        request(url, function(err, res, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
}


function getOverallRankingPage(pageNum){
    makeRequest(URL + pageNum).then(function(data){
        var playerList = [];
        var $ = cheerio.load(data);
        var mapObj = {
            0: 'rank',
            1: 'rsn',
            2: 'overall_level',
            3: 'overall_xp'
        };
        $('tr').each(function(index, element){
            if(element.attribs.class !== undefined){
                var player = {};
                $(element).children().each(function(e, elem){
                    var text = $(elem).text().trim();
                    player[mapObj[e]] = text;
                });
                player['detail_url'] = COMPARE_URL + player.rsn;
                playerList.push(player);
            }
        });
        return Bluebird.mapSeries(playerList, getDetailPage);
    });
}

function scrapeDetailPage(data, player){
    var $ = cheerio.load(data);
    var skillMapping = {}
    var mapObj = {
        0: 'rank',
        1: 'total_xp',
        2: 'level'
    };
    $('section[class="skillIcons"]').children().each(function(index, elem){
       skillMapping[index] = elem.attribs.title;
    });

    $('table[class="headerBgLeft"] tbody tr').each(function(index, element){
        $(element).children().each(function(e, elem){
            var text = $(elem).children().text().trim();
            if(!player[skillMapping[index]]){
                player[skillMapping[index]] = {}
            }
            player[skillMapping[index]][mapObj[e]] = text;
        });
    });
    fs.appendFileSync('players/players.json', JSON.stringify(player) + '\n');
}

function getDetailPage(player){
    return makeRequest(player.detail_url).then(
        function(data){
            scrapeDetailPage(data, player);
        }
    )
}

function getUserImage(){

}


