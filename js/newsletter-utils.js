/**
 * Newsletter Utilities
 * Helper functions to manage and view newsletter subscriptions stored in localStorage
 */

// Function to get all newsletter subscribers
function getNewsletterSubscribers() {
    try {
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        return subscribers;
    } catch (error) {
        console.error('Error reading subscribers:', error);
        return [];
    }
}

// Function to export subscribers as CSV (for viewing/downloading)
function exportSubscribersAsCSV() {
    const subscribers = getNewsletterSubscribers();
    
    if (subscribers.length === 0) {
        console.log('No subscribers found.');
        return '';
    }
    
    // Create CSV header
    let csv = 'Email,Subscribed At,Last Subscription\n';
    
    // Add subscriber data
    subscribers.forEach(sub => {
        const email = sub.email || '';
        const subscribedAt = sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : '';
        const lastSubscription = sub.lastSubscription ? new Date(sub.lastSubscription).toLocaleString() : '';
        csv += `"${email}","${subscribedAt}","${lastSubscription}"\n`;
    });
    
    return csv;
}

// Function to download subscribers as CSV file
function downloadSubscribersCSV() {
    const csv = exportSubscribersAsCSV();
    
    if (!csv || csv === 'Email,Subscribed At,Last Subscription\n') {
        alert('No subscribers to export.');
        return;
    }
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to log subscribers to console (useful for debugging)
function logSubscribers() {
    const subscribers = getNewsletterSubscribers();
    console.log(`Total subscribers: ${subscribers.length}`);
    console.table(subscribers);
}

// Function to clear all subscribers (use with caution!)
function clearAllSubscribers() {
    if (confirm('Are you sure you want to clear all newsletter subscribers? This cannot be undone.')) {
        localStorage.removeItem('newsletterSubscribers');
        console.log('All subscribers cleared.');
    }
}

// Export functions to window for easy access in browser console
if (typeof window !== 'undefined') {
    window.NewsletterUtils = {
        getSubscribers: getNewsletterSubscribers,
        exportCSV: exportSubscribersAsCSV,
        downloadCSV: downloadSubscribersCSV,
        log: logSubscribers,
        clear: clearAllSubscribers
    };
    
    console.log('Newsletter utilities loaded! Use NewsletterUtils to manage subscribers:');
    console.log('- NewsletterUtils.log() - View all subscribers');
    console.log('- NewsletterUtils.downloadCSV() - Download subscribers as CSV');
    console.log('- NewsletterUtils.getSubscribers() - Get subscribers array');
    console.log('- NewsletterUtils.clear() - Clear all subscribers (use with caution)');
}

