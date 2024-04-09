import { faker } from "@faker-js/faker"

class ProductsService {
  constructor() {
    this.products = [];
    this.generate()
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price()
      });
    }
  }

  async getProducts() {
    return this.products;
  }
  async getOneProduct(id) {
    return this.products.find((product) => product.id === id);
  }
  
  async addProduct(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async updateOneProduct(id, data) {
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1) {
      throw new Error('product not found')
    }
    const product = this.products[index]
    return { ...product, ...data }
  }

  async deleteOneProduct(id) {
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

export default ProductsService;