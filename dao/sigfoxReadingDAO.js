/*
This file interfaces with the MongoDB instance through Mongoose

DB DETAILS on db 'riverscout'
db.createUser({
    user: 'riverscout',
    pwd: 'riverscout',
    roles: [{ role: 'readWrite', db:'riverscout'}]
})

*/

var mongoose = require('mongoose');
// import all of the dependencies (schemas)
var sigfoxDataSchema = require('../schemas/sigfoxDataSchema')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var dao = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
/*
  deviceUID : {type: mongoose.Types.ObjectId, ref: 'deviceModel', required : true}, // name of the model we want to reference
  rawHexData: String, // store the raw data for cases where data has been incorrectly mapped
  waterTemp: mongoose.Types.Decimal128,
  timestamp: Date,
  waterLevel: mongoose.Types.Decimal128
*/
dao.saveDeviceData = function(deviceUID,rawHexData, waterLevel, waterTemp,timestamp) {
    return new sigfoxDataSchema.sigfox_device_measurement({
                deviceUID : deviceUID,
                rawHexData : rawHexData,
                waterLevel: waterLevel,
                waterTemp: waterTemp,
                timestamp : timestamp
            })
    .save()
    .then(function(y) {
        return y // no need to resolve the promise
    })
    .catch(err => {
        return err
    })
}


dao.getDeviceData = function(deviceUID, timestampGt, timestampLt) {
    return Schemas.RiverscoutSchema.find({
                deviceUID : deviceUID,
                "timestamp":{
                    $gt: timestampGt,
                    $lt: timestampLt
                }
            })
    .then(function(data) {
        console.log(data)
        return data ;
    })
    .catch(err => {
        return err
    })
}


module.exports = dao;