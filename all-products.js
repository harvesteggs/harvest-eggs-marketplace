// All Products page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set default category to all
    currentCategory = 'all';
    
    // Update category select to show all products as selected
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.value = 'all';
    }
    
    // Load all products
    loadProducts();
    
    // Handle category changes from dropdown
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        if (selectedCategory === 'all') {
            // Stay on all products page
            currentCategory = 'all';
            updateFilterButtons('all');
        } else {
            // Redirect to marketplace with specific category
            window.location.href = `marketplace.html?category=${selectedCategory}`;
            return;
        }
        
        searchTerm = '';
        document.getElementById('searchInput').value = '';
        loadProducts();
    });
    
    // Handle category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            updateFilterButtons(category);
            
            // Update category and load products
            currentCategory = category;
            searchTerm = '';
            document.getElementById('searchInput').value = '';
            loadProducts();
        });
    });
    
    // Handle search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        searchTerm = searchInput.value.trim();
        loadProducts();
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', function() {
        showCartSidebar();
    });
});

// Update filter button states
function updateFilterButtons(activeCategory) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        if (category === activeCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Override the category mapping for all products page
const allProductsCategoryTitleMap = {
    'consumption_eggs': 'Fresh Eggs',
    'hatching_eggs': 'Hatching Eggs',
    'balut': 'Balut',
    'pickled_eggs': 'Pickled Eggs',
    'shipping_supplies': 'Shipping Supplies',
    'all': 'All Products'
};

// Override displayProducts to update page title and filter buttons
const originalDisplayProducts = displayProducts;
displayProducts = function() {
    originalDisplayProducts();
    
    // Update page title and results count
    const categoryTitle = document.getElementById('categoryTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    if (categoryTitle) {
        categoryTitle.textContent = allProductsCategoryTitleMap[currentCategory] || 'All Products';
    }
    
    if (resultsCount) {
        const count = filteredProducts.length;
        resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
    }
    
    // Update filter buttons
    updateFilterButtons(currentCategory);
};

// Clear filters function
function clearFilters() {
    currentCategory = 'all';
    searchTerm = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('categorySelect').value = 'all';
    updateFilterButtons('all');
    loadProducts();
}

// Cart sidebar functions (reuse from marketplace)
function showCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.style.display = 'flex';
    setTimeout(() => {
        sidebar.classList.add('active');
    }, 10);
    
    updateCartSidebar();
}

function hideCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.remove('active');
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300);
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const sidebarCartTotal = document.getElementById('sidebarCartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    ${item.subscription ? `<small>🔄 ${item.subscription}</small>` : ''}
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    sidebarCartTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle URL parameters for direct category access
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentCategory = category;
        updateFilterButtons(category);
        loadProducts();
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', handleURLParameters);

