/*
The following code was taken from:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Defining_and_creating_models
and modified accordingly
*/


var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

// This collection contains the latitude, longitude and name of each of the groups
const DeviceGroupSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId(), // internal ID that Mongo uses for each document 
    groupLat: {type: mongoose.Schema.Types.Decimal128, required:true},// group latitude used to display a marker on a map. Must be unique for each group
    groupLong: {type: mongoose.Schema.Types.Decimal128, required:true}, // see above
    groupName: {type: String, required:true},
    countryCode: {type: String, required: true}   // Will be populated with a dropdown from the front end so there is "no" chance of inserting wrong data
  });
  
// Compile model from schema
var DeviceGroupModel = mongoose.model('groupModel', DeviceGroupSchema);



// Export the entire schema to access it from other files
// so we can access it with Schema.<schema name> once it has been required
module.exports = {
      deviceGroupSchema : DeviceGroupModel
    };
