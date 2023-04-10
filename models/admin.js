const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    fullName : {
        type : String,
        required : true
    },
},{
    timestamps:true
});

module.exports=mongoose.model('admin' , adminSchema)
