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
var GroupSchema = require('../schemas/deviceGroups')
// require Bluebird instead of native Prommises
var Promise = require('bluebird');
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var deviceGroupDAO = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
deviceGroupDAO.createDeviceGroup = function(groupName, groupLatitude, groupLongitude, countryCode) {
    console.log(`Creating group: '${groupName}' with country code ${countryCode}, lat ${groupLatitude} and long ${groupLongitude}`);
    
    // attempt to find the group first
    return  GroupSchema.deviceGroupSchema.findOneAndUpdate(
        // search based on this criteria
        {
            groupLat : groupLatitude,
            groupLong : groupLongitude
        },
        // if the above returns a document, update that document, otherwise insert a new one
        {
                groupName : groupName,
                groupLat : groupLatitude,
                groupLong : groupLongitude,
                countryCode: countryCode
            },
       {
           upsert: true,
           new : true
        }) // should update an existing document     
    .then(function(out) { // return the DB insert results to the calling function
        console.log("DB Response" + out)
        return(out)
    })
    .catch(function(err){
        return (err)
    });
}




deviceGroupDAO.findDeviceGroups = function(countryCode) {
    return GroupSchema.deviceGroupSchema.find({
                countryCode : countryCode
            })
    .then(function(data) {
        console.log(data)
        return (data) ;
    });
}


module.exports = deviceGroupDAO;

