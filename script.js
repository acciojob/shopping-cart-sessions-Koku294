// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage or empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list with Add to Cart buttons
function renderProducts() {
  productList.innerHTML = ""; // clear previous if any
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // clear current list
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event delegation for Add to Cart buttons
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event for Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

