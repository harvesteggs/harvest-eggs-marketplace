// Global variables
let products = [];
let cart = [];
let filteredProducts = [];
let currentCategory = 'all';
let searchTerm = '';

// API configuration
const API_BASE_URL = 'https://19hninc18g1k.manus.space/api';

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
    'Classic Pickled Quail Eggs': 'classic_pickled_quail_eggs.jpg',
    'Spicy Pickled Quail Eggs': 'spicy_pickled_quail_eggs.jpg',
    'Garlic Pickled Quail Eggs': 'garlic_pickled_quail_eggs.jpg',
    'Dill Pickled Chicken Eggs': 'dill_pickled_chicken_eggs.jpg',
    
    // Shipping Supplies - NEW IMAGES ADDED
    'Fragile Tape - 2" x 55 yards': 'images/fragile_tape.jpg',
    'Fragile Stickers - Roll of 100': 'images/fragile_stickers.jpg',
    'Chicken Egg Cartons - Standard': 'images/chicken_egg_cartons.jpg',
    'Extra Large Egg Cartons': 'extra_large_egg_cartons.jpg',
    'Quail Egg Cartons': 'quail_egg_cartons.jpg',
    'Emu Egg Shipping Box': 'emu_egg_shipping_box.jpg',
    'Ostrich Egg Shipping Crate': 'ostrich_egg_shipping_crate.jpg',
    'Bubble Wrap - Egg Protection': 'bubble_wrap_egg_protection.jpg',
    
    // Default fallback image for products without specific images
    'default': 'https://via.placeholder.com/300x300/f0f0f0/666?text=Product+Image'
};

// Function to get the correct image URL for a product
function getProductImageUrl(productName) {
    // Check if we have a specific image for this product
    if (productImageMap[productName]) {
        return productImageMap[productName];
    }
    
    // Check for partial matches for similar products
    const normalizedName = productName.toLowerCase();
    
    // Fresh Eggs patterns
    if (normalizedName.includes('brown eggs') && normalizedName.includes('large')) {
        return 'images/farm_fresh_brown_eggs_large.jpg';
    }
    if (normalizedName.includes('white eggs') && normalizedName.includes('large')) {
        return 'images/farm_fresh_white_eggs_large.jpg';
    }
    if (normalizedName.includes('duck eggs') && !normalizedName.includes('hatching')) {
        return 'images/fresh_duck_eggs.jpg';
    }
    if (normalizedName.includes('quail eggs') && !normalizedName.includes('pickled') && !normalizedName.includes('hatching')) {
        return 'images/quail_eggs_fresh.jpg';
    }
    if (normalizedName.includes('emu eggs') && !normalizedName.includes('hatching')) {
        return 'images/emu_eggs_fresh.jpg';
    }
    if (normalizedName.includes('ostrich eggs') && !normalizedName.includes('hatching')) {
        return 'images/ostrich_eggs_fresh.jpg';
    }
    
    // Hatching Eggs patterns
    if (normalizedName.includes('hatching') && normalizedName.includes('rhode island red')) {
        return 'rhode_island_red_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('buff orpington')) {
        return 'buff_orpington_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('silkie')) {
        return 'silkie_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('coturnix')) {
        return 'coturnix_quail_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('bobwhite')) {
        return 'bobwhite_quail_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('mallard')) {
        return 'mallard_duck_hatching_eggs.jpg';
    }
    if (normalizedName.includes('hatching') && normalizedName.includes('pekin')) {
        return 'pekin_duck_hatching_eggs.jpg';
    }
    
    // Pickled Eggs patterns
    if (normalizedName.includes('pickled') && normalizedName.includes('quail') && normalizedName.includes('spicy')) {
        return 'images/spicy_pickled_quail_eggs.jpg';
    }
    if (normalizedName.includes('pickled') && normalizedName.includes('quail')) {
        return 'images/premium_pickled_quail_eggs.jpg';
    }
    
    // Shipping Supplies patterns
    if (normalizedName.includes('fragile tape')) {
        return 'images/fragile_tape.jpg';
    }
    if (normalizedName.includes('fragile stickers')) {
        return 'images/fragile_stickers.jpg';
    }
    if (normalizedName.includes('carton') && normalizedName.includes('chicken')) {
        return 'images/chicken_egg_cartons.jpg';
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

// Update results header
function updateResultsHeader() {
    const categoryTitle = document.getElementById('categoryTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    const categoryDisplayName = categoryNames[currentCategory] || currentCategory;
    categoryTitle.textContent = categoryDisplayName;
    
    let countText = `${filteredProducts.length} results`;
    if (searchTerm) {
        countText += ` for "${searchTerm}"`;
    }
    resultsCount.textContent = countText;
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

// Create product card HTML
function createProductCard(product) {
    const price = parseFloat(product.price || 0);
    const availability = product.quantity_available || 0;
    const sellerName = product.seller?.farm_name || 'Local Farm';
    const sellerRating = product.seller?.rating || null;
    const imageUrl = getProductImageUrl(product.name);
    
    return `
        <div class="product-card">
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
                    <div>
                        <span class="price">$${price.toFixed(2)}</span>
                        <span class="price-unit">/${product.unit || 'each'}</span>
                    </div>
                    ${availability > 0 ? `
                        <span class="availability">${availability} available</span>
                    ` : ''}
                </div>
                
                <button 
                    class="add-to-cart-btn" 
                    onclick="addToCart(${product.id})"
                    ${availability === 0 ? 'disabled' : ''}
                >
                    ${availability === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartSidebar();
    
    console.log('Added to cart:', product.name);
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
            <span class="cart-item-name">${escapeHtml(item.name)} x${item.quantity}</span>
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

// Show/hide loading skeleton
function showLoading(show) {
    const loadingSkeleton = document.getElementById('loadingSkeleton');
    const productGrid = document.getElementById('productGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (show) {
        loadingSkeleton.style.display = 'block';
        productGrid.style.display = 'none';
        noProducts.style.display = 'none';
    } else {
        loadingSkeleton.style.display = 'none';
    }
}

// Show no products message
function showNoProducts(customMessage = null) {
    const noProducts = document.getElementById('noProducts');
    const noProductsMessage = document.getElementById('noProductsMessage');
    const productGrid = document.getElementById('productGrid');
    
    productGrid.style.display = 'none';
    noProducts.style.display = 'block';
    
    if (customMessage) {
        noProductsMessage.textContent = customMessage;
    } else if (searchTerm) {
        noProductsMessage.textContent = `No results for "${searchTerm}". Try a different search term.`;
    } else {
        noProductsMessage.textContent = 'No products available in this category.';
    }
}

// Reset filters
function resetFilters() {
    searchTerm = '';
    currentCategory = 'all';
    
    document.getElementById('searchInput').value = '';
    document.getElementById('categorySelect').value = 'all';
    
    filterAndDisplayProducts();
}

// Toggle favorite (placeholder)
function toggleFavorite(productId) {
    console.log('Toggled favorite for product:', productId);
    // Implement favorite functionality here
}

// Handle checkout
async function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    try {
        console.log('Creating checkout session...');
        
        const cartItems = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: parseFloat(item.price)
        }));
        
        const response = await fetch(`${API_BASE_URL}/orders/create-checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart_items: cartItems,
                user_email: 'customer@example.com'
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.checkout_url) {
            console.log('Redirecting to checkout...');
            window.location.href = data.checkout_url;
        } else {
            console.error('Checkout failed:', data);
            alert('Checkout failed. Please try again.');
        }
        
    } catch (error) {
        console.error('Error creating checkout:', error);
        alert('Checkout failed. Please try again.');
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility function to format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Export functions for global access
window.addToCart = addToCart;
window.toggleFavorite = toggleFavorite;
window.handleCheckout = handleCheckout;
window.resetFilters = resetFilters;


// Rare Breeds Functionality
async function loadRareBreeds() {
    try {
        const response = await fetch(`${API_BASE_URL}/rare-breeds/by-type`);
        const breedsData = await response.json();
        
        const rareBreedsGrid = document.getElementById('rareBreedsGrid');
        
        if (Object.keys(breedsData).length === 0) {
            rareBreedsGrid.innerHTML = '<div class="loading-rare-breeds">No rare breeds available at this time.</div>';
            return;
        }
        
        let html = '';
        
        // Sort animal types for consistent display
        const sortedTypes = Object.keys(breedsData).sort();
        
        for (const animalType of sortedTypes) {
            const breeds = breedsData[animalType];
            
            // Show only first 3 breeds per type to keep it manageable
            const displayBreeds = breeds.slice(0, 3);
            
            for (const breed of displayBreeds) {
                const rarityClass = `rarity-${breed.rarity_level.toLowerCase().replace(/\s+/g, '-')}`;
                
                html += `
                    <div class="rare-breed-card">
                        <h4>${escapeHtml(breed.name)}</h4>
                        <div class="rare-breed-badges">
                            <span class="rare-breed-type">${escapeHtml(animalType)}</span>
                            <span class="rare-breed-rarity ${rarityClass}">${escapeHtml(breed.rarity_level)}</span>
                        </div>
                        <p class="rare-breed-description">${escapeHtml(breed.description)}</p>
                    </div>
                `;
            }
        }
        
        rareBreedsGrid.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading rare breeds:', error);
        document.getElementById('rareBreedsGrid').innerHTML = 
            '<div class="loading-rare-breeds">Error loading rare breeds. Please try again later.</div>';
    }
}

// Handle breed request form submission
async function handleBreedRequest(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const resultDiv = document.getElementById('breedRequestResult');
    
    // Convert FormData to regular object
    const requestData = {};
    for (let [key, value] of formData.entries()) {
        requestData[key] = value.trim();
    }
    
    // Show loading state
    resultDiv.style.display = 'block';
    resultDiv.className = 'form-result';
    resultDiv.innerHTML = 'Submitting your breed request...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/breed-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
            resultDiv.className = 'form-result success';
            resultDiv.innerHTML = `
                <strong>✅ Success!</strong><br>
                ${escapeHtml(data.message)}
            `;
            
            // Reset form
            form.reset();
        } else {
            throw new Error(data.error || 'Failed to submit breed request');
        }
        
    } catch (error) {
        console.error('Error submitting breed request:', error);
        resultDiv.className = 'form-result error';
        resultDiv.innerHTML = `
            <strong>❌ Error:</strong><br>
            ${escapeHtml(error.message || 'Failed to submit breed request. Please try again.')}
        `;
    }
}

// Initialize rare breeds functionality
function initializeRareBreeds() {
    // Load rare breeds on page load
    loadRareBreeds();
    
    // Set up form submission handler
    const breedRequestForm = document.getElementById('breedRequestForm');
    if (breedRequestForm) {
        breedRequestForm.addEventListener('submit', handleBreedRequest);
    }
}

// Update the main initialization to include rare breeds
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    loadProducts();
    setupEventListeners();
    
    // Initialize rare breeds functionality
    initializeRareBreeds();
});

// Update category title mapping to handle the new order
function updateCategoryTitle(category) {
    const categoryTitles = {
        'all': 'All Products',
        'consumption_eggs': 'Fresh Eggs',
        'hatching_eggs': 'Hatching Eggs', 
        'balut': 'Balut',
        'pickled_eggs': 'Pickled Eggs',
        'shipping_supplies': 'Shipping Supplies'
    };
    
    const title = categoryTitles[category] || 'All Products';
    document.getElementById('categoryTitle').textContent = title;
    
    // Update page title
    document.title = `${title} - Harvest Eggs Marketplace`;
}

// Export new functions for global access
window.loadRareBreeds = loadRareBreeds;
window.handleBreedRequest = handleBreedRequest;

