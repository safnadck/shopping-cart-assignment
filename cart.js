const axios = require("axios");

const PRICE_API_BASE_URL = "http://localhost:3001/products/";

class ShoppingCart {
  constructor() {
    this.cart = {};
  }

  // Fetch product price from the API
  async getProductPrice(productName) {
    try {
      const response = await axios.get(`${PRICE_API_BASE_URL}${productName}`);
      return response.data.price;
    } catch (error) {
      console.error(`Error fetching price for ${productName}:`, error.message);
      return null;
    }
  }

  // Add product to the cart
  async addProduct(productName, quantity) {
    const price = await this.getProductPrice(productName);
    if (price === null) {
      console.log(`Product ${productName} not found.`);
      return;
    }

    if (!this.cart[productName]) {
      this.cart[productName] = { quantity: 0, price };
    }

    this.cart[productName].quantity += quantity;
    console.log(`Added ${quantity} x ${productName} @ ${price} each`);
  }

  // Calculate the cart totals
  calculateTotals() {
    let subtotal = 0;

    for (const product in this.cart) {
      subtotal += this.cart[product].quantity * this.cart[product].price;
    }

    const tax = Math.round(subtotal * 0.125 * 100) / 100; // 12.5% tax
    const total = Math.round((subtotal + tax) * 100) / 100;

    return { subtotal, tax, total };
  }

  // Display cart contents and totals
  printCart() {
    console.log("\nShopping Cart:");
    for (const product in this.cart) {
      console.log(
        `${this.cart[product].quantity} x ${product} @ ${this.cart[product].price} each`
      );
    }

    const { subtotal, tax, total } = this.calculateTotals();
    console.log(`Subtotal: $${subtotal}`);
    console.log(`Tax (12.5%): $${tax}`);
    console.log(`Total: $${total}`);
  }
}

// Export the class for testing
module.exports = ShoppingCart;
