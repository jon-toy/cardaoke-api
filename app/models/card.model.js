const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CardSchema = mongoose.Schema({
    type: String,
    description: String
});

module.exports = mongoose.model('Card', CardSchema);