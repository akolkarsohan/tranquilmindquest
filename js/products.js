// ===== PRODUCTS PAGE JAVASCRIPT =====

// Product data with real Amazon products
const productsData = [
  // Books & Journals (6 products)
  {
    id: 1,
    title: "The Body Keeps the Score",
    author: "by Bessel van der Kolk",
    price: 489,
    originalPrice: 1825,
    rating: 4.7,
    reviews: 48234,
    category: "books",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Groundbreaking exploration of trauma's effects on body and mind. Essential reading for understanding PTSD and healing pathways.",
    features: [
      "New York Times Bestseller",
      "Research-backed insights on trauma",
      "Practical healing approaches"
    ],
    asin: "0143127748",
    amazonUrl: "https://www.amazon.in/dp/0141978619/?tag=curiouspulsea-21"
  },
  {
    id: 2,
    title: "The Anxiety and Worry Workbook",
    author: "CBT-Based",
    price: 2575,
    rating: 4.6,
    reviews: 5847,
    category: "books",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Evidence-based CBT techniques to manage anxiety. Includes exercises, worksheets, and practical strategies.",
    features: [
      "Clinically proven CBT methods",
      "Interactive exercises",
      "Step-by-step guidance"
    ],
    asin: "1462505894",
    amazonUrl: "https://www.amazon.in/dp/1462546161/?tag=curiouspulsea-21"
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "by James Clear",
    price: 495,
    rating: 4.8,
    reviews: 127456,
    category: "books",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Transform your life through tiny habit changes. Perfect for building lasting mental wellness routines.",
    features: [
      "Science-backed habit formation",
      "Practical implementation strategies",
      "Over 10 million copies sold"
    ],
    asin: "0735211299",
    amazonUrl: "https://www.amazon.in/dp/1847941834/?tag=curiouspulsea-21"
  },
  {
    id: 4,
    title: "The Mindfulness Journal",
    author: "Guided Daily Practice",
    price: 169,
    rating: 4.5,
    reviews: 8234,
    category: "books",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Structured journal with prompts for daily mindfulness practice. Includes gratitude exercises and reflection space.",
    features: [
      "365-day guided entries",
      "Mindfulness prompts",
      "Gratitude tracking"
    ],
    asin: "1641521710",
    amazonUrl: "https://www.amazon.in/dp/0752265601/?tag=curiouspulsea-21"
  },
  {
    id: 5,
    title: "Why We Sleep",
    author: "by Matthew Walker PhD",
    price: 250,
    rating: 4.6,
    reviews: 42891,
    category: "books",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Scientific exploration of sleep's critical role in mental health. Learn to optimize your sleep for better well-being.",
    features: [
      "Neuroscience-based insights",
      "Sleep optimization strategies",
      "Mental health connections"
    ],
    asin: "1501144329",
    amazonUrl: "https://www.amazon.in/dp/B06Y649387/?tag=curiouspulsea-21"
  },
  {
    id: 6,
    title: "The Gifts of Imperfection",
    author: "by Brené Brown",
    price: 548,
    rating: 4.7,
    reviews: 15672,
    category: "books",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Let go of perfectionism and embrace authenticity. Research-based guide to wholehearted living.",
    features: [
      "Research professor insights",
      "Shame resilience strategies",
      "Self-compassion practices"
    ],
    asin: "159285849X",
    amazonUrl: "https://www.amazon.in/dp/1785043544/?tag=curiouspulsea-21"
  },
  
  // Meditation & Yoga (6 products)
  {
    id: 7,
    title: "Meditation Cushion Zafu - Buckwheat Fill",
    price: 1399,
    originalPrice: 4149,
    rating: 4.6,
    reviews: 3421,
    category: "meditation",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Ergonomic meditation cushion with organic buckwheat hull fill. Provides proper spine alignment for extended sitting.",
    features: [
      "100% organic cotton cover",
      "Adjustable loft (buckwheat fill)",
      "Multiple colors available"
    ],
    asin: "B07XYZ123",
    amazonUrl: "https://www.amazon.in/dp/B08617VNGN/?tag=curiouspulsea-21"
  },
  {
    id: 8,
    title: "Yoga Mat - Extra Thick (6mm) Non-Slip",
    price: 837,
    rating: 4.7,
    reviews: 18765,
    category: "meditation",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Premium TPE yoga mat with superior grip and cushioning. Eco-friendly, lightweight, perfect for home practice.",
    features: [
      "6mm thick cushioning",
      "Non-slip surface",
      "Free carrying strap"
    ],
    asin: "B08ABC456",
    amazonUrl: "https://www.amazon.in/dp/B0D5LVMJCC/?tag=curiouspulsea-21"
  },
  {
    id: 9,
    title: "Singing Bowl Set - Tibetan Meditation Bowl",
    price: 899,
    rating: 4.5,
    reviews: 4892,
    category: "meditation",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Hand-hammered singing bowl for meditation and sound healing. Includes wooden striker and cushion.",
    features: [
      "Authentic Tibetan design",
      "Rich, calming tones",
      "Complete set with accessories"
    ],
    asin: "B09DEF789",
    amazonUrl: "https://www.amazon.in/dp/B0CYPJLQQM/?tag=curiouspulsea-21"
  },
  {
    id: 10,
    title: "Yoga Blocks (Set of 2) + Strap",
    price: 895,
    rating: 4.6,
    reviews: 9234,
    category: "meditation",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "High-density foam blocks for yoga support and alignment. Perfect for beginners and advanced practitioners.",
    features: [
      "Lightweight yet sturdy",
      "Non-slip surface",
      "Bonus 8ft yoga strap"
    ],
    asin: "B07GHI012",
    amazonUrl: "https://www.amazon.in/dp/B091NRG5QG/?tag=curiouspulsea-21"
  },
  {
    id: 11,
    title: "Meditation Bench - Folding Kneeling Stool",
    price: 1379,
    rating: 4.4,
    reviews: 1987,
    category: "meditation",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Portable meditation bench relieves pressure on knees and ankles. Bamboo construction, folds flat.",
    features: [
      "Ergonomic angle design",
      "Sustainable bamboo",
      "Travel-friendly folding"
    ],
    asin: "B08JKL345",
    amazonUrl: "https://www.amazon.in/dp/B0DS8VK8B2/?tag=curiouspulsea-21"
  },
  {
    id: 12,
    title: "Bolster Pillow for Yoga & Meditation",
    price: 1095,
    rating: 4.7,
    reviews: 2341,
    category: "meditation",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Firm rectangular bolster for restorative yoga and meditation. Organic cotton cover, buckwheat fill.",
    features: [
      "28\" x 10\" x 6\" dimensions",
      "Removable washable cover",
      "Versatile support positions"
    ],
    asin: "B09MNO678",
    amazonUrl: "https://www.amazon.in/dp/B0CPYJXNW9/?tag=curiouspulsea-21"
  },
  
  // Aromatherapy (4 products)
  {
    id: 13,
    title: "Essential Oil Diffuser - 500ml Ultrasonic",
    price: 999,
    rating: 4.5,
    reviews: 34567,
    category: "aromatherapy",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Large-capacity aromatherapy diffuser with 7 LED colors. Runs up to 10 hours, perfect for bedrooms.",
    features: [
      "Whisper-quiet operation",
      "Auto shut-off safety",
      "BPA-free materials"
    ],
    asin: "B07PQR901",
    amazonUrl: "https://www.amazon.in/dp/B0DT6XMM8R/?tag=curiouspulsea-21"
  },
  {
    id: 14,
    title: "Lavender Essential Oil Set (Top 6 Oils)",
    price: 6270,
    rating: 4.6,
    reviews: 12890,
    category: "aromatherapy",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Pure therapeutic-grade essential oils. Includes lavender, eucalyptus, peppermint, tea tree, lemon, orange.",
    features: [
      "100% pure, no additives",
      "GC/MS tested",
      "Perfect starter set"
    ],
    asin: "B08STU234",
    amazonUrl: "https://www.amazon.in/dp/B00J8O18TQ/?tag=curiouspulsea-21"
  },
  {
    id: 15,
    title: "Aromatherapy Candles - Stress Relief Collection",
    price: 489,
    rating: 4.4,
    reviews: 5432,
    category: "aromatherapy",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Natural soy wax candles with essential oils. Set of 6 calming scents for relaxation and stress relief.",
    features: [
      "Lead-free cotton wicks",
      "4-hour burn time each",
      "Non-toxic, eco-friendly"
    ],
    asin: "B09VWX567",
    amazonUrl: "https://www.amazon.in/dp/B0FLYF99SB/?tag=curiouspulsea-21"
  },
  {
    id: 16,
    title: "Himalayan Salt Lamp - Natural Air Purifier",
    price: 780,
    rating: 4.3,
    reviews: 8765,
    category: "aromatherapy",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Hand-carved salt crystal lamp creates warm, calming ambiance. Natural negative ion generator.",
    features: [
      "8-10 lbs authentic salt",
      "Wooden base included",
      "Dimmable cord"
    ],
    asin: "B08YZA890",
    amazonUrl: "https://www.amazon.in/dp/B07RS3G2W3/?tag=curiouspulsea-21"
  },
  
  // Sleep Aids (4 products)
  {
    id: 17,
    title: "Weighted Blanket 15-20 lbs - Anxiety Relief",
    price: 3999,
    originalPrice: 6639,
    rating: 4.6,
    reviews: 23456,
    category: "sleep",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Premium weighted blanket with glass beads for deep pressure therapy. Proven to reduce anxiety and improve sleep.",
    features: [
      "Breathable cotton fabric",
      "Even weight distribution",
      "Multiple size/weight options"
    ],
    asin: "B07BCD123",
    amazonUrl: "https://www.amazon.in/dp/B09SZBJ3FZ/?tag=curiouspulsea-21"
  },
  {
    id: 18,
    title: "White Noise Machine - 30 Soothing Sounds",
    price: 2550,
    rating: 4.7,
    reviews: 45678,
    category: "sleep",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Sleep sound machine with nature sounds, fan noises, and white noise variations. Perfect for better sleep.",
    features: [
      "Timer function (1-6 hours)",
      "Memory function",
      "Portable and compact"
    ],
    asin: "B08EFG456",
    amazonUrl: "https://www.amazon.in/dp/B09GK8N6HV/?tag=curiouspulsea-21"
  },
  {
    id: 19,
    title: "Sleep Mask - 3D Contoured Eye Mask",
    price: 159,
    rating: 4.5,
    reviews: 18234,
    category: "sleep",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Zero-pressure 3D design allows natural eye movement during REM sleep. Blocks 100% of light.",
    features: [
      "Memory foam padding",
      "Adjustable strap",
      "Breathable fabric"
    ],
    asin: "B09HIJ789",
    amazonUrl: "https://www.amazon.in/dp/B0B21J3KYP/?tag=curiouspulsea-21"
  },
  {
    id: 20,
    title: "Melatonin Gummies - Natural Sleep Support",
    price: 384,
    rating: 4.4,
    reviews: 9876,
    category: "sleep",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Drug-free sleep aid with 3mg melatonin per gummy. Natural berry flavor, vegan, sugar-free.",
    features: [
      "60-day supply",
      "Non-habit forming",
      "Third-party tested"
    ],
    asin: "B08KLM012",
    amazonUrl: "https://www.amazon.in/s?k=B0CMM7YGKD&tag=curiouspulsea-21"
  },
  
  // Stress Relief Tools (4 products)
  {
    id: 21,
    title: "Acupressure Mat and Pillow Set",
    price: 1149,
    rating: 4.5,
    reviews: 7654,
    category: "stress",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Therapeutic mat with 6,210 pressure points relieves back pain and stress. Based on ancient acupressure principles.",
    features: [
      "Non-toxic materials",
      "Includes carrying bag",
      "Multiple position use"
    ],
    asin: "B07NOP345",
    amazonUrl: "https://www.amazon.in/dp/B07QD2TBX5/?tag=curiouspulsea-21"
  },
  {
    id: 22,
    title: "Fidget Sensory Toys Set (12 pieces)",
    price: 599,
    rating: 4.3,
    reviews: 5432,
    category: "stress",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Anxiety relief fidget tools for focus and stress reduction. Perfect for desk or pocket.",
    features: [
      "Discreet and portable",
      "Quiet operation",
      "Variety pack"
    ],
    asin: "B08QRS678",
    amazonUrl: "https://www.amazon.in/dp/B0DY6LQN5P/?tag=curiouspulsea-21"
  },
  {
    id: 23,
    title: "Stress Relief Ball - Hand Therapy Exerciser",
    price: 189,
    rating: 4.4,
    reviews: 3210,
    category: "stress",
    prime: true,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Gel stress ball for hand strengthening and tension relief. Color changes with temperature.",
    features: [
      "Durable non-toxic gel",
      "Therapeutic resistance",
      "Travel-friendly size"
    ],
    asin: "B09TUV901",
    amazonUrl: "https://www.amazon.in/dp/B0CQX7JFD9/?tag=curiouspulsea-21"
  },
  {
    id: 24,
    title: "Adult Coloring Book - Mindful Mandalas",
    price: 191,
    rating: 4.6,
    reviews: 6789,
    category: "stress",
    prime: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Xyoa+oYfL._SX342_SY445_.jpg",
    description: "Intricate mandala designs for stress relief through creative coloring. Thick, high-quality paper.",
    features: [
      "50 unique designs",
      "Single-sided pages",
      "Perforated for easy removal"
    ],
    asin: "B08WXYZ234",
    amazonUrl: "https://www.amazon.in/dp/B0B4NYMP2H/?tag=curiouspulsea-21"
  }
];

// Global variables
let currentProducts = [...productsData];
let filteredProducts = [...productsData];
let selectedProducts = [];
let currentCategory = 'all';
let currentSort = 'featured';
let currentSearch = '';

// DOM elements
const productsGrid = document.getElementById('products-grid');
const loadingState = document.getElementById('loading-state');
const noResults = document.getElementById('no-results');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('product-search');
const productModal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const comparisonBar = document.getElementById('comparison-bar');
const compareBtn = document.getElementById('compare-btn');
const clearComparison = document.getElementById('clear-comparison');
const compareCount = document.getElementById('compare-count');
const comparisonModal = document.getElementById('comparison-modal');
const comparisonTable = document.getElementById('comparison-table');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeProducts();
  initializeFilters();
  initializeModals();
  initializeFAQ();
  initializeNewsletter();
});

// Initialize products display
function initializeProducts() {
  displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(products) {
  if (products.length === 0) {
    showNoResults();
    return;
  }

  hideLoading();
  hideNoResults();

  productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
  
  // Add event listeners to product cards
  addProductEventListeners();
}

// Create product card HTML
function createProductCard(product) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const stars = generateStars(product.rating);
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="product-badges">
          ${product.prime ? '<span class="product-badge prime">Prime</span>' : ''}
          ${discount > 0 ? `<span class="product-badge sale">${discount}% OFF</span>` : ''}
        </div>
        <div class="compare-checkbox" data-product-id="${product.id}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        ${product.author ? `<p class="product-author">${product.author}</p>` : ''}
        
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-text">${product.rating}/5 (${product.reviews.toLocaleString()} reviews)</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">₹${product.price}</span>
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          ${discount > 0 ? `<span class="discount-badge">Save ₹${(product.originalPrice - product.price).toFixed(0)}</span>` : ''}
        </div>
        
        <p class="product-description">${product.description}</p>
        
        <div class="product-features">
          <ul>
            ${product.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="product-actions">
          <a href="${product.amazonUrl}" class="btn-primary" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
            View on Amazon
          </a>
          <button class="btn-secondary learn-more-btn" data-product-id="${product.id}">
            Learn More
          </button>
        </div>
      </div>
    </div>
  `;
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="star">★</span>';
  }
  
  // Half star
  if (hasHalfStar) {
    stars += '<span class="star">★</span>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<span class="star empty">★</span>';
  }
  
  return stars;
}

// Add event listeners to product cards
function addProductEventListeners() {
  // Learn more buttons
  document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(btn.dataset.productId);
      showProductModal(productId);
    });
  });
  
  // Compare checkboxes
  document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(checkbox.dataset.productId);
      toggleProductComparison(productId, checkbox);
    });
  });
}

// Initialize filters
function initializeFilters() {
  // Category filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });
  
  // Sort dropdown
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFilters();
  });
  
  // Search input
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    applyFilters();
  });
}

// Apply all filters
function applyFilters() {
  showLoading();
  
  // Filter by category
  if (currentCategory === 'all') {
    filteredProducts = [...productsData];
  } else {
    filteredProducts = productsData.filter(product => product.category === currentCategory);
  }
  
  // Filter by search
  if (currentSearch) {
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(currentSearch) ||
      product.description.toLowerCase().includes(currentSearch) ||
      product.features.some(feature => feature.toLowerCase().includes(currentSearch))
    );
  }
  
  // Sort products
  sortProducts();
  
  // Display results
  setTimeout(() => {
    displayProducts(filteredProducts);
  }, 300);
}

// Sort products
function sortProducts() {
  switch (currentSort) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'featured':
    default:
      // Keep original order
      break;
  }
}

// Show loading state
function showLoading() {
  loadingState.style.display = 'flex';
  noResults.style.display = 'none';
  productsGrid.style.display = 'none';
}

// Hide loading state
function hideLoading() {
  loadingState.style.display = 'none';
  productsGrid.style.display = 'grid';
}

// Show no results
function showNoResults() {
  hideLoading();
  noResults.style.display = 'flex';
  productsGrid.style.display = 'none';
}

// Hide no results
function hideNoResults() {
  noResults.style.display = 'none';
}

// Initialize modals
function initializeModals() {
  // Product modal
  const modalClose = productModal.querySelector('.modal-close');
  modalClose.addEventListener('click', closeProductModal);
  
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal();
    }
  });
  
  // Comparison modal
  const comparisonModalClose = comparisonModal.querySelector('.modal-close');
  comparisonModalClose.addEventListener('click', closeComparisonModal);
  
  comparisonModal.addEventListener('click', (e) => {
    if (e.target === comparisonModal) {
      closeComparisonModal();
    }
  });
  
  // Comparison bar buttons
  compareBtn.addEventListener('click', showComparisonModal);
  clearComparison.addEventListener('click', clearAllComparisons);
}

// Show product modal
function showProductModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  const stars = generateStars(product.rating);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  modalBody.innerHTML = `
    <div class="product-modal-content">
      <div class="product-modal-image">
        <img src="${product.image}" alt="${product.title}">
        ${product.prime ? '<span class="product-badge prime">Prime</span>' : ''}
        ${discount > 0 ? `<span class="product-badge sale">${discount}% OFF</span>` : ''}
      </div>
      
      <div class="product-modal-details">
        <h2>${product.title}</h2>
        ${product.author ? `<p class="product-author">${product.author}</p>` : ''}
        
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-text">${product.rating}/5 (${product.reviews.toLocaleString()} reviews)</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">₹${product.price}</span>
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          ${discount > 0 ? `<span class="discount-badge">Save ₹${(product.originalPrice - product.price).toFixed(0)}</span>` : ''}
        </div>
        
        <div class="product-description-full">
          <h3>Description</h3>
          <p>${product.description}</p>
        </div>
        
        <div class="product-features-full">
          <h3>Key Features</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="why-recommend">
          <h3>Why We Recommend This</h3>
          <p>This product has been carefully selected based on scientific research, user reviews, and proven effectiveness for mental wellness. It aligns with our mission to provide evidence-based tools for your wellness journey.</p>
        </div>
        
        <div class="product-modal-actions">
          <a href="${product.amazonUrl}" class="btn-primary" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  `;
  
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
  productModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Toggle product comparison
function toggleProductComparison(productId, checkbox) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  if (selectedProducts.includes(productId)) {
    selectedProducts = selectedProducts.filter(id => id !== productId);
    checkbox.classList.remove('checked');
  } else {
    if (selectedProducts.length >= 3) {
      alert('You can compare up to 3 products at a time.');
      return;
    }
    selectedProducts.push(productId);
    checkbox.classList.add('checked');
  }
  
  updateComparisonBar();
}

// Update comparison bar
function updateComparisonBar() {
  if (selectedProducts.length > 0) {
    comparisonBar.style.display = 'block';
    comparisonBar.classList.add('show');
    compareCount.textContent = selectedProducts.length;
  } else {
    comparisonBar.classList.remove('show');
    setTimeout(() => {
      if (selectedProducts.length === 0) {
        comparisonBar.style.display = 'none';
      }
    }, 300);
  }
}

// Show comparison modal
function showComparisonModal() {
  if (selectedProducts.length === 0) return;
  
  const products = selectedProducts.map(id => productsData.find(p => p.id === id));
  
  comparisonTable.innerHTML = `
    <div class="comparison-header">
      <h2>Product Comparison</h2>
      <p>Compare ${products.length} selected products</p>
    </div>
    
    <div class="comparison-grid">
      <div class="comparison-product">
        <div class="comparison-image">
          <img src="${products[0].image}" alt="${products[0].title}">
        </div>
        <h3>${products[0].title}</h3>
        <div class="comparison-price">$${products[0].price}</div>
        <div class="comparison-rating">${products[0].rating}/5 (${products[0].reviews.toLocaleString()})</div>
        <div class="comparison-features">
          <h4>Key Features:</h4>
          <ul>
            ${products[0].features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <a href="${products[0].amazonUrl}" class="btn-primary" target="_blank" rel="noopener">View on Amazon</a>
      </div>
      
      ${products[1] ? `
      <div class="comparison-product">
        <div class="comparison-image">
          <img src="${products[1].image}" alt="${products[1].title}">
        </div>
        <h3>${products[1].title}</h3>
        <div class="comparison-price">$${products[1].price}</div>
        <div class="comparison-rating">${products[1].rating}/5 (${products[1].reviews.toLocaleString()})</div>
        <div class="comparison-features">
          <h4>Key Features:</h4>
          <ul>
            ${products[1].features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <a href="${products[1].amazonUrl}" class="btn-primary" target="_blank" rel="noopener">View on Amazon</a>
      </div>
      ` : ''}
      
      ${products[2] ? `
      <div class="comparison-product">
        <div class="comparison-image">
          <img src="${products[2].image}" alt="${products[2].title}">
        </div>
        <h3>${products[2].title}</h3>
        <div class="comparison-price">$${products[2].price}</div>
        <div class="comparison-rating">${products[2].rating}/5 (${products[2].reviews.toLocaleString()})</div>
        <div class="comparison-features">
          <h4>Key Features:</h4>
          <ul>
            ${products[2].features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <a href="${products[2].amazonUrl}" class="btn-primary" target="_blank" rel="noopener">View on Amazon</a>
      </div>
      ` : ''}
    </div>
  `;
  
  comparisonModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close comparison modal
function closeComparisonModal() {
  comparisonModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Clear all comparisons
function clearAllComparisons() {
  selectedProducts = [];
  document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
    checkbox.classList.remove('checked');
  });
  updateComparisonBar();
}

// Initialize FAQ accordion
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all other questions
      faqQuestions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.style.maxHeight = '0';
      });
      
      // Toggle current question
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        question.nextElementSibling.style.maxHeight = '200px';
      }
    });
  });
}

// Initialize newsletter form
function initializeNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const emailInput = newsletterForm.querySelector('.newsletter-input, input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';
    
    // Validate email
    if (!email) {
      alert('Please enter your email address.');
      if (emailInput) {
        emailInput.focus();
        emailInput.classList.add('error');
      }
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      if (emailInput) {
        emailInput.focus();
        emailInput.classList.add('error');
      }
      return;
    }
    
    // Get API endpoint from config
    const apiEndpoint = (typeof window !== 'undefined' && window.NEWSLETTER_CONFIG) 
      ? window.NEWSLETTER_CONFIG.API_ENDPOINT 
      : null;
    
    // Disable submit button
    const submitButton = newsletterForm.querySelector('button[type="submit"], .newsletter-btn');
    const originalButtonText = submitButton ? submitButton.textContent : 'Subscribe';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
    }
    
    // Try to send via API if configured
    if (apiEndpoint && !apiEndpoint.includes('YOUR_API_ID')) {
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Store email locally as backup
          saveSubscriptionToLocalStorage(email);
          alert(data.message || 'Thank you for subscribing! Please check your email for confirmation.');
          newsletterForm.reset();
        } else {
          // API failed, try localStorage fallback
          if (window.NEWSLETTER_CONFIG && window.NEWSLETTER_CONFIG.USE_FALLBACK) {
            saveSubscriptionToLocalStorage(email);
            alert('Thank you for subscribing to our wellness product reviews!');
            newsletterForm.reset();
          } else {
            alert(data.error || 'Subscription failed. Please try again.');
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            }
          }
        }
        if (emailInput) {
          emailInput.classList.remove('error');
        }
      })
      .catch(error => {
        console.error('API subscription error:', error);
        // API failed, try localStorage fallback
        if (window.NEWSLETTER_CONFIG && window.NEWSLETTER_CONFIG.USE_FALLBACK) {
          saveSubscriptionToLocalStorage(email);
          alert('Thank you for subscribing to our wellness product reviews!');
          newsletterForm.reset();
        } else {
          alert('Unable to connect. Please try again later.');
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        }
        if (emailInput) {
          emailInput.classList.remove('error');
        }
      });
    } else {
      // No API configured, use localStorage only
      saveSubscriptionToLocalStorage(email);
      alert('Thank you for subscribing to our wellness product reviews!');
      newsletterForm.reset();
      if (emailInput) {
        emailInput.classList.remove('error');
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

// Helper function to save subscription to localStorage
function saveSubscriptionToLocalStorage(email) {
  try {
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    const timestamp = new Date().toISOString();
    
    // Check if email already exists
    const existingIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingIndex >= 0) {
      subscribers[existingIndex].lastSubscription = timestamp;
    } else {
      subscribers.push({
        email: email,
        subscribedAt: timestamp,
        lastSubscription: timestamp
      });
    }
    
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
  } catch (error) {
    console.error('Error saving subscription to localStorage:', error);
  }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Add smooth animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.product-card, .trust-card, .guide-card, .blog-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

