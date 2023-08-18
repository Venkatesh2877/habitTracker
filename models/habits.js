const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Number,
        required:true
    }
},{
    timestamps:true  
});

const habit=mongoose.model('Habit',habitSchema);
module.exports=habit;