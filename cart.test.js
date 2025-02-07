const ShoppingCart = require("./cart");

jest.mock("axios");
const axios = require("axios");

axios.get.mockImplementation((url) => {
  const productPrices = {
    "http://localhost:3001/products/cornflakes": { data: { price: 2.52 } },
    "http://localhost:3001/products/weetabix": { data: { price: 9.98 } },
  };
  return Promise.resolve(productPrices[url] || { data: { price: null } });
});

describe("ShoppingCart", () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test("should add products to the cart", async () => {
    await cart.addProduct("cornflakes", 2);
    expect(cart.cart["cornflakes"].quantity).toBe(2);
    expect(cart.cart["cornflakes"].price).toBe(2.52);
  });

  test("should calculate correct totals", async () => {
    await cart.addProduct("cornflakes", 2);
    await cart.addProduct("weetabix", 1);

    const totals = cart.calculateTotals();
    expect(totals.subtotal).toBe(15.02);
    expect(totals.tax).toBe(1.88);
    expect(totals.total).toBe(16.90);
  });

  test("should handle invalid products", async () => {
    await cart.addProduct("unknown", 1);
    expect(cart.cart["unknown"]).toBeUndefined();
  });
});
