const products = [
  {
    "id": 1,
    "title": "Escuadra",
    "price": 200,
    "thumbnail": "http://placekitten.com/50/50"
  },
  {
    "id": 2,
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "http://placekitten.com/50/50"
  },
  {
    "id": 3,
    "title": "Globo Terráqueo",
    "price": 45.67,
    "thumbnail": "http://placekitten.com/50/50"
  },
  {
    "id": 4,
    "title": "Paleta Pintura",
    "price": 456.78,
    "thumbnail": "http://placekitten.com/50/50"
  },
  {
    "id": 5,
    "title": "Reloj",
    "price": 67.89,
    "thumbnail": "http://placekitten.com/50/50"
  },
  {
    "id": 6,
    "title": "Papelera",
    "price": 200,
    "thumbnail": "http://placekitten.com/50/50"
  }
]

class Products {

  constructor() {
    this.products = products
  }

  getAll() {
    return this.products
  }

  getById(id) {
    const product = this.products.find((product) => product.id === +(id));

    if (product) {
      return product
    } else {
      return { error: 'Product not found' }
    }

  }

  save(newProductParam) {
    const { title, price, thumbnail } = newProductParam;
    if (title != null && price != null && thumbnail != null) {
      const newProduct = {
        id: this.products.length + 1,
        title,
        price,
        thumbnail,
      };
      this.products.push(newProduct);
      return {
        message: "Created",
        product: newProduct,
      }
    } else {
      return {
        message: "Bad Request",
        error: "Incorrect format"
      }
    }

  }

  updateById(id, product) {

    const { title, price, thumbnail } = product;

    if (title != null && price != null && thumbnail != null) {

      let productsUpdate = this.products.map((p) => p.id === id ? p = {
        id,
        title,
        price,
        thumbnail
      } : p);

      this.products = productsUpdate

      return { message: 'Updated successfully' }
    } else {
      return {
        message: "Bad Request",
        error: "Incorrect format"
      }
    }

  }

  deleteById(id) {
    let newProducts = this.products.filter(item => item.id != +(id))
    this.products = newProducts
    return { message: 'Deleted successfully' }
  }
}

module.exports = Products;