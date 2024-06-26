

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database');
const Product=require('./models/product');
const User=require('./models/user');
const Cart = require('./models/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const CartItem = require('./models/cartItems');



// db.execute("SELECT * FROM products").then(result=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next();
    }).catch(err=>console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(userroutes);


app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});



sequelize.sync(
    {force:true}
    ).then(result => {
        return User.findByPk(1);
        // console.log(result);
      })
      .then(user => {
        if (!user) {
          return User.create({ name: 'Max', email: 'test@test.com' });
        }
        return user;
      })
      .then(user => {
        // console.log(user);
        app.listen(8080);
      }).catch(err=>{
    console.log(err)
})



