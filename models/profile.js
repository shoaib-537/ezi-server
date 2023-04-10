const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({

    student: {
        type : mongoose.Types.ObjectId,
        ref:'student'
    },
    
    name : {
        type : String,
        required : true,
    },

    size : {
        type : Number,
    },

    path : {
        type : String
    }

},
{
    collection : 'profile'
});
module.exports=mongoose.model('profile' , profileSchema);