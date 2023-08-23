const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    dates:[{
        date: String,
        complete: String
    }]
},{
    timestamps:true  
});

const habits=mongoose.model('Habit',habitSchema);
module.exports=habits;