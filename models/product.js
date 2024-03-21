const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);


const getProductsFromFile = cb => {
  // console.log(p)
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      console.log('File Content:', fileContent.toString()); // Convert Buffer to string for logging
      try {
        const parsedData = JSON.parse(fileContent);
        cb(parsedData);
      } catch (parseError) {
        // console.error('Error parsing JSON:', parseError);
        cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
