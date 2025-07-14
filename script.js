// Global variables
let products = [];
let cart = [];
let filteredProducts = [];
let currentCategory = 'all';
let searchTerm = '';

// API configuration
const API_BASE_URL = 'https://g8h3ilcv1gzw.manus.space/api';

// Product image mapping - maps product names to their corresponding image files
const productImageMap = {
    // Fresh Eggs
    'Farm Fresh Brown Eggs - Large': 'images/farm_fresh_brown_eggs_large.jpg',
    'Farm Fresh White Eggs - Large': 'images/farm_fresh_white_eggs_large.jpg', 
    'Extra Large Brown Eggs': 'images/extra_large_brown_eggs.jpg',
    'Fresh Duck Eggs': 'images/fresh_duck_eggs.jpg',
    'Quail Eggs - Fresh': 'images/quail_eggs_fresh.jpg',
    'Emu Eggs - Fresh': 'images/emu_eggs_fresh.jpg',
    'Ostrich Eggs - Fresh': 'images/ostrich_eggs_fresh.jpg',
    
    // Hatching Eggs - BIRD BREED IMAGES (not eggs!)
    'Rhode Island Red Hatching Eggs': 'rhode_island_red_chicken.jpg',
    'Buff Orpington Hatching Eggs': 'buff_orpington_chicken.jpg',
    'Black Orpington Hatching Eggs': 'black_orpington_chicken.jpg',
    'Blue Orpington Hatching Eggs': 'blue_orpington_chicken.jpg',
    'Lavender Orpington Hatching Eggs': 'lavender_orpington_chicken.jpg',
    'White Crested Black Polish Hatching Eggs': 'white_crested_black_polish_chicken.jpg',
    'Golden Polish Hatching Eggs': 'golden_polish_chicken.jpg',
    'Silver Polish Hatching Eggs': 'silver_polish_chicken.jpg',
    'Light Brahma Hatching Eggs': 'light_brahma_chicken.jpg',
    'Dark Brahma Hatching Eggs': 'dark_brahma_chicken.jpg',
    'Buff Brahma Hatching Eggs': 'buff_brahma_chicken.jpg',
    'Silkie Hatching Eggs': 'silkie_chicken.jpg',
    'Ameraucana Hatching Eggs': 'ameraucana_chicken.jpg',
    'French Black Copper Marans Hatching Eggs': 'marans_chicken.jpg',
    'Silver Laced Wyandotte Hatching Eggs': 'wyandotte_chicken.jpg',
    'Coturnix Pharaoh Quail Hatching Eggs': 'coturnix_pharaoh_quail.jpg',
    'Jumbo Coturnix Quail Hatching Eggs': 'jumbo_coturnix_quail.jpg',
    'Jumbo White Coturnix Quail Hatching Eggs': 'jumbo_white_coturnix_quail.jpg',
    'Texas A&M Coturnix Quail Hatching Eggs': 'texas_am_coturnix_quail.jpg',
    'Bobwhite Quail Hatching Eggs': 'bobwhite_quail.jpg',
    'Mallard Duck Hatching Eggs': 'mallard_duck.jpg',
    'Pekin Duck Hatching Eggs': 'pekin_duck.jpg',
    'Welsh Harlequin Duck Hatching Eggs': 'welsh_harlequin_duck.jpg',
    'Khaki Campbell Duck Hatching Eggs': 'khaki_campbell_duck.jpg',
    
    // Balut - NEW IMAGES ADDED
    'Traditional Duck Balut': 'traditional_duck_balut.jpg',
    'Quail Balut': 'quail_balut.jpg',
    
    // Pickled Eggs - NEW IMAGES ADDED
    'Premium Pickled Quail Eggs - 12 count': 'images/premium_pickled_quail_eggs.jpg',
    'Spicy Pickled Quail Eggs - 12 count': 'images/spicy_pickled_quail_eggs.jpg',
    'Classic Pickled Quail Eggs': 'images/classic_pickled_quail_eggs.jpg',
    'Gourmet Pickled Chicken Eggs': 'images/gourmet_pickled_chicken_eggs.jpg',
    
    // Shipping Supplies - NEW IMAGES ADDED
    'Fragile Stickers - Roll of 100': 'images/fragile_stickers.jpg',
    'Fragile Tape - 2" x 55 yards': 'images/fragile_tape.jpg',
    'Chicken Egg Cartons - 12 count (Pack of 25)': 'images/chicken_egg_cartons.jpg',
    'Quail Egg Cartons - 24 count (Pack of 20)': 'images/quail_egg_cartons.jpg',
    'Duck Egg Cartons - 6 count (Pack of 30)': 'images/duck_egg_cartons.jpg',
    'Bubble Wrap Roll - 12" x 50ft': 'images/bubble_wrap_roll.jpg',
    'Insulated Shipping Box - Large': 'images/insulated_shipping_box_large.jpg',
    'Insulated Shipping Box - Medium': 'images/insulated_shipping_box_medium.jpg',
    'Insulated Shipping Box - Small': 'images/insulated_shipping_box_small.jpg',
    
    // Default placeholder
    'default': 'images/egg_placeholder.jpg'
};

// Get product image URL with fallback logic
function getProductImageUrl(productName) {
    // First try exact match
    if (productImageMap[productName]) {
        return productImageMap[productName];
    }
    
    // Normalize the product name for pattern matching
    const normalizedName = productName.toLowerCase();
    
    // Fresh Eggs patterns
    if (normalizedName.includes('farm fresh') && normalizedName.includes('brown') && normalizedName.includes('large')) {
        return 'images/farm_fresh_brown_eggs_large.jpg';
    }
    if (normalizedName.includes('farm fresh') && normalizedName.includes('white') && normalizedName.includes('large')) {
        return 'images/farm_fresh_white_eggs_large.jpg';
    }
    if (normalizedName.includes('extra large') && normalizedName.includes('brown')) {
        return 'images/extra_large_brown_eggs.jpg';
    }
    if (normalizedName.includes('duck') && normalizedName.includes('eggs') && normalizedName.includes('fresh')) {
        return 'images/fresh_duck_eggs.jpg';
    }
    if (normalizedName.includes('quail') && normalizedName.includes('eggs') && normalizedName.includes('fresh')) {
        return 'images/quail_eggs_fresh.jpg';
    }
    if (normalizedName.includes('emu') && normalizedName.includes('eggs')) {
        return 'images/emu_eggs_fresh.jpg';
    }
    if (normalizedName.includes('ostrich') && normalizedName.includes('eggs')) {
        return 'images/ostrich_eggs_fresh.jpg';
    }
    
    // Return default placeholder if no match found
    return productImageMap.default;
}

// Category display names
const categoryNames = {
    'all': 'All Products',
    'consumption_eggs': 'Fresh Eggs',
    'hatching_eggs': 'Hatching Eggs',
    'balut': 'Balut',
    'pickled_eggs': 'Pickled Eggs',
    'shipping_supplies': 'Shipping Supplies'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marketplace initialized');
    initializeEventListeners();
    fetchProducts();
});

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Category selection
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.addEventListener('change', handleCategoryChange);
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', toggleCartSidebar);
}

// Fetch products from API
async function fetchProducts() {
    try {
        console.log('Fetching products from API...');
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.success && data.products) {
            products = data.products;
        } else if (data.products) {
            products = data.products;
        } else if (Array.isArray(data)) {
            products = data;
        } else {
            console.error('No products found in response:', data);
            products = [];
        }
        
        console.log(`Loaded ${products.length} products`);
        filterAndDisplayProducts();
        
    } catch (error) {
        console.error('Error fetching products:', error);
        products = [];
        showNoProducts('Failed to load products. Please try again later.');
    } finally {
        showLoading(false);
    }
}

// Filter and display products
function filterAndDisplayProducts() {
    // Map frontend category values to database category values
    const categoryMapping = {
        'all': 'all',
        'consumption_eggs': 'consumption_eggs',
        'hatching_eggs': 'Hatching Eggs',
        'balut': 'balut',
        'pickled_eggs': ['pickled_eggs', 'pickled_quail_eggs'], // Handle both pickled egg categories
        'shipping_supplies': ['supplies', 'shipping_supplies'] // Handle both supply categories
    };
    
    const dbCategory = categoryMapping[currentCategory] || currentCategory;
    
    // Apply category filter
    filteredProducts = products.filter(product => {
        let matchesCategory = false;
        
        if (currentCategory === 'all') {
            matchesCategory = true;
        } else if (Array.isArray(dbCategory)) {
            // Handle multiple database categories for one frontend category
            matchesCategory = dbCategory.includes(product.category);
        } else {
            matchesCategory = product.category === dbCategory;
        }
        
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    console.log(`Filtered to ${filteredProducts.length} products for category: ${currentCategory} -> ${dbCategory}`);
    
    // Update page title and count
    updatePageTitle();
    displayProducts();
}

// Update page title based on selected category
function updatePageTitle() {
    const categoryTitles = {
        'all': 'All Products',
        'consumption_eggs': 'Fresh Eggs',
        'hatching_eggs': 'Hatching Eggs',
        'balut': 'Balut',
        'pickled_eggs': 'Pickled Eggs',
        'shipping_supplies': 'Shipping Supplies'
    };
    
    const title = categoryTitles[currentCategory] || 'All Products';
    const count = filteredProducts.length;
    
    // Update the page title
    const titleElement = document.getElementById('categoryTitle');
    if (titleElement) {
        titleElement.textContent = title;
    }
    
    // Update the results count
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = `${count} result${count !== 1 ? 's' : ''}`;
    }
}

// Display products in grid
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (filteredProducts.length === 0) {
        productGrid.style.display = 'none';
        showNoProducts();
        return;
    }
    
    noProducts.style.display = 'none';
    productGrid.style.display = 'grid';
    
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML with quantity controls and subscription options
function createProductCard(product) {
    const price = parseFloat(product.price || 0);
    const availability = product.quantity_available || 0;
    const sellerName = product.seller?.farm_name || 'Local Farm';
    const sellerRating = product.seller?.rating || null;
    const imageUrl = getProductImageUrl(product.name);
    const isFreshEgg = product.category === 'consumption_eggs';
    const supportsSubscription = product.supports_subscription || isFreshEgg;
    
    // Bulk pricing tiers for fresh eggs
    const bulkTiers = product.bulk_tiers || [];
    const hasBulkPricing = bulkTiers.length > 0 || isFreshEgg;
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${imageUrl}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='${productImageMap.default}'">
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})">❤️</button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <p class="product-description">${escapeHtml(product.description)}</p>
                
                <div class="seller-info">
                    <span class="seller-location">📍 ${escapeHtml(sellerName)}</span>
                    ${sellerRating ? `
                        <div class="seller-rating">
                            <span>⭐</span>
                            <span>${sellerRating.toFixed(1)}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="price-section">
                    <div class="price-display">
                        <span class="price" id="price-${product.id}">$${price.toFixed(2)}</span>
                        <span class="price-unit">/${product.unit || 'each'}</span>
                        ${hasBulkPricing ? `<div class="savings-display" id="savings-${product.id}" style="display: none;"></div>` : ''}
                    </div>
                    ${availability > 0 ? `
                        <span class="availability">${availability} available</span>
                    ` : ''}
                </div>
                
                ${hasBulkPricing ? `
                    <div class="bulk-pricing-info">
                        <small class="bulk-hint">💰 Save more with bulk orders!</small>
                        <div class="bulk-tiers">
                            <div class="bulk-tier"><span>6+: 10% off</span></div>
                            <div class="bulk-tier"><span>12+: 15% off</span></div>
                            <div class="bulk-tier"><span>24+: 20% off</span></div>
                        </div>
                    </div>
                ` : ''}
                
                ${isFreshEgg ? `
                    <div class="quantity-controls">
                        <label for="quantity-${product.id}">Quantity:</label>
                        <div class="quantity-input-group">
                            <button type="button" onclick="decreaseQuantity(${product.id})" class="quantity-btn">-</button>
                            <input type="number" id="quantity-${product.id}" value="1" min="1" max="${availability}" 
                                   onchange="updateProductPricing(${product.id})" class="quantity-input">
                            <button type="button" onclick="increaseQuantity(${product.id})" class="quantity-btn">+</button>
                        </div>
                    </div>
                ` : ''}
                
                ${supportsSubscription ? `
                    <div class="subscription-options">
                        <label class="subscription-toggle">
                            <input type="checkbox" id="subscription-${product.id}" onchange="toggleSubscription(${product.id})">
                            <span class="subscription-label">🔄 Subscribe & Save</span>
                        </label>
                        <div class="subscription-frequency" id="frequency-${product.id}" style="display: none;">
                            <select onchange="updateSubscriptionFrequency(${product.id})">
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                ` : ''}
                
                <div class="total-price" id="total-${product.id}" style="display: none;">
                    <strong>Total: $${price.toFixed(2)}</strong>
                </div>
                
                <button 
                    class="add-to-cart-btn" 
                    onclick="addToCart(${product.id})"
                    ${availability === 0 ? 'disabled' : ''}
                    id="cart-btn-${product.id}"
                >
                    ${availability === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
}

// Quantity control functions
function increaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
        updateProductPricing(productId);
    }
}

function decreaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(quantityInput.value);
    
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateProductPricing(productId);
    }
}

// Update product pricing based on quantity
async function updateProductPricing(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const product = products.find(p => p.id === productId);
    
    if (!product || quantity < 1) return;
    
    try {
        // Calculate bulk pricing
        const response = await fetch(`${API_BASE_URL}/products/${productId}/bulk-price`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const pricing = data.pricing;
            
            // Update price display
            const priceElement = document.getElementById(`price-${productId}`);
            const savingsElement = document.getElementById(`savings-${productId}`);
            const totalElement = document.getElementById(`total-${productId}`);
            
            if (priceElement) {
                priceElement.textContent = `$${pricing.unit_price}`;
            }
            
            // Show savings if applicable
            if (savingsElement && pricing.savings > 0) {
                savingsElement.innerHTML = `<span class="savings">Save $${pricing.savings.toFixed(2)} (${pricing.savings_percent}%)</span>`;
                savingsElement.style.display = 'block';
            } else if (savingsElement) {
                savingsElement.style.display = 'none';
            }
            
            // Show total price
            if (totalElement) {
                totalElement.innerHTML = `<strong>Total: $${pricing.total_price}</strong>`;
                totalElement.style.display = 'block';
            }
            
            // Update cart button text
            const cartBtn = document.getElementById(`cart-btn-${productId}`);
            if (cartBtn && quantity > 1) {
                cartBtn.textContent = `Add ${quantity} to Cart`;
            } else if (cartBtn) {
                cartBtn.textContent = 'Add to Cart';
            }
        }
    } catch (error) {
        console.error('Error calculating bulk pricing:', error);
    }
}

// Subscription functions
function toggleSubscription(productId) {
    const checkbox = document.getElementById(`subscription-${productId}`);
    const frequencyDiv = document.getElementById(`frequency-${productId}`);
    
    if (checkbox.checked) {
        frequencyDiv.style.display = 'block';
    } else {
        frequencyDiv.style.display = 'none';
    }
}

function updateSubscriptionFrequency(productId) {
    // This function can be used to update subscription frequency
    console.log(`Subscription frequency updated for product ${productId}`);
}

// Add product to cart with quantity and subscription support
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get quantity
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    // Check if subscription is enabled
    const subscriptionCheckbox = document.getElementById(`subscription-${productId}`);
    const isSubscription = subscriptionCheckbox ? subscriptionCheckbox.checked : false;
    
    let frequency = null;
    if (isSubscription) {
        const frequencySelect = document.querySelector(`#frequency-${productId} select`);
        frequency = frequencySelect ? frequencySelect.value : 'monthly';
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        if (isSubscription) {
            existingItem.subscription = { frequency };
        }
    } else {
        const cartItem = {
            ...product,
            quantity: quantity
        };
        
        if (isSubscription) {
            cartItem.subscription = { frequency };
        }
        
        cart.push(cartItem);
    }
    
    updateCartUI();
    showCartSidebar();
    
    console.log('Added to cart:', product.name, 'Quantity:', quantity, 'Subscription:', isSubscription);
}

// Update cart UI
function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    
    // Update header cart
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartTotal').textContent = `$${cartTotal.toFixed(2)}`;
    
    // Update sidebar cart
    document.getElementById('sidebarCartCount').textContent = cartCount;
    document.getElementById('sidebarCartTotal').textContent = `$${cartTotal.toFixed(2)}`;
    
    // Update cart items
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span class="cart-item-name">
                ${escapeHtml(item.name)} x${item.quantity}
                ${item.subscription ? `<br><small>🔄 ${item.subscription.frequency}</small>` : ''}
            </span>
            <span class="cart-item-price">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Show/hide cart sidebar based on items
    if (cartCount > 0) {
        showCartSidebar();
    } else {
        hideCartSidebar();
    }
}

// Show cart sidebar
function showCartSidebar() {
    document.getElementById('cartSidebar').style.display = 'block';
}

// Hide cart sidebar
function hideCartSidebar() {
    document.getElementById('cartSidebar').style.display = 'none';
}

// Toggle cart sidebar
function toggleCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar.style.display === 'none' || !sidebar.style.display) {
        showCartSidebar();
    } else {
        hideCartSidebar();
    }
}

// Handle search
function handleSearch(event) {
    searchTerm = event.target.value.trim();
    console.log('Search term:', searchTerm);
    filterAndDisplayProducts();
}

// Handle category change
function handleCategoryChange(event) {
    currentCategory = event.target.value;
    console.log('Category changed to:', currentCategory);
    filterAndDisplayProducts();
}

// Toggle favorite
function toggleFavorite(productId) {
    console.log('Toggled favorite for product:', productId);
    // Implement favorite functionality here
}

// Show loading state
function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

// Show no products message
function showNoProducts(message = 'No products found') {
    const noProductsElement = document.getElementById('noProducts');
    if (noProductsElement) {
        noProductsElement.style.display = 'block';
        noProductsElement.textContent = message;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

