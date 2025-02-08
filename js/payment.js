document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalAmount = document.getElementById("total-amount");
    const checkoutForm = document.getElementById("checkout-form");

    function updateCartSummary() {
        if (cartItems.length === 0) {
            cartSummary.innerHTML = "<p>No items in cart.</p>";
            totalAmount.textContent = "$0.00";
            return;
        }

        let total = 0;
        cartSummary.innerHTML = "";

        cartItems.forEach(item => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.classList.add("cart-item");
            itemRow.innerHTML = `
                <p><strong>${item.name}</strong> x${item.quantity}</p>
                <p>$${itemTotal.toFixed(2)}</p>
            `;
            cartSummary.appendChild(itemRow);
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        if (!name || !email || !paymentMethod) {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        const confirmation = confirm(`Confirm purchase for ${totalAmount.textContent}?`);
        if (!confirmation) return;

        // Save order details for receipt
        const orderDetails = {
            name,
            email,
            paymentMethod,
            items: cartItems,
            total: totalAmount.textContent,
            orderDate: new Date().toLocaleString()
        };
        localStorage.setItem("orderReceipt", JSON.stringify(orderDetails));

        // Clear cart
        localStorage.removeItem("cart");

        // Redirect to success page
        window.location.href = "success.html";
    });

    updateCartSummary();
});
