// Marketplace Functional JavaScript - Search and Navigation

// Global variables
let products = [];
let cart = [];
let filteredProducts = [];
let currentCategory = 'fresh-eggs';
let searchTerm = '';

// API configuration
const API_BASE_URL = 'https://g8h3ilcv1gzw.manus.space/api';

// Category mapping for display
const categoryTitleMap = {
    'fresh-eggs': 'Fresh Eggs',
    'hatching-eggs': 'Hatching Eggs',
    'duck-eggs': 'Duck Eggs',
    'quail-eggs': 'Quail Eggs',
    'shipping-supplies': 'Shipping Supplies',
    'all-products': 'All Products'
};

const categoryDescriptionMap = {
    'fresh-eggs': 'Farm-fresh eggs delivered directly from local farmers to your table. Farmers get more than 90% of the cost listed right into their pockets.',
    'hatching-eggs': 'Premium hatching eggs from heritage breeds and specialty varieties for your breeding programs.',
    'duck-eggs': 'Fresh duck eggs with rich flavor and excellent nutritional value from dedicated duck farmers.',
    'quail-eggs': 'Delicate quail eggs perfect for gourmet cooking and specialty dishes.',
    'shipping-supplies': 'Professional packaging and shipping supplies to ensure your eggs arrive safely.',
    'all-products': 'Browse our complete selection of farm-fresh eggs, hatching eggs, and specialty varieties from dedicated farmers across America.'
};

// Sample product data for demonstration
const sampleProducts = [
    {
        id: 1,
        name: 'Farm Fresh Brown Eggs - Large',
        description: 'Premium brown eggs from free-range hens, delivered fresh from our family farm.',
        price: 6.50,
        category: 'fresh-eggs',
        image: 'images/farm_fresh_brown_eggs_large.jpg',
        farmer: 'Johnson Family Farm',
        location: 'Vermont'
    },
    {
        id: 2,
        name: 'Farm Fresh White Eggs - Large',
        description: 'Classic white eggs from pasture-raised hens, perfect for all your cooking needs.',
        price: 6.00,
        category: 'fresh-eggs',
        image: 'images/farm_fresh_white_eggs_large.jpg',
        farmer: 'Sunrise Acres',
        location: 'Ohio'
    },
    {
        id: 3,
        name: 'Extra Large Brown Eggs',
        description: 'Extra large brown eggs from heritage breed hens, ideal for baking and cooking.',
        price: 7.25,
        category: 'fresh-eggs',
        image: 'images/extra_large_brown_eggs.jpg',
        farmer: 'Heritage Farm Co.',
        location: 'Pennsylvania'
    },
    {
        id: 4,
        name: 'Fresh Duck Eggs',
        description: 'Rich and creamy duck eggs perfect for baking and gourmet cooking.',
        price: 12.00,
        category: 'duck-eggs',
        image: 'images/fresh_duck_eggs.jpg',
        farmer: 'Mallard Creek Farm',
        location: 'Wisconsin'
    },
    {
        id: 5,
        name: 'Quail Eggs - Fresh',
        description: 'Delicate quail eggs, perfect for appetizers and specialty dishes.',
        price: 8.50,
        category: 'quail-eggs',
        image: 'images/quail_eggs_fresh.jpg',
        farmer: 'Tiny Treasures Farm',
        location: 'California'
    },
    {
        id: 6,
        name: 'Rhode Island Red Hatching Eggs',
        description: 'Premium hatching eggs from pure Rhode Island Red breeding stock.',
        price: 45.00,
        category: 'hatching-eggs',
        image: 'rhode_island_red_chicken.jpg',
        farmer: 'Heritage Poultry',
        location: 'Rhode Island'
    },
    {
        id: 7,
        name: 'Buff Orpington Hatching Eggs',
        description: 'Beautiful Buff Orpington hatching eggs from champion bloodlines.',
        price: 50.00,
        category: 'hatching-eggs',
        image: 'buff_orpington_chicken.jpg',
        farmer: 'Golden Feather Farm',
        location: 'Kentucky'
    },
    {
        id: 8,
        name: 'Chicken Egg Cartons - 12 count',
        description: 'Professional egg cartons for safe shipping and storage.',
        price: 15.00,
        category: 'shipping-supplies',
        image: 'images/chicken_egg_cartons.jpg',
        farmer: 'Farm Supply Co.',
        location: 'Texas'
    },
    {
        id: 9,
        name: 'Insulated Shipping Box - Large',
        description: 'Insulated shipping boxes to keep eggs fresh during transport.',
        price: 8.50,
        category: 'shipping-supplies',
        image: 'images/insulated_shipping_box_large.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois'
    },
    {
        id: 10,
        name: 'Organic Free-Range Eggs',
        description: 'Certified organic eggs from free-range chickens on pasture.',
        price: 8.00,
        category: 'fresh-eggs',
        image: 'images/farm_fresh_brown_eggs_large.jpg',
        farmer: 'Green Valley Organic',
        location: 'Oregon'
    }
];

// Initialize marketplace
document.addEventListener('DOMContentLoaded', function() {
    // Load sample products
    products = sampleProducts;
    filteredProducts = products;
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial products
    loadProducts();
    
    // Update cart display
    updateCartDisplay();
});

// Set up all event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Category dropdown
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            if (selectedCategory === 'all-products') {
                window.location.href = 'all-products_fixed.html';
                return;
            }
            filterByCategory(selectedCategory);
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category === 'all-products') {
                window.location.href = 'all-products_fixed.html';
                return;
            }
            filterByCategory(category);
            updateActiveFilterButton(this);
        });
    });
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCartSidebar);
    }
    
    // Close cart button
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', hideCartSidebar);
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchTerm = searchInput.value.trim().toLowerCase();
    console.log('Searching for:', searchTerm);
    
    if (searchTerm === '') {
        // If search is empty, show all products in current category
        filteredProducts = products.filter(product => 
            currentCategory === 'all-products' || product.category === currentCategory
        );
    } else {
        // Filter products by search term
        filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm) ||
                                product.farmer.toLowerCase().includes(searchTerm);
            
            const matchesCategory = currentCategory === 'all-products' || product.category === currentCategory;
            
            return matchesSearch && matchesCategory;
        });
    }
    
    displayProducts();
    updateResultsInfo();
}

// Filter by category
function filterByCategory(category) {
    console.log('Filtering by category:', category);
    currentCategory = category;
    searchTerm = '';
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Filter products
    if (category === 'all-products') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Update category select
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.value = category;
    }
    
    displayProducts();
    updatePageInfo();
}

// Update active filter button
function updateActiveFilterButton(activeButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Load products
function loadProducts() {
    // Filter by current category
    if (currentCategory === 'all-products') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === currentCategory);
    }
    
    displayProducts();
    updatePageInfo();
}

// Display products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <div class="no-products-icon">🥚</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or browse different categories.</p>
            </div>
        `;
        return;
    }
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/egg_placeholder.jpg'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-farmer">
                    <small>From: ${product.farmer}, ${product.location}</small>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                
                <div class="product-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                        <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="99">
                        <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
                
                ${product.category === 'fresh-eggs' ? `
                <div class="subscription-options">
                    <div class="subscription-checkbox">
                        <input type="checkbox" id="sub-${product.id}">
                        <label for="sub-${product.id}">Subscribe & Save</label>
                    </div>
                    <div class="subscription-frequency">
                        <select id="freq-${product.id}">
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>
                
                <div class="bulk-pricing">
                    <h4>Bulk Savings:</h4>
                    <div class="bulk-tier">6+ eggs: 10% off</div>
                    <div class="bulk-tier">12+ eggs: 15% off</div>
                    <div class="bulk-tier">24+ eggs: 20% off</div>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Update page info
function updatePageInfo() {
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    
    if (categoryTitle) {
        categoryTitle.textContent = categoryTitleMap[currentCategory] || 'Products';
    }
    
    if (categoryDescription) {
        categoryDescription.textContent = categoryDescriptionMap[currentCategory] || '';
    }
    
    updateResultsInfo();
}

// Update results info
function updateResultsInfo() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const count = filteredProducts.length;
        resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
    }
}

// Quantity controls
function increaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        const currentValue = parseInt(qtyInput.value) || 1;
        qtyInput.value = Math.min(currentValue + 1, 99);
    }
}

function decreaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        const currentValue = parseInt(qtyInput.value) || 1;
        qtyInput.value = Math.max(currentValue - 1, 1);
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value) || 1;
    
    const subscriptionCheckbox = document.getElementById(`sub-${productId}`);
    const frequencySelect = document.getElementById(`freq-${productId}`);
    
    const isSubscription = subscriptionCheckbox && subscriptionCheckbox.checked;
    const frequency = frequencySelect ? frequencySelect.value : null;
    
    // Check if item already in cart
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.subscription === (isSubscription ? frequency : null)
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            subscription: isSubscription ? frequency : null
        });
    }
    
    updateCartDisplay();
    
    // Show success message
    showAddToCartMessage(product.name, quantity);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Show add to cart message
function showAddToCartMessage(productName, quantity) {
    // Create temporary message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--farm-green);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: bold;
    `;
    message.textContent = `Added ${quantity} ${productName} to cart!`;
    
    document.body.appendChild(message);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Cart sidebar functions
function showCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.add('active');
        updateCartSidebar();
    }
}

function hideCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" style="padding: 15px; border-bottom: 1px solid #eee;">
                <div class="cart-item-info">
                    <h4 style="margin: 0 0 5px 0; color: var(--text-dark);">${item.name}</h4>
                    <p style="margin: 0; color: var(--text-light);">Quantity: ${item.quantity}</p>
                    ${item.subscription ? `<small style="color: var(--farm-green);">🔄 ${item.subscription}</small>` : ''}
                </div>
                <div class="cart-item-price" style="font-weight: bold; color: var(--heritage-red);">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalAmount) {
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

// Handle URL parameters for direct category access
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && category !== 'all-products') {
        currentCategory = category;
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
            categorySelect.value = category;
        }
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            if (button.getAttribute('data-category') === category) {
                updateActiveFilterButton(button);
            }
        });
        
        loadProducts();
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', handleURLParameters);

