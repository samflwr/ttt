 function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
            
            // Toggle body scroll lock
            if(menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }








document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

async function loadContent() {
    try {
        // Fetch the data
        // Note: Ensure your file is at this path, or change to 'content.json' if it's in root
        const response = await fetch('content/content.json'); 
        const data = await response.json();

        // Select Containers
        const tickerContainer = document.getElementById('ticker-container');
        const briefingContainer = document.getElementById('briefing-container');
        const bentoContainer = document.getElementById('bento-container');

        // Clear existing content to prevent duplicates if function runs twice
        if(tickerContainer) tickerContainer.innerHTML = '';
        if(briefingContainer) briefingContainer.innerHTML = '';
        if(bentoContainer) bentoContainer.innerHTML = '';

        data.forEach(item => {
            
            // --- 1. POPULATE TICKER ---
            if (item.isTicker || (item.tags && item.tags.includes('ticker'))) {
                const tickerHTML = `
                    <a href="${item.url || '#'}" class="ticker-item">
                        <span class="t-tag" ${item.isLive ? 'class="t-tag live"' : ''}>
                            ${item.isLive ? '<span class="pulse-dot"></span>' : ''}
                            ${item.category}
                        </span>
                        <span class="t-text">${item.title}</span>
                        ${item.tickerValue ? `<span class="t-meta" style="color:${item.tickerColor || '#34C759'}">${item.tickerValue}</span>` : ''}
                    </a>
                `;
                if(tickerContainer) tickerContainer.insertAdjacentHTML('beforeend', tickerHTML);
            }

            // --- 2. POPULATE BRIEFING CARDS (Horizontal Scroll) ---
            if (item.tags && item.tags.includes('scroll')) {
                const cardHTML = `
                    <article class="brief-card">
                        <a href="${item.url || '#'}" style="display:contents; text-decoration:none; color:inherit;">
                            <div class="img-box">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                            </div>
                            <div class="content">
                                <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
                                <h4>${item.title}</h4>
                                <p style="font-size: 0.95rem;">${item.summary}</p>
                            </div>
                        </a>
                    </article>
                `;
                if(briefingContainer) briefingContainer.insertAdjacentHTML('beforeend', cardHTML);
            }

            // --- 3. POPULATE BENTO GRID (Curated Stories) ---
            if (item.location === 'bento') {
                let bentoHTML = '';

                // Logic A: Is this the specific "Opinion" card layout?
                if (item.type === 'opinion') {
                    bentoHTML = `
                    <article class="b-card ${item.gridClass} ${item.cardStyle}" 
                             style="${item.customBg ? `background: ${item.customBg};` : ''}">
                        <a href="${item.url || '#'}" style="text-decoration:none; color:inherit; height:100%; display:block;">
                            <div class="content">
                                <div>
                                    <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
                                    <h3 style="margin-top: 15px; font-size: 1.8rem; line-height: 1.3;">${item.title}</h3>
                                </div>
                                <div style="margin-top: 20px;">
                                    <div style="width: 40px; height: 1px; background: #ccc; margin-bottom: 15px;"></div>
                                    <strong style="font-family: 'Playfair Display'; font-size: 1.1rem;">${item.author}</strong><br>
                                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${item.authorRole}</span>
                                </div>
                            </div>
                        </a>
                    </article>
                    `;
                } 
                
                // Logic B: Standard Card (Image or Text Only)
                else {
                    // Check if image exists
                    const imgHTML = item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '';
                    
                    // Determine text colors based on card style (Dark vs Light)
                    const isDark = item.cardStyle.includes('dark');
                    const titleColor = isDark ? 'white' : 'var(--text-main)';
                    const eyebrowColor = isDark ? 'rgba(255,255,255,0.9)' : 'var(--text-tertiary)';
                    
                    // Determine font size (Larger for big cards)
                    const titleSize = item.gridClass.includes('col-span-8') ? '2.5rem' : '1.4rem';

                    // Optional summary check
                    const summaryHTML = item.summary 
                        ? `<p style="color: var(--text-secondary); margin-top: 10px; font-size: 0.9rem;">${item.summary}</p>` 
                        : '';

                    bentoHTML = `
                    <article class="b-card ${item.gridClass} ${item.cardStyle}">
                        <a href="${item.url || '#'}" style="display:contents; color:inherit;">
                            ${imgHTML}
                            <div class="content">
                                <span class="eyebrow" style="color:${eyebrowColor};">${item.category}</span>
                                <h3 style="font-size: ${titleSize}; color: ${titleColor}; margin-top: 10px;">${item.title}</h3>
                                ${summaryHTML}
                            </div>
                        </a>
                    </article>
                    `;
                }

                if(bentoContainer) bentoContainer.insertAdjacentHTML('beforeend', bentoHTML);
            }
        });
        
        // Final Step: Clone ticker items for seamless infinite loop animation
        if(tickerContainer && tickerContainer.innerHTML.trim() !== "") {
             tickerContainer.innerHTML += tickerContainer.innerHTML;
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}




















//header 
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();  // New function for Hero
    loadContent(); // Existing function for News
});

// --- 1. LOAD HERO SECTION (Header) ---
async function loadHeader() {
    try {
        const response = await fetch('content/header.json');
        const data = await response.json();
        const heroContainer = document.getElementById('hero-container');

        if (heroContainer) {
            const heroHTML = `
                <div class="hero-text">
                    <span class="eyebrow" style="color: var(--accent);">${data.eyebrow}</span>
                    <h1>${data.headline}</h1>
                    <p>${data.summary}</p>
                    <a href="${data.url}" class="btn-primary">
                        ${data.ctaText} 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
                <div class="hero-visual">
                    <img src="${data.image}" alt="${data.imageAlt}">
                </div>
            `;
            heroContainer.innerHTML = heroHTML;
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// --- 2. LOAD NEWS CONTENT (Ticker, Briefing, Bento) ---
async function loadContent() {
    try {
        const response = await fetch('content/content.json');
        const data = await response.json();

        const tickerContainer = document.getElementById('ticker-container');
        const briefingContainer = document.getElementById('briefing-container');
        const bentoContainer = document.getElementById('bento-container');

        if(tickerContainer) tickerContainer.innerHTML = '';
        if(briefingContainer) briefingContainer.innerHTML = '';
        if(bentoContainer) bentoContainer.innerHTML = '';

        data.forEach(item => {
            
            // Ticker Logic
            if (item.isTicker || (item.tags && item.tags.includes('ticker'))) {
                const tickerHTML = `
                    <a href="${item.url || '#'}" class="ticker-item">
                        <span class="t-tag" ${item.isLive ? 'class="t-tag live"' : ''}>
                            ${item.isLive ? '<span class="pulse-dot"></span>' : ''}
                            ${item.category}
                        </span>
                        <span class="t-text">${item.title}</span>
                        ${item.tickerValue ? `<span class="t-meta" style="color:${item.tickerColor || '#34C759'}">${item.tickerValue}</span>` : ''}
                    </a>
                `;
                if(tickerContainer) tickerContainer.insertAdjacentHTML('beforeend', tickerHTML);
            }

            // Briefing Scroll Logic
            if (item.tags && item.tags.includes('scroll')) {
                const cardHTML = `
                    <article class="brief-card">
                        <a href="${item.url || '#'}" style="display:contents; text-decoration:none; color:inherit;">
                            <div class="img-box">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                            </div>
                            <div class="content">
                                <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
                                <h4>${item.title}</h4>
                                <p style="font-size: 0.95rem;">${item.summary}</p>
                            </div>
                        </a>
                    </article>
                `;
                if(briefingContainer) briefingContainer.insertAdjacentHTML('beforeend', cardHTML);
            }

            // Bento Grid Logic
            if (item.location === 'bento') {
                let bentoHTML = '';

                if (item.type === 'opinion') {
                    bentoHTML = `
                    <article class="b-card ${item.gridClass} ${item.cardStyle}" 
                             style="${item.customBg ? `background: ${item.customBg};` : ''}">
                        <a href="${item.url || '#'}" style="text-decoration:none; color:inherit; height:100%; display:block;">
                            <div class="content">
                                <div>
                                    <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
                                    <h3 style="margin-top: 15px; font-size: 1.8rem; line-height: 1.3;">${item.title}</h3>
                                </div>
                                <div style="margin-top: 20px;">
                                    <div style="width: 40px; height: 1px; background: #ccc; margin-bottom: 15px;"></div>
                                    <strong style="font-family: 'Playfair Display'; font-size: 1.1rem;">${item.author}</strong><br>
                                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${item.authorRole}</span>
                                </div>
                            </div>
                        </a>
                    </article>
                    `;
                } else {
                    const imgHTML = item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '';
                    const isDark = item.cardStyle.includes('dark');
                    const titleColor = isDark ? 'white' : 'var(--text-main)';
                    const eyebrowColor = isDark ? 'rgba(255,255,255,0.9)' : 'var(--text-tertiary)';
                    const titleSize = item.gridClass.includes('col-span-8') ? '2.5rem' : '1.4rem';
                    const summaryHTML = item.summary ? `<p style="color: var(--text-secondary); margin-top: 10px; font-size: 0.9rem;">${item.summary}</p>` : '';

                    bentoHTML = `
                    <article class="b-card ${item.gridClass} ${item.cardStyle}">
                        <a href="${item.url || '#'}" style="display:contents; color:inherit;">
                            ${imgHTML}
                            <div class="content">
                                <span class="eyebrow" style="color:${eyebrowColor};">${item.category}</span>
                                <h3 style="font-size: ${titleSize}; color: ${titleColor}; margin-top: 10px;">${item.title}</h3>
                                ${summaryHTML}
                            </div>
                        </a>
                    </article>
                    `;
                }
                if(bentoContainer) bentoContainer.insertAdjacentHTML('beforeend', bentoHTML);
            }
        });
        
        // Loop Ticker
        if(tickerContainer && tickerContainer.innerHTML.trim() !== "") {
             tickerContainer.innerHTML += tickerContainer.innerHTML;
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}









//footer copy paste 
function copyToClipboard() {
    // 1. Get the current URL
    const url = window.location.href;
    
    // 2. Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
        
        // 3. Visual Feedback
        const btn = document.getElementById('copyLinkBtn');
        const textSpan = document.getElementById('copyText');
        const originalText = textSpan.innerText;
        
        // Change Style
        btn.classList.add('copied');
        textSpan.innerText = 'Copiato!';
        
        // Reset after 2 seconds
        setTimeout(() => {
            btn.classList.remove('copied');
            textSpan.innerText = originalText;
        }, 2000);
    });
}