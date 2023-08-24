const Habits=require('../models/habits');

module.exports.home= async function(req,res){
    try{
        let habits=await Habits.find({})

        const days=[];
        days.push(getD(6));
        days.push(getD(5));
        days.push(getD(4));
        days.push(getD(3));
        days.push(getD(2));
        days.push(getD(1));
        days.push(getD(0));

        return res.render('index', {
            title: 'Habit Tracker',
            habits: habits,
            days:days
        });
    }catch(err){
        console.log(err);
    }
}

module.exports.weekly= async function(req,res){
    try{
        let habits=await Habits.find({});

        const days=[];
        days.push(getD(6));
        days.push(getD(5));
        days.push(getD(4));
        days.push(getD(3));
        days.push(getD(2));
        days.push(getD(1));
        days.push(getD(0));

        return res.render('week',{
            title:'week',
            habits:habits,
            days:days
        });
    }catch(err){
        console.log('error', err)
    }
}

function getD(n){
    try{
        const d=new Date();
        d.setDate(d.getDate()-n);
        const newDate= d.toLocaleDateString('pt-br').split('/').reverse().join('-');
        let day;
        switch (d.getDay()) {
            case 0: day = 'Sun'; break;
            case 1: day = 'Mon'; break;
            case 2: day = 'Tue'; break;
            case 3: day = 'Wed'; break;
            case 4: day = 'Thu'; break;
            case 5: day = 'Fri'; break;
            case 6: day = 'Sat'; break;
        }
        return { date: newDate, day };
    }catch(err){
        console.log(err);
        return { date: '', day: '' };
    }
}

module.exports.newHabit= async function(req,res){
    const { content } = req.body;
    try {
        const habit = await Habits.findOne({ content: content });
    
        if (habit) {
            // --------- Update existing habit ----------//
            const dates = habit.dates;
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    
            const existingDate = dates.find(item => item.date === today);
    
            if (existingDate) {
                console.log("Habit exists!");
                res.redirect('back');
            } else {
                dates.push({ date: today, complete: 'none' });
                habit.dates = dates;
                await habit.save();
               //console.log(habit);
                res.redirect('back');
            }
        } else {
            const dates = [];
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
    
            const newHabit = await Habits.create({
                content:content,
                dates: dates
            });

            if(req.xhr){
            
                return res.status(200).json({
                    data:{
                        habit: newHabit
                    },
                    message:"Habit created"
                })
            }
            console.log(newHabit);
            res.redirect('back');
        }
    } catch (err) {
        console.error(err);
    }    
}

module.exports.delete= async function(req,res){
    try{
        await Habits.findOneAndDelete({_id: req.query.id});

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

module.exports.completeStatusUpdate= async function(req,res){
    let d= req.query.date;
    let id=req.query.id;

    try{
        let habit= await Habits.findById(id);
        

        if(habit){
            let dates= habit.dates;
            let found=false;

          let date= dates.find(item=>{
                return item.date===d;
            })
            
            if(date){
                if(date.complete=='none'){
                    date.complete='yes';
                }else if(date.complete=='yes'){
                    date.complete='no';
                }else if(date.complete=='no'){
                    date.complete='none';
                }

                found=true;
            }
           
            if(!found){
                dates.push({date:d, complete: 'yes'})
            }
        }
        await habit.save();
        return res.redirect('back');
    }catch(err){
        console.log(err);
    }

}

