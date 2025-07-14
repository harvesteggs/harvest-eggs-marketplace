// Clean Marketplace JavaScript - Simplified Navigation with Dropdowns

// Global variables
let products = [];
let cart = [];
let filteredProducts = [];
let currentCategory = 'fresh-eggs';
let currentSubCategory = null;
let searchTerm = '';

// API configuration
const API_BASE_URL = 'https://g8h3ilcv1gzw.manus.space/api';

// Category mapping for display
const categoryTitleMap = {
    'fresh-eggs': 'Fresh Eggs',
    'hatching-eggs': 'Hatching Eggs',
    'supplies': 'Supplies',
    'balut': 'Balut'
};

const subCategoryTitleMap = {
    'chicken': 'Chicken Hatching Eggs',
    'quail': 'Quail Hatching Eggs', 
    'duck': 'Duck Hatching Eggs',
    'emu': 'Emu Hatching Eggs',
    'ostrich': 'Ostrich Hatching Eggs'
};

const categoryDescriptionMap = {
    'fresh-eggs': 'Farm-fresh consumable eggs delivered directly from local farmers to your table. Farmers get more than 90% of the cost listed right into their pockets.',
    'hatching-eggs': 'Premium hatching eggs from heritage breeds and specialty varieties for your breeding programs. Photos show adult birds.',
    'supplies': 'Professional packaging and shipping supplies to ensure your eggs arrive safely.',
    'balut': 'Traditional delicacy eggs - duck and quail balut prepared by experienced farmers following authentic methods.'
};

// Comprehensive product database with sub-categories
const comprehensiveProducts = [
    // FRESH EGGS - All Consumable Varieties
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
        name: 'Extra Large White Eggs',
        description: 'Extra large white eggs from premium laying hens, perfect for professional baking.',
        price: 7.00,
        category: 'fresh-eggs',
        image: 'images/extra_large_white_eggs.jpg',
        farmer: 'Premium Poultry',
        location: 'Iowa'
    },
    {
        id: 5,
        name: 'Organic Free-Range Brown Eggs',
        description: 'Certified organic brown eggs from free-range chickens on pasture.',
        price: 8.00,
        category: 'fresh-eggs',
        image: 'images/organic_brown_eggs.jpg',
        farmer: 'Green Valley Organic',
        location: 'Oregon'
    },
    {
        id: 6,
        name: 'Organic Free-Range White Eggs',
        description: 'Certified organic white eggs from pasture-raised hens with organic feed.',
        price: 7.75,
        category: 'fresh-eggs',
        image: 'images/organic_white_eggs.jpg',
        farmer: 'Pure Pastures Farm',
        location: 'California'
    },
    {
        id: 7,
        name: 'Fresh Duck Eggs',
        description: 'Rich and creamy duck eggs perfect for baking and gourmet cooking.',
        price: 12.00,
        category: 'fresh-eggs',
        image: 'images/fresh_duck_eggs.jpg',
        farmer: 'Mallard Creek Farm',
        location: 'Wisconsin'
    },
    {
        id: 8,
        name: 'Fresh Quail Eggs',
        description: 'Delicate quail eggs, perfect for appetizers and specialty dishes.',
        price: 8.50,
        category: 'fresh-eggs',
        image: 'images/quail_eggs_fresh.jpg',
        farmer: 'Tiny Treasures Farm',
        location: 'California'
    },
    {
        id: 9,
        name: 'Fresh Emu Eggs',
        description: 'Large emu eggs with rich flavor, equivalent to about 10-12 chicken eggs.',
        price: 45.00,
        category: 'fresh-eggs',
        image: 'images/emu_eggs_fresh.jpg',
        farmer: 'Outback Emu Ranch',
        location: 'Texas'
    },
    {
        id: 10,
        name: 'Fresh Ostrich Eggs',
        description: 'Massive ostrich eggs with mild flavor, equivalent to about 24 chicken eggs.',
        price: 85.00,
        category: 'fresh-eggs',
        image: 'images/ostrich_eggs_fresh.jpg',
        farmer: 'Big Bird Farm',
        location: 'Arizona'
    },

    // BALUT - Traditional Delicacy
    {
        id: 11,
        name: 'Traditional Duck Balut',
        description: 'Authentic duck balut prepared using traditional methods, 18-day incubation.',
        price: 15.00,
        category: 'balut',
        image: 'images/traditional_duck_balut.jpg',
        farmer: 'Manila Heritage Farm',
        location: 'Hawaii'
    },
    {
        id: 12,
        name: 'Premium Duck Balut',
        description: 'Premium quality duck balut with perfect texture and flavor development.',
        price: 18.00,
        category: 'balut',
        image: 'images/premium_duck_balut.jpg',
        farmer: 'Pacific Island Delicacies',
        location: 'California'
    },
    {
        id: 13,
        name: 'Quail Balut',
        description: 'Delicate quail balut, smaller portion perfect for first-time tasters.',
        price: 12.00,
        category: 'balut',
        image: 'images/quail_balut.jpg',
        farmer: 'Asian Specialty Farm',
        location: 'Washington'
    },

    // HATCHING EGGS - CHICKEN BREEDS
    {
        id: 14,
        name: 'Rhode Island Red Hatching Eggs',
        description: 'Premium hatching eggs from pure Rhode Island Red breeding stock. Excellent layers and dual-purpose birds.',
        price: 45.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/rhode_island_red_chicken.jpg',
        farmer: 'Heritage Poultry',
        location: 'Rhode Island'
    },
    {
        id: 15,
        name: 'Buff Orpington Hatching Eggs',
        description: 'Beautiful Buff Orpington hatching eggs from champion bloodlines. Gentle, broody hens.',
        price: 50.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/buff_orpington_chicken.jpg',
        farmer: 'Golden Feather Farm',
        location: 'Kentucky'
    },
    {
        id: 16,
        name: 'Black Orpington Hatching Eggs',
        description: 'Rare Black Orpington hatching eggs from heritage breeding program.',
        price: 65.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/black_orpington_chicken.jpg',
        farmer: 'Rare Breeds Conservancy',
        location: 'Virginia'
    },
    {
        id: 17,
        name: 'Blue Orpington Hatching Eggs',
        description: 'Stunning Blue Orpington hatching eggs with beautiful blue-gray plumage genetics.',
        price: 70.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/blue_orpington_chicken.jpg',
        farmer: 'Blue Sky Poultry',
        location: 'Montana'
    },
    {
        id: 18,
        name: 'Lavender Orpington Hatching Eggs',
        description: 'Rare Lavender Orpington hatching eggs with unique lavender-colored plumage.',
        price: 85.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/lavender_orpington_chicken.jpg',
        farmer: 'Lavender Hill Farm',
        location: 'North Carolina'
    },
    {
        id: 19,
        name: 'White Crested Black Polish Hatching Eggs',
        description: 'Ornamental Polish hatching eggs with distinctive white crests and black bodies.',
        price: 55.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/white_crested_black_polish_chicken.jpg',
        farmer: 'Polish Pride Poultry',
        location: 'Wisconsin'
    },
    {
        id: 20,
        name: 'Golden Polish Hatching Eggs',
        description: 'Beautiful Golden Polish hatching eggs with golden plumage and distinctive crests.',
        price: 60.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/golden_polish_chicken.jpg',
        farmer: 'Crest & Crown Farm',
        location: 'Michigan'
    },
    {
        id: 21,
        name: 'Silver Polish Hatching Eggs',
        description: 'Elegant Silver Polish hatching eggs with silver-laced plumage patterns.',
        price: 58.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/silver_polish_chicken.jpg',
        farmer: 'Silver Lining Poultry',
        location: 'Minnesota'
    },
    {
        id: 22,
        name: 'Light Brahma Hatching Eggs',
        description: 'Majestic Light Brahma hatching eggs from gentle giants with feathered feet.',
        price: 48.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/light_brahma_chicken.jpg',
        farmer: 'Giant Breed Farm',
        location: 'Nebraska'
    },
    {
        id: 23,
        name: 'Dark Brahma Hatching Eggs',
        description: 'Impressive Dark Brahma hatching eggs with striking dark plumage patterns.',
        price: 52.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/dark_brahma_chicken.jpg',
        farmer: 'Brahma Breeders Co.',
        location: 'Kansas'
    },
    {
        id: 24,
        name: 'Buff Brahma Hatching Eggs',
        description: 'Beautiful Buff Brahma hatching eggs with golden buff coloring and feathered legs.',
        price: 55.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/buff_brahma_chicken.jpg',
        farmer: 'Feathered Feet Farm',
        location: 'Missouri'
    },
    {
        id: 25,
        name: 'Silkie Hatching Eggs',
        description: 'Fluffy Silkie hatching eggs from birds with silk-like plumage and black skin.',
        price: 42.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/silkie_chicken.jpg',
        farmer: 'Silky Smooth Poultry',
        location: 'Georgia'
    },
    {
        id: 26,
        name: 'Ameraucana Hatching Eggs',
        description: 'Ameraucana hatching eggs that lay beautiful blue eggs with excellent cold hardiness.',
        price: 46.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/ameraucana_chicken.jpg',
        farmer: 'Blue Egg Specialists',
        location: 'Colorado'
    },
    {
        id: 27,
        name: 'French Black Copper Marans Hatching Eggs',
        description: 'Premium Marans hatching eggs that lay the darkest chocolate brown eggs.',
        price: 75.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/marans_chicken.jpg',
        farmer: 'Chocolate Egg Farm',
        location: 'Louisiana'
    },
    {
        id: 28,
        name: 'Silver Laced Wyandotte Hatching Eggs',
        description: 'Classic Wyandotte hatching eggs with beautiful silver-laced plumage patterns.',
        price: 44.00,
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/wyandotte_chicken.jpg',
        farmer: 'Laced Feather Farm',
        location: 'New York'
    },

    // HATCHING EGGS - QUAIL BREEDS
    {
        id: 29,
        name: 'Coturnix Pharaoh Quail Hatching Eggs',
        description: 'Standard Coturnix Pharaoh quail hatching eggs, excellent for meat and egg production.',
        price: 25.00,
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/coturnix_pharaoh_quail.jpg',
        farmer: 'Quail Valley Farm',
        location: 'Texas'
    },
    {
        id: 30,
        name: 'Jumbo Coturnix Quail Hatching Eggs',
        description: 'Large Jumbo Coturnix quail hatching eggs for maximum meat production.',
        price: 30.00,
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/jumbo_coturnix_quail.jpg',
        farmer: 'Big Quail Ranch',
        location: 'Oklahoma'
    },
    {
        id: 31,
        name: 'Jumbo White Coturnix Quail Hatching Eggs',
        description: 'Pure white Jumbo Coturnix quail hatching eggs with excellent processing qualities.',
        price: 32.00,
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/jumbo_white_coturnix_quail.jpg',
        farmer: 'White Feather Quail',
        location: 'Arkansas'
    },
    {
        id: 32,
        name: 'Texas A&M Coturnix Quail Hatching Eggs',
        description: 'Texas A&M strain Coturnix quail hatching eggs, bred for rapid growth and high production.',
        price: 35.00,
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/texas_am_coturnix_quail.jpg',
        farmer: 'Lone Star Quail',
        location: 'Texas'
    },
    {
        id: 33,
        name: 'Bobwhite Quail Hatching Eggs',
        description: 'Native Bobwhite quail hatching eggs for hunting preserves and conservation.',
        price: 40.00,
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/bobwhite_quail.jpg',
        farmer: 'Wild Game Birds',
        location: 'Tennessee'
    },

    // HATCHING EGGS - DUCK BREEDS
    {
        id: 34,
        name: 'Mallard Duck Hatching Eggs',
        description: 'Wild-type Mallard duck hatching eggs, excellent for conservation and hunting.',
        price: 38.00,
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/mallard_duck.jpg',
        farmer: 'Wetland Waterfowl',
        location: 'Minnesota'
    },
    {
        id: 35,
        name: 'Pekin Duck Hatching Eggs',
        description: 'Large white Pekin duck hatching eggs, the classic meat duck breed.',
        price: 35.00,
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/pekin_duck.jpg',
        farmer: 'Duck Dynasty Farm',
        location: 'Indiana'
    },
    {
        id: 36,
        name: 'Welsh Harlequin Duck Hatching Eggs',
        description: 'Beautiful Welsh Harlequin duck hatching eggs, excellent layers and foragers.',
        price: 42.00,
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/welsh_harlequin_duck.jpg',
        farmer: 'Celtic Waterfowl',
        location: 'Maine'
    },
    {
        id: 37,
        name: 'Khaki Campbell Duck Hatching Eggs',
        description: 'Prolific Khaki Campbell duck hatching eggs, champion egg layers.',
        price: 40.00,
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/khaki_campbell_duck.jpg',
        farmer: 'Campbell Creek Farm',
        location: 'Oregon'
    },

    // HATCHING EGGS - EMU BREEDS
    {
        id: 38,
        name: 'Emu Hatching Eggs',
        description: 'Large emu hatching eggs from healthy breeding stock. Requires specialized incubation.',
        price: 150.00,
        category: 'hatching-eggs',
        subCategory: 'emu',
        image: 'images/emu_adult.jpg',
        farmer: 'Outback Emu Ranch',
        location: 'Texas'
    },

    // HATCHING EGGS - OSTRICH BREEDS
    {
        id: 39,
        name: 'Ostrich Hatching Eggs',
        description: 'Massive ostrich hatching eggs from premium breeding birds. Professional incubation recommended.',
        price: 300.00,
        category: 'hatching-eggs',
        subCategory: 'ostrich',
        image: 'images/ostrich_adult.jpg',
        farmer: 'Big Bird Farm',
        location: 'Arizona'
    },

    // SUPPLIES
    {
        id: 40,
        name: 'Chicken Egg Cartons - 12 count (Pack of 25)',
        description: 'Professional egg cartons for safe shipping and storage of chicken eggs.',
        price: 15.00,
        category: 'supplies',
        image: 'images/chicken_egg_cartons.jpg',
        farmer: 'Farm Supply Co.',
        location: 'Texas'
    },
    {
        id: 41,
        name: 'Quail Egg Cartons - 24 count (Pack of 20)',
        description: 'Specialized cartons designed for quail eggs with proper sizing.',
        price: 18.00,
        category: 'supplies',
        image: 'images/quail_egg_cartons.jpg',
        farmer: 'Specialty Packaging',
        location: 'California'
    },
    {
        id: 42,
        name: 'Duck Egg Cartons - 6 count (Pack of 30)',
        description: 'Large cartons specifically designed for duck eggs.',
        price: 20.00,
        category: 'supplies',
        image: 'images/duck_egg_cartons.jpg',
        farmer: 'Waterfowl Supplies',
        location: 'Wisconsin'
    },
    {
        id: 43,
        name: 'Insulated Shipping Box - Large',
        description: 'Insulated shipping boxes to keep eggs fresh during transport.',
        price: 8.50,
        category: 'supplies',
        image: 'images/insulated_shipping_box_large.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois'
    },
    {
        id: 44,
        name: 'Insulated Shipping Box - Medium',
        description: 'Medium-sized insulated boxes perfect for smaller orders.',
        price: 6.50,
        category: 'supplies',
        image: 'images/insulated_shipping_box_medium.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois'
    },
    {
        id: 45,
        name: 'Insulated Shipping Box - Small',
        description: 'Small insulated boxes ideal for specialty egg shipments.',
        price: 4.50,
        category: 'supplies',
        image: 'images/insulated_shipping_box_small.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois'
    },
    {
        id: 46,
        name: 'Bubble Wrap Roll - 12" x 50ft',
        description: 'Professional bubble wrap for extra protection during shipping.',
        price: 12.00,
        category: 'supplies',
        image: 'images/bubble_wrap_roll.jpg',
        farmer: 'Protective Packaging',
        location: 'Ohio'
    },
    {
        id: 47,
        name: 'Fragile Stickers - Roll of 100',
        description: 'High-visibility fragile stickers for egg shipments.',
        price: 8.00,
        category: 'supplies',
        image: 'images/fragile_stickers.jpg',
        farmer: 'Label Solutions',
        location: 'New Jersey'
    },
    {
        id: 48,
        name: 'Fragile Tape - 2" x 55 yards',
        description: 'Professional fragile tape with clear messaging.',
        price: 10.00,
        category: 'supplies',
        image: 'images/fragile_tape.jpg',
        farmer: 'Tape & More',
        location: 'Pennsylvania'
    }
];

// Initialize marketplace
document.addEventListener('DOMContentLoaded', function() {
    // Load comprehensive products
    products = comprehensiveProducts;
    filteredProducts = products;
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial products
    loadProducts();
    
    // Update cart display
    updateCartDisplay();
    
    // Handle URL parameters
    handleURLParameters();
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
    
    // Main category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            if (category === 'hatching-eggs') {
                toggleHatchingSubMenu();
            } else {
                hideHatchingSubMenu();
                filterByCategory(category);
                updateActiveCategoryButton(this);
            }
        });
    });
    
    // Sub-category buttons
    const subCategoryButtons = document.querySelectorAll('.sub-category-btn');
    subCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subCategory = this.getAttribute('data-subcategory');
            filterBySubCategory('hatching-eggs', subCategory);
            updateActiveSubCategoryButton(this);
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

// Toggle hatching eggs sub-menu
function toggleHatchingSubMenu() {
    const subMenu = document.getElementById('hatchingSubMenu');
    if (subMenu) {
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
    }
}

// Hide hatching eggs sub-menu
function hideHatchingSubMenu() {
    const subMenu = document.getElementById('hatchingSubMenu');
    if (subMenu) {
        subMenu.style.display = 'none';
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchTerm = searchInput.value.trim().toLowerCase();
    console.log('Searching for:', searchTerm);
    
    if (searchTerm === '') {
        loadProducts();
        return;
    }
    
    // Filter products by search term
    filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm) ||
               product.farmer.toLowerCase().includes(searchTerm);
    });
    
    displayProducts();
    updateResultsInfo();
    updatePageTitle('Search Results');
}

// Filter by main category
function filterByCategory(category) {
    console.log('Filtering by category:', category);
    currentCategory = category;
    currentSubCategory = null;
    searchTerm = '';
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Filter products
    filteredProducts = products.filter(product => product.category === category);
    
    displayProducts();
    updatePageInfo();
}

// Filter by sub-category
function filterBySubCategory(category, subCategory) {
    console.log('Filtering by sub-category:', category, subCategory);
    currentCategory = category;
    currentSubCategory = subCategory;
    searchTerm = '';
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Filter products
    filteredProducts = products.filter(product => 
        product.category === category && product.subCategory === subCategory
    );
    
    displayProducts();
    updatePageInfo();
}

// Update active category button
function updateActiveCategoryButton(activeButton) {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Update active sub-category button
function updateActiveSubCategoryButton(activeButton) {
    const subCategoryButtons = document.querySelectorAll('.sub-category-btn');
    subCategoryButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Load products
function loadProducts() {
    // Filter by current category and sub-category
    if (currentSubCategory) {
        filteredProducts = products.filter(product => 
            product.category === currentCategory && product.subCategory === currentSubCategory
        );
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
    let title = categoryTitleMap[currentCategory] || 'Products';
    if (currentSubCategory) {
        title = subCategoryTitleMap[currentSubCategory] || title;
    }
    
    updatePageTitle(title);
    
    const categoryDescription = document.getElementById('categoryDescription');
    if (categoryDescription) {
        categoryDescription.textContent = categoryDescriptionMap[currentCategory] || '';
    }
    
    updateResultsInfo();
}

// Update page title
function updatePageTitle(title) {
    const categoryTitle = document.getElementById('categoryTitle');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    
    if (categoryTitle) {
        categoryTitle.textContent = title;
    }
    
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = title;
    }
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
    const subCategory = urlParams.get('subcategory');
    
    if (category) {
        currentCategory = category;
        
        if (subCategory) {
            currentSubCategory = subCategory;
            filterBySubCategory(category, subCategory);
            
            // Show hatching sub-menu if needed
            if (category === 'hatching-eggs') {
                const subMenu = document.getElementById('hatchingSubMenu');
                if (subMenu) {
                    subMenu.style.display = 'block';
                }
            }
        } else {
            filterByCategory(category);
        }
        
        // Update active buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            if (button.getAttribute('data-category') === category) {
                updateActiveCategoryButton(button);
            }
        });
        
        if (subCategory) {
            const subCategoryButtons = document.querySelectorAll('.sub-category-btn');
            subCategoryButtons.forEach(button => {
                if (button.getAttribute('data-subcategory') === subCategory) {
                    updateActiveSubCategoryButton(button);
                }
            });
        }
    }
}

