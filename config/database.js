var constants = require('./constants');
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString : constants.DATABASE_CONNECTION_STRING});
module.exports = massiveInstance;