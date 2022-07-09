
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Membro = new Schema({
    id:{
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tag:{
        type: String,
    },
    cargos: [{
        type: String,
    }]
});

module.exports = mongoose.model('Membro', Membro);