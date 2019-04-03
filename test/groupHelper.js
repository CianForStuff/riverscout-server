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
var group = require('../schemas/deviceGroups')
var data = require("./files/groups.json")
// enable Mongoose's debig mode for easier problem solving
// see https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
mongoose.set('debug', true);



var groupHelper = {} // do this so we can use the same name for module.exports while adding functions
// new functions will be accessed by caling DAO.<newFunc>
groupHelper.populate = function() {
    console.log("inserting groups");
    group.deviceGroupSchema.deleteMany({})
    return group.deviceGroupSchema.insertMany(data, function(err) {
        return err
    });
}



module.exports = groupHelper;


