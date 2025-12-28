// ===== BLOG JAVASCRIPT =====

// Blog data with sample posts
const blogPosts = [
  {
    id: 1,
    title: "5 Breathing Techniques to Calm Anxiety in Under 5 Minutes",
    excerpt: "Discover powerful breathing exercises that can help you find calm and reduce anxiety in just a few minutes. These evidence-based techniques are perfect for busy schedules.",
    category: "meditation",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "March 15, 2024",
    readTime: "8 min read",
    views: 2300,
    likes: 156,
    comments: 23,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: true
  },
  {
    id: 2,
    title: "My Journey from Burnout to Balance: A Personal Story",
    excerpt: "How I learned to prioritize mental health and find sustainable work-life balance through mindfulness practices and boundary setting.",
    category: "personal",
    author: "Michael Chen",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "March 10, 2024",
    readTime: "12 min read",
    views: 1800,
    likes: 89,
    comments: 15,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 3,
    title: "The Science Behind Meditation: What Research Really Says",
    excerpt: "An evidence-based look at how meditation affects the brain and why it's so effective for mental wellness and stress reduction.",
    category: "research",
    author: "Dr. Emily Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "March 8, 2024",
    readTime: "10 min read",
    views: 1500,
    likes: 134,
    comments: 8,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 4,
    title: "10 Ways to Manage Daily Stress",
    excerpt: "Simple, practical strategies to reduce stress and improve your overall well-being throughout the day.",
    category: "wellness",
    author: "Lisa Park",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "March 5, 2024",
    readTime: "6 min read",
    views: 1200,
    likes: 78,
    comments: 12,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Sleep Hygiene for Better Mental Health",
    excerpt: "Learn how proper sleep habits can significantly improve your mental wellness and overall quality of life.",
    category: "wellness",
    author: "Dr. James Wilson",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "March 3, 2024",
    readTime: "7 min read",
    views: 980,
    likes: 65,
    comments: 6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Understanding Anxiety: A Complete Guide",
    excerpt: "Everything you need to know about anxiety disorders, symptoms, and evidence-based treatment options.",
    category: "anxiety",
    author: "Dr. Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 28, 2024",
    readTime: "15 min read",
    views: 2100,
    likes: 145,
    comments: 19,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 7,
    title: "Mindfulness for Beginners: A Step-by-Step Guide",
    excerpt: "Start your mindfulness journey with these simple techniques and practices designed for complete beginners.",
    category: "meditation",
    author: "Alex Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 25, 2024",
    readTime: "9 min read",
    views: 1650,
    likes: 92,
    comments: 14,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 8,
    title: "The Power of Gratitude in Mental Wellness",
    excerpt: "Discover how practicing gratitude can transform your mental health and overall outlook on life.",
    category: "wellness",
    author: "Maria Garcia",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 22, 2024",
    readTime: "5 min read",
    views: 1100,
    likes: 73,
    comments: 9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 9,
    title: "Expert Interview: Dr. Lisa Chen on Trauma Recovery",
    excerpt: "An in-depth conversation with a leading trauma specialist about healing, resilience, and recovery strategies.",
    category: "expert",
    author: "Interview Team",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 20, 2024",
    readTime: "20 min read",
    views: 850,
    likes: 56,
    comments: 7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 10,
    title: "Product Review: The Best Meditation Apps of 2024",
    excerpt: "A comprehensive review of the top meditation and mindfulness apps to help you find the perfect digital companion.",
    category: "reviews",
    author: "Tech Team",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 18, 2024",
    readTime: "11 min read",
    views: 1400,
    likes: 87,
    comments: 11,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 11,
    title: "Building Resilience: Strategies for Tough Times",
    excerpt: "Learn how to develop mental resilience and bounce back stronger from life's challenges and setbacks.",
    category: "wellness",
    author: "Dr. Michael Brown",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 15, 2024",
    readTime: "13 min read",
    views: 1750,
    likes: 98,
    comments: 16,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  },
  {
    id: 12,
    title: "The Mind-Body Connection: How Physical Health Affects Mental Wellness",
    excerpt: "Explore the powerful connection between physical and mental health and how to optimize both for overall well-being.",
    category: "research",
    author: "Dr. Jennifer Lee",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    publishDate: "February 12, 2024",
    readTime: "14 min read",
    views: 1300,
    likes: 76,
    comments: 10,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    featured: false
  }
];

// Global variables
let currentPosts = [...blogPosts];
let filteredPosts = [...blogPosts];
let currentCategory = 'all';
let currentSearch = '';
let postsPerPage = 12;
let currentPage = 1;

// DOM elements
const blogGrid = document.getElementById('blog-grid');
const filterPills = document.querySelectorAll('.filter-pill');
const searchInput = document.getElementById('blog-search');
const loadMoreBtn = document.getElementById('load-more-btn');
const showingCount = document.getElementById('showing-count');
const totalCount = document.getElementById('total-count');

// Initialize the blog page
document.addEventListener('DOMContentLoaded', function() {
  if (document.body.classList.contains('blog-page')) {
    initializeBlog();
  }
  if (document.body.classList.contains('blog-post-page')) {
    initializeBlogPost();
  }
});

// Initialize blog listing page
function initializeBlog() {
  displayPosts(filteredPosts.slice(0, postsPerPage));
  updatePostCount();
  initializeFilters();
  initializeSearch();
  initializeLoadMore();
  initializeNewsletter();
}

// Initialize blog post page
function initializeBlogPost() {
  initializeReadingProgress();
  initializeTableOfContents();
  initializeTextSizeControls();
  initializeSaveFunctionality();
  initializePrintFunctionality();
  initializeShareButtons();
  initializeFeedback();
  initializeNewsletter();
}

// Display blog posts
function displayPosts(posts) {
  if (posts.length === 0) {
    blogGrid.innerHTML = '<div class="no-posts"><h3>No posts found</h3><p>Try adjusting your search or filter criteria.</p></div>';
    return;
  }

  blogGrid.innerHTML = posts.map(post => createPostCard(post)).join('');
  
  // Add event listeners to post cards
  addPostEventListeners();
}

// Create blog post card HTML
function createPostCard(post) {
  const categoryClass = post.category.toLowerCase().replace(/\s+/g, '-');
  
  return `
    <article class="blog-card" data-post-id="${post.id}">
      <div class="blog-card-image">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <div class="blog-card-category">
          <span class="category-tag ${categoryClass}">${getCategoryName(post.category)}</span>
        </div>
      </div>
      <div class="blog-card-content">
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        
        <div class="blog-card-meta">
          <div class="blog-card-author">
            <img src="${post.authorAvatar}" alt="${post.author}" class="author-avatar">
            <span class="blog-card-author-name">${post.author}</span>
          </div>
          <div class="blog-card-stats">
            <span class="publish-date">${post.publishDate}</span>
            <span class="read-time">${post.readTime}</span>
          </div>
        </div>
        
        <div class="blog-card-actions">
          <a href="blog-post-template.html" class="blog-card-read-more">Read More</a>
          <div class="blog-card-engagement">
            <button class="engagement-btn like-btn" data-post-id="${post.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              ${post.likes}
            </button>
            <button class="engagement-btn comment-btn" data-post-id="${post.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              ${post.comments}
            </button>
            <button class="engagement-btn view-btn" data-post-id="${post.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              ${post.views}
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Get category display name
function getCategoryName(category) {
  const categoryNames = {
    'meditation': 'Meditation Guides',
    'anxiety': 'Anxiety & Stress',
    'personal': 'Personal Stories',
    'expert': 'Expert Interviews',
    'wellness': 'Wellness Tips',
    'reviews': 'Product Reviews',
    'research': 'Research & Science'
  };
  return categoryNames[category] || category;
}

// Add event listeners to post cards
function addPostEventListeners() {
  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleLike(btn);
    });
  });
  
  // Comment buttons
  document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Scroll to comments section if on post page
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // View buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Track view (placeholder)
      console.log('View tracked for post:', btn.dataset.postId);
    });
  });
}

// Toggle like functionality
function toggleLike(btn) {
  const isLiked = btn.classList.contains('liked');
  const countSpan = btn.querySelector('span') || btn;
  let currentCount = parseInt(countSpan.textContent) || 0;
  
  if (isLiked) {
    btn.classList.remove('liked');
    countSpan.textContent = currentCount - 1;
  } else {
    btn.classList.add('liked');
    countSpan.textContent = currentCount + 1;
  }
}

// Initialize filters
function initializeFilters() {
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active class from all pills
      filterPills.forEach(p => p.classList.remove('active'));
      // Add active class to clicked pill
      pill.classList.add('active');
      
      // Filter posts
      currentCategory = pill.dataset.category;
      applyFilters();
    });
  });
}

// Initialize search
function initializeSearch() {
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      applyFilters();
    });
  }
}

// Apply filters
function applyFilters() {
  // Filter by category
  if (currentCategory === 'all') {
    filteredPosts = [...blogPosts];
  } else {
    filteredPosts = blogPosts.filter(post => post.category === currentCategory);
  }
  
  // Filter by search
  if (currentSearch) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(currentSearch) ||
      post.excerpt.toLowerCase().includes(currentSearch) ||
      post.author.toLowerCase().includes(currentSearch)
    );
  }
  
  // Reset pagination
  currentPage = 1;
  
  // Display filtered posts
  displayPosts(filteredPosts.slice(0, postsPerPage));
  updatePostCount();
  updateLoadMoreButton();
}

// Initialize load more functionality
function initializeLoadMore() {
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMorePosts);
  }
}

// Load more posts
function loadMorePosts() {
  currentPage++;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const newPosts = filteredPosts.slice(startIndex, endIndex);
  
  if (newPosts.length > 0) {
    const currentPosts = Array.from(blogGrid.children);
    const newPostCards = newPosts.map(post => createPostCard(post));
    
    // Append new posts
    newPostCards.forEach(card => {
      blogGrid.appendChild(card);
    });
    
    // Add event listeners to new posts
    addPostEventListeners();
    
    // Update counts
    updatePostCount();
    updateLoadMoreButton();
  }
}

// Update post count display
function updatePostCount() {
  if (showingCount && totalCount) {
    const showing = Math.min(currentPage * postsPerPage, filteredPosts.length);
    showingCount.textContent = showing;
    totalCount.textContent = filteredPosts.length;
  }
}

// Update load more button
function updateLoadMoreButton() {
  if (loadMoreBtn) {
    const showing = currentPage * postsPerPage;
    const hasMore = showing < filteredPosts.length;
    
    loadMoreBtn.style.display = hasMore ? 'block' : 'none';
  }
}

// Initialize newsletter forms
function initializeNewsletter() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const emailInput = form.querySelector('.newsletter-input, input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      
      // Validate email
      if (!email) {
        showNotification('Please enter your email address.', 'error');
        if (emailInput) {
          emailInput.focus();
          emailInput.classList.add('error');
        }
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
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
      const submitButton = form.querySelector('button[type="submit"], .newsletter-btn');
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
            showNotification(data.message || 'Thank you for subscribing! Please check your email for confirmation.', 'success');
            form.reset();
          } else {
            // API failed, try localStorage fallback
            if (window.NEWSLETTER_CONFIG && window.NEWSLETTER_CONFIG.USE_FALLBACK) {
              saveSubscriptionToLocalStorage(email);
              showNotification('Thank you for subscribing! We\'ll send you updates soon.', 'success');
              form.reset();
            } else {
              showNotification(data.error || 'Subscription failed. Please try again.', 'error');
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
            showNotification('Thank you for subscribing! We\'ll send you updates soon.', 'success');
            form.reset();
          } else {
            showNotification('Unable to connect. Please try again later.', 'error');
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
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        if (emailInput) {
          emailInput.classList.remove('error');
        }
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
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
  });
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    background: type === 'success' ? '#7EE787' : '#58A6FF',
    color: '#0D1117',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '9999',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '300px',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ===== BLOG POST PAGE FUNCTIONALITY =====

// Initialize reading progress
function initializeReadingProgress() {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressCircle = document.querySelector('.progress-ring-circle');
  
  if (!progressBar) return;
  
  function updateProgress() {
    const article = document.querySelector('.main-article');
    if (!article) return;
    
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    const progress = Math.min(
      Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
      1
    );
    
    const percentage = Math.round(progress * 100);
    
    // Update progress bar
    progressBar.style.width = `${percentage}%`;
    
    // Update progress text
    if (progressText) {
      progressText.textContent = `${percentage}%`;
    }
    
    // Update progress circle
    if (progressCircle) {
      const circumference = 2 * Math.PI * 26; // radius = 26
      const offset = circumference - (progress * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  }
  
  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Initial call
}

// Initialize table of contents
function initializeTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Update active TOC link on scroll
  function updateActiveTOCLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Mobile TOC toggle
  const tocToggle = document.querySelector('.toc-toggle');
  const tocContent = document.getElementById('toc-mobile-content');
  
  if (tocToggle && tocContent) {
    tocToggle.addEventListener('click', () => {
      const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
      tocToggle.setAttribute('aria-expanded', !isExpanded);
      tocContent.style.display = isExpanded ? 'none' : 'block';
    });
  }
  
  window.addEventListener('scroll', updateActiveTOCLink);
  updateActiveTOCLink(); // Initial call
}

// Initialize text size controls
function initializeTextSizeControls() {
  const textSizeBtns = document.querySelectorAll('.text-size-btn');
  const article = document.querySelector('.main-article');
  
  if (!article) return;
  
  textSizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      textSizeBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Apply text size
      const size = btn.dataset.size;
      article.className = article.className.replace(/text-size-\w+/g, '');
      article.classList.add(`text-size-${size}`);
      
      // Save preference
      localStorage.setItem('textSize', size);
    });
  });
  
  // Load saved preference
  const savedSize = localStorage.getItem('textSize') || 'medium';
  const savedBtn = document.querySelector(`[data-size="${savedSize}"]`);
  if (savedBtn) {
    savedBtn.click();
  }
}

// Initialize save functionality
function initializeSaveFunctionality() {
  const saveBtn = document.getElementById('save-btn');
  const saveText = document.getElementById('save-text');
  
  if (!saveBtn) return;
  
  // Load saved state
  const isSaved = localStorage.getItem('articleSaved') === 'true';
  if (isSaved) {
    saveBtn.classList.add('saved');
    saveText.textContent = 'Saved';
  }
  
  saveBtn.addEventListener('click', () => {
    const isSaved = saveBtn.classList.contains('saved');
    
    if (isSaved) {
      saveBtn.classList.remove('saved');
      saveText.textContent = 'Save for Later';
      localStorage.removeItem('articleSaved');
      showNotification('Article removed from saved items', 'info');
    } else {
      saveBtn.classList.add('saved');
      saveText.textContent = 'Saved';
      localStorage.setItem('articleSaved', 'true');
      showNotification('Article saved for later', 'success');
    }
  });
}

// Initialize print functionality
function initializePrintFunctionality() {
  const printBtn = document.getElementById('print-btn');
  
  if (!printBtn) return;
  
  printBtn.addEventListener('click', () => {
    // Create print styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        .nav, .footer, .sidebar, .share-buttons, .feedback-section, .newsletter-signup, .comments-section, .related-posts, .author-bio, .reading-progress, .article-sidebar {
          display: none !important;
        }
        .main-article {
          width: 100% !important;
          max-width: none !important;
        }
        .article-content {
          padding: 0 !important;
        }
        body {
          font-size: 12pt !important;
          line-height: 1.5 !important;
        }
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
        }
        .callout-box, .affiliate-recommendation, .key-takeaways {
          page-break-inside: avoid;
        }
      }
    `;
    
    document.head.appendChild(printStyles);
    
    // Print the page
    window.print();
    
    // Remove print styles after printing
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
  });
}

// Initialize share buttons
function initializeShareButtons() {
  const shareBtns = document.querySelectorAll('.share-btn');
  
  shareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      const url = window.location.href;
      const title = document.title;
      
      let shareUrl = '';
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case 'pinterest':
          shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
          });
          return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

// Initialize feedback functionality
function initializeFeedback() {
  const feedbackBtns = document.querySelectorAll('.feedback-btn');
  
  feedbackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const feedback = btn.dataset.feedback;
      
      // Remove active state from all buttons
      feedbackBtns.forEach(b => b.classList.remove('active'));
      // Add active state to clicked button
      btn.classList.add('active');
      
      // Show thank you message
      const message = feedback === 'helpful' 
        ? 'Thank you for your feedback! We\'re glad this article was helpful.'
        : 'Thank you for your feedback. We\'ll work to improve our content.';
      
      showNotification(message, feedback === 'helpful' ? 'success' : 'info');
      
      // Track feedback (placeholder)
      console.log('Feedback received:', feedback);
    });
  });
}

// Add text size styles
const textSizeStyles = document.createElement('style');
textSizeStyles.textContent = `
  .text-size-small .main-article {
    font-size: 14px;
  }
  .text-size-small .main-article h1 {
    font-size: 28px;
  }
  .text-size-small .main-article h2 {
    font-size: 24px;
  }
  .text-size-small .main-article h3 {
    font-size: 20px;
  }
  
  .text-size-medium .main-article {
    font-size: 16px;
  }
  .text-size-medium .main-article h1 {
    font-size: 32px;
  }
  .text-size-medium .main-article h2 {
    font-size: 28px;
  }
  .text-size-medium .main-article h3 {
    font-size: 24px;
  }
  
  .text-size-large .main-article {
    font-size: 18px;
  }
  .text-size-large .main-article h1 {
    font-size: 36px;
  }
  .text-size-large .main-article h2 {
    font-size: 32px;
  }
  .text-size-large .main-article h3 {
    font-size: 28px;
  }
`;
document.head.appendChild(textSizeStyles);

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
  const elements = document.querySelectorAll('.blog-card, .sidebar-widget, .related-post');
  
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
