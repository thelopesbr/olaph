
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Member = new Schema({
    id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tag:{
        type: String,
        required: true,
        unique:true
    },
    cargos: [{
        type: String,
    }],
    live: {
        type: Boolean,
        required: true,
    },
    twitch: {
        type: String,
        required: false,
    }

});

module.exports = mongoose.model('Member', Member);