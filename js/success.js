document.addEventListener("DOMContentLoaded", function () {
    const orderDetails = JSON.parse(localStorage.getItem("orderReceipt"));

    if (!orderDetails) {
        document.getElementById("receipt-container").innerHTML = "<p>No order found.</p>";
        return;
    }

    document.getElementById("receipt-name").textContent = orderDetails.name;
    document.getElementById("receipt-email").textContent = orderDetails.email;
    document.getElementById("receipt-payment-method").textContent = orderDetails.paymentMethod;
    document.getElementById("receipt-date").textContent = orderDetails.orderDate;
    document.getElementById("receipt-total").textContent = orderDetails.total;

    const receiptItems = document.getElementById("receipt-items");
    orderDetails.items.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        receiptItems.appendChild(listItem);
    });

    // Optional: Clear receipt after displaying (so user can't reload for duplicate receipt)
    localStorage.removeItem("orderReceipt");
});
