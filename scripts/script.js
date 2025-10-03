const counter = document.querySelector(".counter");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCounter() {
    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = cartCount;
    
    if (cartCount >= 0) {
        counter.style.display = "flex";
    } else {
        counter.style.display = "none";
    }
}

function addCart(productId, productName, productPrice) {
    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        cart[productId] = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounter();
    
    if (cartModal.style.display === "block") {
        renderCart();
    }
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    Object.values(cart).forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price} each</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="trash-btn" onclick="trashFromCart(${item.id})"><img class="trash" src="images/trash.svg">
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = total;
    
    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Your cart is empty</div>';
    }
}

function changeQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounter();
        renderCart();
    }
}

function trashFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounter();
        renderCart();
    }
}

function toggleCart() {
    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
    } else {
        cartModal.style.display = "block";
        renderCart();
    }
}

window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
}

function goToCheckout() {
    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }
    
    window.location.href = '/html/order.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', goToCheckout);
    }
    
    updateCounter();
});

updateCounter();