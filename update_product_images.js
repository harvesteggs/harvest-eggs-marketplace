// Update product images with new generated images
const productImages = {
    // Hatching Eggs
    'Rhode Island Red Hatching Eggs': 'rhode_island_red_hatching_eggs.jpg',
    'Buff Orpington Hatching Eggs': 'buff_orpington_hatching_eggs.jpg', 
    'Silkie Hatching Eggs': 'silkie_hatching_eggs.jpg',
    'Coturnix Quail Hatching Eggs': 'coturnix_quail_hatching_eggs.jpg',
    'Bobwhite Quail Hatching Eggs': 'bobwhite_quail_hatching_eggs.jpg',
    'Mallard Duck Hatching Eggs': 'mallard_duck_hatching_eggs.jpg',
    'Pekin Duck Hatching Eggs': 'pekin_duck_hatching_eggs.jpg',
    
    // Fresh Eggs (existing images)
    'Farm Fresh Brown Eggs - Large': 'brown_eggs_large.jpg',
    'Farm Fresh White Eggs - Large': 'white_eggs_large.jpg',
    'Extra Large Brown Eggs': 'brown_eggs_xl.jpg',
    'Fresh Duck Eggs': 'duck_eggs.jpg',
    'Quail Eggs - Fresh': 'quail_eggs.jpg',
    'Emu Eggs - Fresh': 'emu_eggs.jpg',
    'Ostrich Eggs - Fresh': 'ostrich_eggs.jpg',
    
    // Balut (existing images)
    'Traditional Duck Balut': 'duck_balut.jpg',
    'Quail Balut': 'quail_balut.jpg',
    
    // Pickled Eggs (existing images)
    'Premium Pickled Quail Eggs - 12 count': 'pickled_quail_eggs.jpg',
    'Spicy Pickled Quail Eggs - 12 count': 'spicy_pickled_quail_eggs.jpg',
    'Classic Pickled Quail Eggs': 'classic_pickled_eggs.jpg',
    'Spicy Pickled Quail Eggs': 'spicy_pickled_eggs.jpg',
    'Garlic Pickled Quail Eggs': 'garlic_pickled_eggs.jpg',
    'Dill Pickled Chicken Eggs': 'dill_pickled_eggs.jpg',
    
    // Shipping Supplies (existing images)
    'Fragile Stickers - Roll of 100': 'fragile_stickers.jpg',
    'Fragile Tape - 2" x 55 yards': 'fragile_tape.jpg',
    'Chicken Egg Cartons - Standard': 'chicken_cartons.jpg',
    'Extra Large Egg Cartons': 'xl_cartons.jpg',
    'Quail Egg Cartons': 'quail_cartons.jpg',
    'Emu Egg Shipping Box': 'emu_shipping_box.jpg',
    'Ostrich Egg Shipping Crate': 'ostrich_shipping_crate.jpg',
    'Fragile Stickers - Egg Safe': 'fragile_stickers_egg_safe.jpg',
    'Bubble Wrap - Egg Protection': 'bubble_wrap.jpg'
};

// Function to update product images in the frontend
function updateProductImages() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const nameElement = product.querySelector('.product-name');
        if (nameElement) {
            const productName = nameElement.textContent.trim();
            const imageElement = product.querySelector('.product-image');
            
            if (productImages[productName] && imageElement) {
                imageElement.src = productImages[productName];
                imageElement.alt = productName;
                console.log(`Updated image for: ${productName}`);
            }
        }
    });
}

// Auto-update images when page loads
document.addEventListener('DOMContentLoaded', updateProductImages);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productImages, updateProductImages };
}

