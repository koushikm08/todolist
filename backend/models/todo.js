const mongoose = require('mongoose');
const todoschema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    important:{
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model('todo',todoschema);