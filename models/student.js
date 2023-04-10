const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({

    fullName : {
        type : String,
        required : true
    },
    presence:[{
        type: Boolean,
        date:{
            type: Date,
            required : true
        }
    }],
    leave:[{
        type: String,
        status: { type: String},
        fromDate:{
            type: Date,
            required: true
        },
        toDate:{
            type: Date,
            required: true
        }}
    ]
},
{
    timestamps : true
});

module.exports=mongoose.model('student' , studentSchema);