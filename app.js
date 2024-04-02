

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


// db.execute("SELECT * FROM products").then(result=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(userroutes);

app.use(errorController.get404);


sequelize.sync().then(result=>{
    console.log(result);
    app.listen(8080,()=>{
        console.log("SERver running at 8080")
    });
}).catch(err=>{
    console.log(err)
})



