
const db=require('../util/database');



module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT into products (title,price,imageurl,description) values (?,?,?,?)',[this.title,this.price,this.imageUrl,this.description])
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
     return db.execute('select * from products where products.id = ?', [id]);
  }
};
