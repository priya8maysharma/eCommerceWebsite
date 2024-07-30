// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/150', description: 'Description of Product 1' },
    { id: 2, name: 'Product 2', price: 200, image: 'https://via.placeholder.com/150', description: 'Description of Product 2' },
    // Add more products as needed
];

// Display featured products on the homepage
const featuredProductsDiv = document.getElementById('featured-products');
if (featuredProductsDiv) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        featuredProductsDiv.appendChild(productDiv);
    });
}

// Display product details on the product page
const productDetailsDiv = document.getElementById('product-details');
if (productDetailsDiv) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        productDetailsDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    } else {
        productDetailsDiv.innerHTML = '<p>Product not found</p>';
    }
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
    console.log(cart);
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    if (cartItemsDiv && cartTotalSpan) {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((product, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
            total += product.price;
        });
        cartTotalSpan.textContent = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

document.addEventListener('DOMContentLoaded', displayCartItems);
