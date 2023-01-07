const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 20;

    const products = [];

    for (let i = 0; i < limit; i++) {
      products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }

    this.products = products;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw boom.notFound('product not found');
    if (product.isBlock) throw boom.conflict('product is blocked');
    return product;
  }

  async create(data) {
    const newProduct = { id: faker.datatype.uuid(), ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('product not found');

    const product = this.products[index];
    this.products[index] = { ...product, ...changes };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('product not found');
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
