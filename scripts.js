// Initialize Cart Count and Cart Items
let cartCount = 0;
let cartItems = [];

// Update cart count on navigation bar
function updateCartCount() {
    document.getElementById('cart-icon').textContent = `Cart (${cartCount})`;
}

// Add Product to Cart
function addToCart(productName, productPrice) {
    cartCount++; // Increment cart count
    cartItems.push({ name: productName, price: productPrice }); // Add item to cart
    updateCartCount(); // Update cart count in header
    saveCartToLocalStorage(); // Save cart to localStorage
}

// Save Cart Data to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store cart items in localStorage
    localStorage.setItem('cartCount', cartCount); // Store cart count in localStorage
}

// Load Cart Data from Local Storage
function loadCartData() {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const savedCount = localStorage.getItem('cartCount') || 0;

    cartItems = savedCart;
    cartCount = savedCount;

    updateCartCount(); // Update cart count on header
    displayCartItems(); // Display cart items on Cart page
}

// Display Cart Items on Cart Page
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    cartContainer.innerHTML = ''; // Clear current cart content

    // Loop through cartItems and display each item
    cartItems.forEach(item => {
        totalPrice += item.price; // Sum up the prices
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    // Update total price on the Cart page
    document.getElementById('total-price').textContent = totalPrice;
}

// Run this function only when we're on the cart page
if (window.location.pathname.includes('cart.html')) {
    loadCartData(); // Load cart data when Cart page loads
}

// Add event listeners for "Add to Cart" buttons on Shop page
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name'); // Get the product name
            const productPrice = parseFloat(button.getAttribute('data-price')); // Get the product price
            addToCart(productName, productPrice); // Add the product to cart
        });
    });
});
// Example of cart data structure
let cart = [
    { id: 1, name: "Product 1", price: 25.99 },
    { id: 2, name: "Product 2", price: 35.99 }
];

const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartIcon = document.getElementById('cart-icon');

// Function to update the cart display
function updateCart() {
    // Clear current cart items
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;
    
    // Loop through the cart and display each product
    cart.forEach(item => {
        totalPrice += item.price;

        // Create a cart item div
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-item" onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Update the cart icon with the number of items
    cartIcon.textContent = `Cart (${cart.length})`;
}

// Function to remove an item from the cart
function removeItem(itemId) {
    // Filter out the item from the cart
    cart = cart.filter(item => item.id !== itemId);

    // Update the cart display
    updateCart();
}

// Initial call to update the cart when the page loads
updateCart();
