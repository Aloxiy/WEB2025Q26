document.addEventListener('DOMContentLoaded', function() {
    const orderItems = document.getElementById('orderItems');
    const orderTotalPrice = document.getElementById('orderTotalPrice');
    const orderForm = document.getElementById('orderForm');
    const quantityInput = document.getElementById('quantity');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    function renderOrderItems() {
        orderItems.innerHTML = '';
        let total = 0;
        
        Object.values(cart).forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price} x ${item.quantity} = $${itemTotal}</div>
            `;
            orderItems.appendChild(orderItem);
        });
        
        orderTotalPrice.textContent = total;
        
        const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        quantityInput.value = totalQuantity;
    }
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        alert('Order placed successfully!');
        
        localStorage.removeItem('cart');
        
        const rootPath = window.location.pathname.split('/html/')[0];
        window.location.href = rootPath + '/';
    });
    
    renderOrderItems();
});
