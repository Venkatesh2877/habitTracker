const express = require('express');
const port=2000;
const app = express();

app.use(express.urlencoded());

const db=require('./config/mongoose.js');



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//access static file 
app.use(express.static('./assets'));

//use expres  router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('issue in the server', err);
        return;
    }
    console.log('server running in port ', port);
})