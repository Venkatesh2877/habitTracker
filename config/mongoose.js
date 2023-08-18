const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/habit_list');

const db=mongoose.connection;

db.on('error',console.log.bind(console,"error connecing to mongodb"));

db.once('open', function(){
    console.log('connection to mongodb is sucessful')
});

module.exports=db;