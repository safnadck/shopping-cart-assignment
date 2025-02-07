const ShoppingCart = require("./cart");

async function testCart() {
  const cart = new ShoppingCart();

  await cart.addProduct("cornflakes", 1);
  await cart.addProduct("cornflakes", 1);
  await cart.addProduct("weetabix", 1);

  cart.printCart();
}

testCart();
