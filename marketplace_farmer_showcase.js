// Farmer Showcase Marketplace JavaScript - No Fixed Pricing

// Global variables
let products = [];
let filteredProducts = [];
let currentCategory = 'fresh-eggs';
let currentSubCategory = null;
let searchTerm = '';

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
    'fresh-eggs': 'Farm-fresh consumable eggs from local farmers. Each farmer sets their own prices and shares their unique farm story.',
    'hatching-eggs': 'Premium hatching eggs from heritage breeds and specialty varieties. Connect directly with breeders to learn about their programs and pricing.',
    'supplies': 'Professional packaging and shipping supplies from trusted suppliers.',
    'balut': 'Traditional delicacy eggs from experienced farmers following authentic methods.'
};

// Product database - Farmer Showcase Format (No Fixed Pricing)
const farmerShowcaseProducts = [
    // FRESH EGGS - Farmer Showcase
    {
        id: 1,
        name: 'Farm Fresh Brown Eggs - Large',
        description: 'Premium brown eggs from free-range hens, delivered fresh from our family farm.',
        category: 'fresh-eggs',
        image: 'images/farm_fresh_brown_eggs_large.jpg',
        farmer: 'Johnson Family Farm',
        location: 'Vermont',
        farmStory: 'Third-generation family farm specializing in heritage breed chickens on 50 acres of Vermont pasture.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs', '24 eggs', '30 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 2,
        name: 'Farm Fresh White Eggs - Large',
        description: 'Classic white eggs from pasture-raised hens, perfect for all your cooking needs.',
        category: 'fresh-eggs',
        image: 'images/farm_fresh_white_eggs_large.jpg',
        farmer: 'Sunrise Acres',
        location: 'Ohio',
        farmStory: 'Sustainable farming practices with 200 free-range hens on certified organic pastures.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs', '24 eggs', '30 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 3,
        name: 'Extra Large Brown Eggs',
        description: 'Extra large brown eggs from heritage breed hens, ideal for baking and cooking.',
        category: 'fresh-eggs',
        image: 'images/extra_large_brown_eggs.jpg',
        farmer: 'Heritage Farm Co.',
        location: 'Pennsylvania',
        farmStory: 'Dedicated to preserving heritage chicken breeds with traditional farming methods since 1985.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs', '24 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 4,
        name: 'Extra Large White Eggs',
        description: 'Extra large white eggs from premium laying hens, perfect for professional baking.',
        category: 'fresh-eggs',
        image: 'images/extra_large_white_eggs.jpg',
        farmer: 'Premium Poultry',
        location: 'Iowa',
        farmStory: 'Commercial-scale operation focused on consistent quality and reliable supply for bakeries and restaurants.',
        availableQuantities: ['12 eggs', '24 eggs', '36 eggs', '48 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 5,
        name: 'Organic Free-Range Brown Eggs',
        description: 'Certified organic brown eggs from free-range chickens on pasture.',
        category: 'fresh-eggs',
        image: 'images/organic_brown_eggs.jpg',
        farmer: 'Green Valley Organic',
        location: 'Oregon',
        farmStory: 'USDA Certified Organic farm with 300 hens roaming 40 acres of certified organic pasture.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 6,
        name: 'Organic Free-Range White Eggs',
        description: 'Certified organic white eggs from pasture-raised hens with organic feed.',
        category: 'fresh-eggs',
        image: 'images/organic_white_eggs.jpg',
        farmer: 'Pure Pastures Farm',
        location: 'California',
        farmStory: 'Family-owned organic farm committed to sustainable agriculture and animal welfare.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 7,
        name: 'Fresh Duck Eggs',
        description: 'Rich and creamy duck eggs perfect for baking and gourmet cooking.',
        category: 'fresh-eggs',
        image: 'images/fresh_duck_eggs.jpg',
        farmer: 'Mallard Creek Farm',
        location: 'Wisconsin',
        farmStory: 'Specialty waterfowl farm with Khaki Campbell and Pekin ducks on natural pond systems.',
        availableQuantities: ['4 eggs', '6 eggs', '8 eggs', '12 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 8,
        name: 'Fresh Quail Eggs',
        description: 'Delicate quail eggs, perfect for appetizers and specialty dishes.',
        category: 'fresh-eggs',
        image: 'images/quail_eggs_fresh.jpg',
        farmer: 'Tiny Treasures Farm',
        location: 'California',
        farmStory: 'Boutique quail farm specializing in Coturnix quail for gourmet restaurants and specialty markets.',
        availableQuantities: ['12 eggs', '18 eggs', '24 eggs', '36 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 9,
        name: 'Fresh Emu Eggs',
        description: 'Large emu eggs with rich flavor, equivalent to about 10-12 chicken eggs.',
        category: 'fresh-eggs',
        image: 'images/emu_eggs_fresh.jpg',
        farmer: 'Outback Emu Ranch',
        location: 'Texas',
        farmStory: 'Exotic bird ranch with 50 breeding emus, offering unique culinary experiences.',
        availableQuantities: ['1 egg', '2 eggs', '3 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 10,
        name: 'Fresh Ostrich Eggs',
        description: 'Massive ostrich eggs with mild flavor, equivalent to about 24 chicken eggs.',
        category: 'fresh-eggs',
        image: 'images/ostrich_eggs_fresh.jpg',
        farmer: 'Big Bird Farm',
        location: 'Arizona',
        farmStory: 'Premier ostrich ranch with 30 breeding pairs, supplying restaurants and special events.',
        availableQuantities: ['1 egg', '2 eggs'],
        farmContact: 'Contact farmer for current pricing and availability'
    },

    // BALUT - Farmer Showcase
    {
        id: 11,
        name: 'Traditional Duck Balut',
        description: 'Authentic duck balut prepared using traditional methods, 18-day incubation.',
        category: 'balut',
        image: 'images/traditional_duck_balut.jpg',
        farmer: 'Manila Heritage Farm',
        location: 'Hawaii',
        farmStory: 'Traditional Filipino family farm bringing authentic balut preparation methods to America.',
        availableQuantities: ['6 pieces', '12 pieces', '18 pieces'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 12,
        name: 'Premium Duck Balut',
        description: 'Premium quality duck balut with perfect texture and flavor development.',
        category: 'balut',
        image: 'images/premium_duck_balut.jpg',
        farmer: 'Pacific Island Delicacies',
        location: 'California',
        farmStory: 'Artisanal balut producer focusing on premium quality and consistent preparation.',
        availableQuantities: ['6 pieces', '12 pieces'],
        farmContact: 'Contact farmer for current pricing and availability'
    },
    {
        id: 13,
        name: 'Quail Balut',
        description: 'Delicate quail balut, smaller portion perfect for first-time tasters.',
        category: 'balut',
        image: 'images/quail_balut.jpg',
        farmer: 'Asian Specialty Farm',
        location: 'Washington',
        farmStory: 'Specialty Asian delicacy farm introducing traditional foods to American markets.',
        availableQuantities: ['12 pieces', '18 pieces', '24 pieces'],
        farmContact: 'Contact farmer for current pricing and availability'
    },

    // HATCHING EGGS - CHICKEN BREEDS
    {
        id: 14,
        name: 'Rhode Island Red Hatching Eggs',
        description: 'Premium hatching eggs from pure Rhode Island Red breeding stock. Excellent layers and dual-purpose birds.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/rhode_island_red_chicken.jpg',
        farmer: 'Heritage Poultry',
        location: 'Rhode Island',
        farmStory: 'Dedicated to preserving the original Rhode Island Red bloodlines with champion breeding stock.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs', '24 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 15,
        name: 'Buff Orpington Hatching Eggs',
        description: 'Beautiful Buff Orpington hatching eggs from champion bloodlines. Gentle, broody hens.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/buff_orpington_chicken.jpg',
        farmer: 'Golden Feather Farm',
        location: 'Kentucky',
        farmStory: 'Award-winning Orpington breeder with birds winning at national poultry shows.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 16,
        name: 'Black Orpington Hatching Eggs',
        description: 'Rare Black Orpington hatching eggs from heritage breeding program.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/black_orpington_chicken.jpg',
        farmer: 'Rare Breeds Conservancy',
        location: 'Virginia',
        farmStory: 'Conservation breeding program focused on preserving rare and endangered poultry breeds.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 17,
        name: 'Blue Orpington Hatching Eggs',
        description: 'Stunning Blue Orpington hatching eggs with beautiful blue-gray plumage genetics.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/blue_orpington_chicken.jpg',
        farmer: 'Blue Sky Poultry',
        location: 'Montana',
        farmStory: 'Specialty breeder focusing on rare color varieties of heritage breeds.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 18,
        name: 'Lavender Orpington Hatching Eggs',
        description: 'Rare Lavender Orpington hatching eggs with unique lavender-colored plumage.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/lavender_orpington_chicken.jpg',
        farmer: 'Lavender Hill Farm',
        location: 'North Carolina',
        farmStory: 'Boutique breeder specializing in the rarest Orpington color varieties.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 19,
        name: 'White Crested Black Polish Hatching Eggs',
        description: 'Ornamental Polish hatching eggs with distinctive white crests and black bodies.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/white_crested_black_polish_chicken.jpg',
        farmer: 'Polish Pride Poultry',
        location: 'Wisconsin',
        farmStory: 'Ornamental poultry specialist with champion Polish birds and perfect crests.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 20,
        name: 'Golden Polish Hatching Eggs',
        description: 'Beautiful Golden Polish hatching eggs with golden plumage and distinctive crests.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/golden_polish_chicken.jpg',
        farmer: 'Crest & Crown Farm',
        location: 'Michigan',
        farmStory: 'Show-quality Polish breeder with birds featured in poultry magazines.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 21,
        name: 'Silver Polish Hatching Eggs',
        description: 'Elegant Silver Polish hatching eggs with silver-laced plumage patterns.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/silver_polish_chicken.jpg',
        farmer: 'Silver Lining Poultry',
        location: 'Minnesota',
        farmStory: 'Family farm breeding Polish chickens for three generations with impeccable bloodlines.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 22,
        name: 'Light Brahma Hatching Eggs',
        description: 'Majestic Light Brahma hatching eggs from gentle giants with feathered feet.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/light_brahma_chicken.jpg',
        farmer: 'Giant Breed Farm',
        location: 'Nebraska',
        farmStory: 'Large breed specialist with Brahmas weighing 10+ pounds and gentle temperaments.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 23,
        name: 'Dark Brahma Hatching Eggs',
        description: 'Impressive Dark Brahma hatching eggs with striking dark plumage patterns.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/dark_brahma_chicken.jpg',
        farmer: 'Brahma Breeders Co.',
        location: 'Kansas',
        farmStory: 'Brahma specialists with birds tracing back to original Asian imports.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 24,
        name: 'Buff Brahma Hatching Eggs',
        description: 'Beautiful Buff Brahma hatching eggs with golden buff coloring and feathered legs.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/buff_brahma_chicken.jpg',
        farmer: 'Feathered Feet Farm',
        location: 'Missouri',
        farmStory: 'Rare breed conservancy focusing on the beautiful and gentle Buff Brahma variety.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 25,
        name: 'Silkie Hatching Eggs',
        description: 'Fluffy Silkie hatching eggs from birds with silk-like plumage and black skin.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/silkie_chicken.jpg',
        farmer: 'Silky Smooth Poultry',
        location: 'Georgia',
        farmStory: 'Silkie specialist with champion birds known for their mothering abilities and unique appearance.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 26,
        name: 'Ameraucana Hatching Eggs',
        description: 'Ameraucana hatching eggs that lay beautiful blue eggs with excellent cold hardiness.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/ameraucana_chicken.jpg',
        farmer: 'Blue Egg Specialists',
        location: 'Colorado',
        farmStory: 'True Ameraucana breeder with birds meeting strict breed standards for blue eggs.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 27,
        name: 'French Black Copper Marans Hatching Eggs',
        description: 'Premium Marans hatching eggs that lay the darkest chocolate brown eggs.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/marans_chicken.jpg',
        farmer: 'Chocolate Egg Farm',
        location: 'Louisiana',
        farmStory: 'Marans specialist with eggs scoring 7+ on the Marans egg color chart.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 28,
        name: 'Silver Laced Wyandotte Hatching Eggs',
        description: 'Classic Wyandotte hatching eggs with beautiful silver-laced plumage patterns.',
        category: 'hatching-eggs',
        subCategory: 'chicken',
        image: 'images/wyandotte_chicken.jpg',
        farmer: 'Laced Feather Farm',
        location: 'New York',
        farmStory: 'Heritage breed farm with Wyandottes featuring perfect lacing patterns and rose combs.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },

    // HATCHING EGGS - QUAIL BREEDS
    {
        id: 29,
        name: 'Coturnix Pharaoh Quail Hatching Eggs',
        description: 'Standard Coturnix Pharaoh quail hatching eggs, excellent for meat and egg production.',
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/coturnix_pharaoh_quail.jpg',
        farmer: 'Quail Valley Farm',
        location: 'Texas',
        farmStory: 'Commercial quail operation with 1000+ breeding birds and consistent production.',
        availableQuantities: ['24 eggs', '48 eggs', '72 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 30,
        name: 'Jumbo Coturnix Quail Hatching Eggs',
        description: 'Large Jumbo Coturnix quail hatching eggs for maximum meat production.',
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/jumbo_coturnix_quail.jpg',
        farmer: 'Big Quail Ranch',
        location: 'Oklahoma',
        farmStory: 'Selective breeding program producing the largest Coturnix quail in America.',
        availableQuantities: ['24 eggs', '48 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 31,
        name: 'Jumbo White Coturnix Quail Hatching Eggs',
        description: 'Pure white Jumbo Coturnix quail hatching eggs with excellent processing qualities.',
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/jumbo_white_coturnix_quail.jpg',
        farmer: 'White Feather Quail',
        location: 'Arkansas',
        farmStory: 'Specialty white quail breeder supplying restaurants and gourmet markets.',
        availableQuantities: ['24 eggs', '48 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 32,
        name: 'Texas A&M Coturnix Quail Hatching Eggs',
        description: 'Texas A&M strain Coturnix quail hatching eggs, bred for rapid growth and high production.',
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/texas_am_coturnix_quail.jpg',
        farmer: 'Lone Star Quail',
        location: 'Texas',
        farmStory: 'University-developed strain with superior growth rates and feed conversion.',
        availableQuantities: ['24 eggs', '48 eggs', '72 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 33,
        name: 'Bobwhite Quail Hatching Eggs',
        description: 'Native Bobwhite quail hatching eggs for hunting preserves and conservation.',
        category: 'hatching-eggs',
        subCategory: 'quail',
        image: 'images/bobwhite_quail.jpg',
        farmer: 'Wild Game Birds',
        location: 'Tennessee',
        farmStory: 'Conservation breeding program supporting native Bobwhite quail populations.',
        availableQuantities: ['24 eggs', '48 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },

    // HATCHING EGGS - DUCK BREEDS
    {
        id: 34,
        name: 'Mallard Duck Hatching Eggs',
        description: 'Wild-type Mallard duck hatching eggs, excellent for conservation and hunting.',
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/mallard_duck.jpg',
        farmer: 'Wetland Waterfowl',
        location: 'Minnesota',
        farmStory: 'Waterfowl conservation farm supporting wetland restoration projects.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 35,
        name: 'Pekin Duck Hatching Eggs',
        description: 'Large white Pekin duck hatching eggs, the classic meat duck breed.',
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/pekin_duck.jpg',
        farmer: 'Duck Dynasty Farm',
        location: 'Indiana',
        farmStory: 'Commercial duck operation with fast-growing Pekin ducks for meat production.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs', '24 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 36,
        name: 'Welsh Harlequin Duck Hatching Eggs',
        description: 'Beautiful Welsh Harlequin duck hatching eggs, excellent layers and foragers.',
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/welsh_harlequin_duck.jpg',
        farmer: 'Celtic Waterfowl',
        location: 'Maine',
        farmStory: 'Rare breed specialist preserving the beautiful and productive Welsh Harlequin.',
        availableQuantities: ['6 eggs', '12 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },
    {
        id: 37,
        name: 'Khaki Campbell Duck Hatching Eggs',
        description: 'Prolific Khaki Campbell duck hatching eggs, champion egg layers.',
        category: 'hatching-eggs',
        subCategory: 'duck',
        image: 'images/khaki_campbell_duck.jpg',
        farmer: 'Campbell Creek Farm',
        location: 'Oregon',
        farmStory: 'Duck egg specialist with Khaki Campbells laying 300+ eggs per year.',
        availableQuantities: ['6 eggs', '12 eggs', '18 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },

    // HATCHING EGGS - EMU BREEDS
    {
        id: 38,
        name: 'Emu Hatching Eggs',
        description: 'Large emu hatching eggs from healthy breeding stock. Requires specialized incubation.',
        category: 'hatching-eggs',
        subCategory: 'emu',
        image: 'images/emu_adult.jpg',
        farmer: 'Outback Emu Ranch',
        location: 'Texas',
        farmStory: 'Premier emu ranch with 50 breeding pairs and specialized incubation facilities.',
        availableQuantities: ['1 egg', '2 eggs', '3 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },

    // HATCHING EGGS - OSTRICH BREEDS
    {
        id: 39,
        name: 'Ostrich Hatching Eggs',
        description: 'Massive ostrich hatching eggs from premium breeding birds. Professional incubation recommended.',
        category: 'hatching-eggs',
        subCategory: 'ostrich',
        image: 'images/ostrich_adult.jpg',
        farmer: 'Big Bird Farm',
        location: 'Arizona',
        farmStory: 'Ostrich breeding specialist with 30 breeding pairs and professional incubation services.',
        availableQuantities: ['1 egg', '2 eggs'],
        farmContact: 'Contact breeder for current pricing and availability'
    },

    // SUPPLIES
    {
        id: 40,
        name: 'Chicken Egg Cartons - 12 count (Pack of 25)',
        description: 'Professional egg cartons for safe shipping and storage of chicken eggs.',
        category: 'supplies',
        image: 'images/chicken_egg_cartons.jpg',
        farmer: 'Farm Supply Co.',
        location: 'Texas',
        farmStory: 'Agricultural supply company serving farmers across America for 30 years.',
        availableQuantities: ['1 pack (25 cartons)', '2 packs (50 cartons)', '4 packs (100 cartons)'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 41,
        name: 'Quail Egg Cartons - 24 count (Pack of 20)',
        description: 'Specialized cartons designed for quail eggs with proper sizing.',
        category: 'supplies',
        image: 'images/quail_egg_cartons.jpg',
        farmer: 'Specialty Packaging',
        location: 'California',
        farmStory: 'Packaging specialist for specialty poultry products and small-scale farmers.',
        availableQuantities: ['1 pack (20 cartons)', '2 packs (40 cartons)', '5 packs (100 cartons)'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 42,
        name: 'Duck Egg Cartons - 6 count (Pack of 30)',
        description: 'Large cartons specifically designed for duck eggs.',
        category: 'supplies',
        image: 'images/duck_egg_cartons.jpg',
        farmer: 'Waterfowl Supplies',
        location: 'Wisconsin',
        farmStory: 'Waterfowl equipment specialist serving duck and goose farmers nationwide.',
        availableQuantities: ['1 pack (30 cartons)', '2 packs (60 cartons)', '3 packs (90 cartons)'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 43,
        name: 'Insulated Shipping Box - Large',
        description: 'Insulated shipping boxes to keep eggs fresh during transport.',
        category: 'supplies',
        image: 'images/insulated_shipping_box_large.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois',
        farmStory: 'Cold chain packaging specialist ensuring product freshness during shipping.',
        availableQuantities: ['5 boxes', '10 boxes', '25 boxes', '50 boxes'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 44,
        name: 'Insulated Shipping Box - Medium',
        description: 'Medium-sized insulated boxes perfect for smaller orders.',
        category: 'supplies',
        image: 'images/insulated_shipping_box_medium.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois',
        farmStory: 'Cold chain packaging specialist ensuring product freshness during shipping.',
        availableQuantities: ['5 boxes', '10 boxes', '25 boxes', '50 boxes'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 45,
        name: 'Insulated Shipping Box - Small',
        description: 'Small insulated boxes ideal for specialty egg shipments.',
        category: 'supplies',
        image: 'images/insulated_shipping_box_small.jpg',
        farmer: 'Packaging Solutions',
        location: 'Illinois',
        farmStory: 'Cold chain packaging specialist ensuring product freshness during shipping.',
        availableQuantities: ['5 boxes', '10 boxes', '25 boxes', '50 boxes'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 46,
        name: 'Bubble Wrap Roll - 12" x 50ft',
        description: 'Professional bubble wrap for extra protection during shipping.',
        category: 'supplies',
        image: 'images/bubble_wrap_roll.jpg',
        farmer: 'Protective Packaging',
        location: 'Ohio',
        farmStory: 'Protective packaging solutions for fragile agricultural products.',
        availableQuantities: ['1 roll', '2 rolls', '5 rolls', '10 rolls'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 47,
        name: 'Fragile Stickers - Roll of 100',
        description: 'High-visibility fragile stickers for egg shipments.',
        category: 'supplies',
        image: 'images/fragile_stickers.jpg',
        farmer: 'Label Solutions',
        location: 'New Jersey',
        farmStory: 'Professional labeling solutions for shipping and packaging needs.',
        availableQuantities: ['1 roll (100 stickers)', '5 rolls (500 stickers)', '10 rolls (1000 stickers)'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    },
    {
        id: 48,
        name: 'Fragile Tape - 2" x 55 yards',
        description: 'Professional fragile tape with clear messaging.',
        category: 'supplies',
        image: 'images/fragile_tape.jpg',
        farmer: 'Tape & More',
        location: 'Pennsylvania',
        farmStory: 'Industrial tape solutions for professional packaging and shipping.',
        availableQuantities: ['1 roll', '6 rolls', '12 rolls', '24 rolls'],
        farmContact: 'Contact supplier for current pricing and bulk discounts'
    }
];

// Initialize marketplace
document.addEventListener('DOMContentLoaded', function() {
    // Load farmer showcase products
    products = farmerShowcaseProducts;
    filteredProducts = products;
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial products
    loadProducts();
    
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
               product.farmer.toLowerCase().includes(searchTerm) ||
               product.farmStory.toLowerCase().includes(searchTerm);
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

// Display products - Farmer Showcase Format
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
        <div class="product-card farmer-showcase">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/egg_placeholder.jpg'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="farmer-info">
                    <div class="farmer-header">
                        <h4 class="farmer-name">${product.farmer}</h4>
                        <span class="farmer-location">${product.location}</span>
                    </div>
                    <p class="farm-story">${product.farmStory}</p>
                </div>
                
                <div class="availability-info">
                    <h5>Available Quantities:</h5>
                    <div class="quantity-options">
                        ${product.availableQuantities.map(qty => `<span class="quantity-option">${qty}</span>`).join('')}
                    </div>
                </div>
                
                <div class="contact-info">
                    <p class="contact-text">${product.farmContact}</p>
                    <button class="contact-farmer-btn" onclick="contactFarmer('${product.farmer}', '${product.name}')">
                        Contact ${product.farmer}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Contact farmer function
function contactFarmer(farmerName, productName) {
    // Create contact modal or redirect to contact form
    const message = `I'm interested in ${productName} from ${farmerName}. Please provide pricing and availability information.`;
    
    // For now, show an alert with the contact information
    alert(`Contact ${farmerName} about ${productName}\n\nSample message:\n"${message}"\n\nThis would normally open a contact form or messaging system.`);
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
        resultsCount.textContent = `${count} farmer${count !== 1 ? 's' : ''} offering products`;
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

