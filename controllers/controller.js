module.exports.home= function(req,res){
    return res.render('home', {
        title: 'Habit Tracker'
    });
}
module.exports.weekly=function(req,res){
    return res.render('week',{
        title:'week'
    });
}