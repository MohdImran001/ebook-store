//built-in module
const path = require('path');

//third-party modules
const express = require('express');

//custom modules
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/store');
const MongoConnect = require('./utils/database').MongoConnect;

//initialization
const app = express();

//some views config
app.set('view engine', 'ejs');
app.set('views', 'views');

//middlewares
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//application routes
app.use(storeRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).send('No Page Found !');
})

app.use((err, req, res, next) => {
    res.send("Errrrrrrror");
    console.log(err);
})


//server code

MongoConnect(() => {
    app.listen(3000, () => {
        console.log('server has started...');
    })
});

// TODO:
// 1) set up the view for content 
// 2) style the forms
// 3) upload it
