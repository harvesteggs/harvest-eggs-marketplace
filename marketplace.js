// Marketplace specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set default category to fresh eggs
    currentCategory = 'consumption_eggs';
    
    // Update category select to show fresh eggs as selected
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.value = 'consumption_eggs';
    }
    
    // Load products with fresh eggs filter
    loadProducts();
    
    // Handle category changes
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        if (selectedCategory === 'all') {
            // Redirect to all products page
            window.location.href = 'all-products.html';
            return;
        }
        
        currentCategory = selectedCategory;
        searchTerm = '';
        document.getElementById('searchInput').value = '';
        loadProducts();
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
    
    // Load rare breeds
    loadRareBreeds();
    
    // Handle breed request form
    const breedRequestForm = document.getElementById('breedRequestForm');
    breedRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBreedRequest();
    });
});

// Override the category mapping for marketplace
const categoryTitleMap = {
    'consumption_eggs': 'Fresh Eggs',
    'hatching_eggs': 'Hatching Eggs',
    'balut': 'Balut',
    'pickled_eggs': 'Pickled Eggs',
    'shipping_supplies': 'Shipping Supplies',
    'all': 'All Products'
};

// Override displayProducts to update page title
const originalDisplayProducts = displayProducts;
displayProducts = function() {
    originalDisplayProducts();
    
    // Update page title and results count
    const categoryTitle = document.getElementById('categoryTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    if (categoryTitle) {
        categoryTitle.textContent = categoryTitleMap[currentCategory] || 'Products';
    }
    
    if (resultsCount) {
        const count = filteredProducts.length;
        resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
    }
};

// Cart sidebar functions
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

// Show all products function
function showAllProducts() {
    window.location.href = 'all-products.html';
}

// Rare breeds functionality
async function loadRareBreeds() {
    try {
        const response = await fetch(`${API_BASE_URL}/rare-breeds`);
        const rareBreeds = await response.json();
        
        const rareBreedsGrid = document.getElementById('rareBreedsGrid');
        
        if (rareBreeds.length === 0) {
            rareBreedsGrid.innerHTML = '<div class="loading-message">No rare breeds available at the moment.</div>';
            return;
        }
        
        rareBreedsGrid.innerHTML = rareBreeds.map(breed => `
            <div class="rare-breed-card">
                <h4>${breed.name}</h4>
                <p><strong>Type:</strong> ${breed.animal_type}</p>
                <p><strong>Origin:</strong> ${breed.country_of_origin || 'Unknown'}</p>
                <p>${breed.description}</p>
                ${breed.special_characteristics ? `<p><strong>Special:</strong> ${breed.special_characteristics}</p>` : ''}
                <div class="breed-status">
                    <span class="status-badge ${breed.status}">${breed.status}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading rare breeds:', error);
        document.getElementById('rareBreedsGrid').innerHTML = '<div class="loading-message">Error loading rare breeds.</div>';
    }
}

// Submit breed request
async function submitBreedRequest() {
    const formData = new FormData(document.getElementById('breedRequestForm'));
    const breedRequest = Object.fromEntries(formData);
    
    try {
        const response = await fetch(`${API_BASE_URL}/rare-breeds/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(breedRequest)
        });
        
        if (response.ok) {
            alert('Thank you! Your breed request has been submitted successfully.');
            document.getElementById('breedRequestForm').reset();
        } else {
            throw new Error('Failed to submit request');
        }
    } catch (error) {
        console.error('Error submitting breed request:', error);
        alert('Sorry, there was an error submitting your request. Please try again.');
    }
}

// Handle URL parameters for direct category access
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && category !== 'all') {
        currentCategory = category;
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
            categorySelect.value = category;
        }
        loadProducts();
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', handleURLParameters);

