var argv = require('yargs').argv;
var ItemDAO = require('../dao/ItemDAO');
var TIMEOUT = argv.timeout || 30*1000;
var assignedSkill = argv.skill;

function updateAllSkillItemPrices(index, assignedSkill) {
    var skills = ['cooking', 'fletching', 'smithing', 'crafting'];
    if(!assignedSkill){
        assignedSkill = skills[index];
    }

    return ItemDAO.updateTablePrices(assignedSkill).then(function (data) {
        if ((index + 1) < skills.length) {
            setTimeout(function () {
                if(!assignedSkill){
                    updateAllSkillItemPrices(index + 1);
                }
            }, TIMEOUT);
        }
    });
}
exports.updateAllSkillItemPrices = updateAllSkillItemPrices;


updateAllSkillItemPrices(0, assignedSkill);



