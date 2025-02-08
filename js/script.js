const menuToggle = document.querySelector('.menu-toggle');
const navbarLinks = document.querySelector('.nav-bar ul');

menuToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
  function updateCartCount() {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      let totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById("cart-count").textContent = totalCount;
  }

  updateCartCount(); // Update on page load

  // If running in index.html, update count when adding to cart
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
          setTimeout(updateCartCount, 100); // Small delay to ensure LocalStorage updates
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
          const itemName = this.getAttribute("data-name");
          const itemPrice = parseFloat(this.getAttribute("data-price"));

          let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

          // Check if item already exists in cart
          const existingItem = cartItems.find(item => item.name === itemName);
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
          }

          // Save updated cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cartItems));

          alert(`${itemName} added to cart!`);
      });
  });
});
