document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    function updateCart() {
        cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Reload fresh cart data

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "$0.00";
            checkoutButton.style.display = "none";
            return;
        }

        let total = 0;
        cartContainer.innerHTML = "";

        cartItems.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.classList.add("cart-item");
            itemRow.innerHTML = `
                <p style="margin: 10px";><strong>${item.name}</strong> x${item.quantity}</p>
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="btn-remove" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemRow);
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        checkoutButton.style.display = "block";

        attachRemoveEvent();
    }

    function attachRemoveEvent() {
        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                cartItems.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                updateCart();
            });
        });
    }

    checkoutButton.addEventListener("click", function () {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // ✅ Store cart data before redirecting
        localStorage.setItem("cart", JSON.stringify(cartItems));
        localStorage.setItem("totalPrice", totalPriceElement.textContent);

        window.location.href = "payment.html";
    });

    updateCart();
});
