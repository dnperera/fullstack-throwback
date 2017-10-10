var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/hackoverflow';

var db = mongoose.connect(mongoUri);

module.exports = db;
