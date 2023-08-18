const Habit=require('../models/habits');

module.exports.home= async function(req,res){
    try{
        let habits=await Habit.find({})
        return res.render('home', {
            title: 'Habit Tracker',
            habits: habits
        });
    }catch(err){
        console.log(err);
    }
}
module.exports.weekly=function(req,res){
    return res.render('week',{
        title:'week'
    });
}

module.exports.newHabit= async function(req,res){
    try{
        let newHabit= await Habit.create({
            name:req.body.name,
            completed: req.body.completed
        })
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                    habit:newHabit
                },
                message:"Habit created"
            })
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
    }
}

module.exports.delete= async function(req,res){
    try{
        await Habit.findOneAndDelete({_id: req.query.id});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    habit_id: req.query.id
                },
                message:"Habit deleted"
            })
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
    }  
}