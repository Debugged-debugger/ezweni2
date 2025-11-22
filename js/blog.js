// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initNewsletter();
    initComments();
    initSocialShare();
});

// Search functionality
function initBlogSearch() {
    const searchForm = document.getElementById('blogSearchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            
            if (query.length < 2) {
                showSearchMessage('Please enter at least 2 characters to search.', 'error');
                return;
            }
            
            // Simulate search (in real implementation, this would be an API call)
            const results = simulateSearch(query);
            displaySearchResults(results, query);
        });
        
        // Clear results when input is cleared
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                searchResults.style.display = 'none';
                searchResults.innerHTML = '';
            }
        });
    }
}

function simulateSearch(query) {
    // Mock blog posts data
    const blogPosts = [
        {
            title: 'Enhance Your Funeral Cover with Ezweni Add-On Plans',
            excerpt: 'Learn how add-on plans provide flexible, comprehensive funeral coverage...',
            url: 'blog-posts/blog-post-enhance-cover.html',
            category: 'Planning Tips',
            date: '2024-01-15'
        },
        {
            title: 'Why a Tombstone Plan is Essential for Complete Peace of Mind',
            excerpt: 'Discover the importance of including tombstone services in your funeral plan...',
            url: 'blog-posts/blog-post-tombstone.html',
            category: 'Memorial Planning',
            date: '2024-01-12'
        },
        {
            title: 'Understanding the Grieving Process: A Compassionate Guide',
            excerpt: 'Learn about the grieving process and coping strategies...',
            url: 'blog-posts/blog-post-grieving-process.html',
            category: 'Grief Support',
            date: '2024-01-08'
        },
        {
            title: 'The Rise of Green Funerals: Honoring Life While Protecting the Earth',
            excerpt: 'Explore eco-friendly funeral options and their benefits...',
            url: 'blog-posts/blog-post-green-funerals.html',
            category: 'Eco-Friendly Options',
            date: '2024-01-05'
        }
    ];
    
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545;">
                <p style="margin: 0;">No results found for "<strong>${query}</strong>". Try different keywords.</p>
            </div>
        `;
    } else {
        let html = `
            <div style="background: #d1edff; color: #155724; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 15px;">
                <p style="margin: 0;">Found ${results.length} result(s) for "<strong>${query}</strong>"</p>
            </div>
        `;
        
        results.forEach(post => {
            html += `
                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; border: 1px solid var(--stone-grey);">
                    <a href="${post.url}" style="color: var(--primary-green); text-decoration: none; font-weight: 600; display: block; margin-bottom: 5px;">
                        ${post.title}
                    </a>
                    <p style="color: var(--muted-grey); font-size: 0.9rem; margin: 5px 0;">${post.excerpt}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--muted-grey);">
                        <span class="badge" style="background: var(--primary-green); padding: 2px 8px;">${post.category}</span>
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                </div>
            `;
        });
        
        searchResults.innerHTML = html;
    }
    
    searchResults.style.display = 'block';
}

function showSearchMessage(message, type) {
    const searchResults = document.getElementById('searchResults');
    const bgColor = type === 'error' ? '#f8d7da' : '#d1edff';
    const borderColor = type === 'error' ? '#dc3545' : '#28a745';
    const textColor = type === 'error' ? '#721c24' : '#155724';
    
    searchResults.innerHTML = `
        <div style="background: ${bgColor}; color: ${textColor}; padding: 15px; border-radius: 8px; border-left: 4px solid ${borderColor};">
            <p style="margin: 0;">${message}</p>
        </div>
    `;
    searchResults.style.display = 'block';
}

// Newsletter functionality
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            
            if (!email) {
                newsletterMessage.innerHTML = `
                    <div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px;">
                        Please enter a valid email address.
                    </div>
                `;
                newsletterMessage.style.display = 'block';
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                newsletterMessage.innerHTML = `
                    <div style="background: #d1edff; color: #155724; padding: 10px; border-radius: 5px;">
                        <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                        Thank you for subscribing! Please check your email to confirm your subscription.
                    </div>
                `;
                newsletterMessage.style.display = 'block';
                newsletterForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    newsletterMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
}

// Comments functionality
function initComments() {
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value;
            const email = document.getElementById('commentEmail').value;
            const message = document.getElementById('commentMessage').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create new comment
            const newComment = {
                name: name,
                email: email,
                message: message,
                date: new Date().toISOString()
            };
            
            // Add comment to the list
            addCommentToDOM(newComment);
            
            // Reset form
            commentForm.reset();
            
            // Show success message
            alert('Thank you for your comment! It will be visible after moderation.');
        });
    }
}

function addCommentToDOM(comment) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.name}</span>
            <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
        </div>
        <p>${comment.message}</p>
    `;
    
    commentsList.insertBefore(commentElement, commentsList.firstChild);
}

// Social share functionality
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl = '';
            
            if (platform.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            } else if (platform.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            } else if (platform.includes('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            } else if (platform.includes('link')) {
                // Copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copied to clipboard!');
                });
                return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}