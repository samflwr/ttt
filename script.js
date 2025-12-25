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





document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});























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












    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    // Performance optimization: prevent scroll event from firing too often
    let ticking = false;

    // 1. SCROLL LOGIC (Optimized)
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Threshold: 20px is smoother than 50px for immediate feedback
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // 2. MOBILE MENU LOGIC
    function toggleMenu() {
        const isActive = mobileToggle.classList.contains('active');

        // Toggle Visual State
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Accessibility
        mobileToggle.setAttribute('aria-expanded', !isActive);
        
        // Scroll Lock (prevent background scrolling)
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    // Auto-close menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu.classList.contains('active')) toggleMenu();
        });
    });






















// async function loadContent() {
//     try {
//         // Fetch the data
//         // Note: Ensure your file is at this path, or change to 'content.json' if it's in root
//         const response = await fetch('content/content.json'); 
//         const data = await response.json();

//         // Select Containers
//         const tickerContainer = document.getElementById('ticker-container');
//         const briefingContainer = document.getElementById('briefing-container');
//         const bentoContainer = document.getElementById('bento-container');

//         // Clear existing content to prevent duplicates if function runs twice
//         if(tickerContainer) tickerContainer.innerHTML = '';
//         if(briefingContainer) briefingContainer.innerHTML = '';
//         if(bentoContainer) bentoContainer.innerHTML = '';

//         data.forEach(item => {
            
//             // --- 1. POPULATE TICKER ---
//             if (item.isTicker || (item.tags && item.tags.includes('ticker'))) {
//                 const tickerHTML = `
//                     <a href="${item.url || '#'}" class="ticker-item">
//                         <span class="t-tag" ${item.isLive ? 'class="t-tag live"' : ''}>
//                             ${item.isLive ? '<span class="pulse-dot"></span>' : ''}
//                             ${item.category}
//                         </span>
//                         <span class="t-text">${item.title}</span>
//                         ${item.tickerValue ? `<span class="t-meta" style="color:${item.tickerColor || '#34C759'}">${item.tickerValue}</span>` : ''}
//                     </a>
//                 `;
//                 if(tickerContainer) tickerContainer.insertAdjacentHTML('beforeend', tickerHTML);
//             }

//             // --- 2. POPULATE BRIEFING CARDS (Horizontal Scroll) ---
//             if (item.tags && item.tags.includes('scroll')) {
//                 const cardHTML = `
//                     <article class="brief-card">
//                         <a href="${item.url || '#'}" style="display:contents; text-decoration:none; color:inherit;">
//                             <div class="img-box">
//                                 <img src="${item.image}" alt="${item.title}" loading="lazy">
//                             </div>
//                             <div class="content">
//                                 <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
//                                 <h4>${item.title}</h4>
//                                 <p style="font-size: 0.95rem;">${item.summary}</p>
//                             </div>
//                         </a>
//                     </article>
//                 `;
//                 if(briefingContainer) briefingContainer.insertAdjacentHTML('beforeend', cardHTML);
//             }

//             // --- 3. POPULATE BENTO GRID (Curated Stories) ---
//             if (item.location === 'bento') {
//                 let bentoHTML = '';

//                 // Logic A: Is this the specific "Opinion" card layout?
//                 if (item.type === 'opinion') {
//                     bentoHTML = `
//                     <article class="b-card ${item.gridClass} ${item.cardStyle}" 
//                              style="${item.customBg ? `background: ${item.customBg};` : ''}">
//                         <a href="${item.url || '#'}" style="text-decoration:none; color:inherit; height:100%; display:block;">
//                             <div class="content">
//                                 <div>
//                                     <span class="eyebrow" style="color: var(--accent);">${item.category}</span>
//                                     <h3 style="margin-top: 15px; font-size: 1.8rem; line-height: 1.3;">${item.title}</h3>
//                                 </div>
//                                 <div style="margin-top: 20px;">
//                                     <div style="width: 40px; height: 1px; background: #ccc; margin-bottom: 15px;"></div>
//                                     <strong style="font-family: 'Playfair Display'; font-size: 1.1rem;">${item.author}</strong><br>
//                                     <span style="color: var(--text-secondary); font-size: 0.85rem;">${item.authorRole}</span>
//                                 </div>
//                             </div>
//                         </a>
//                     </article>
//                     `;
//                 } 
                
//                 // Logic B: Standard Card (Image or Text Only)
//                 else {
//                     // Check if image exists
//                     const imgHTML = item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '';
                    
//                     // Determine text colors based on card style (Dark vs Light)
//                     const isDark = item.cardStyle.includes('dark');
//                     const titleColor = isDark ? 'white' : 'var(--text-main)';
//                     const eyebrowColor = isDark ? 'rgba(255,255,255,0.9)' : 'var(--text-tertiary)';
                    
//                     // Determine font size (Larger for big cards)
//                     const titleSize = item.gridClass.includes('col-span-8') ? '2.5rem' : '1.4rem';

//                     // Optional summary check
//                     const summaryHTML = item.summary 
//                         ? `<p style="color: var(--text-secondary); margin-top: 10px; font-size: 0.9rem;">${item.summary}</p>` 
//                         : '';

//                     bentoHTML = `
//                     <article class="b-card ${item.gridClass} ${item.cardStyle}">
//                         <a href="${item.url || '#'}" style="display:contents; color:inherit;">
//                             ${imgHTML}
//                             <div class="content">
//                                 <span class="eyebrow" style="color:${eyebrowColor};">${item.category}</span>
//                                 <h3 style="font-size: ${titleSize}; color: ${titleColor}; margin-top: 10px;">${item.title}</h3>
//                                 ${summaryHTML}
//                             </div>
//                         </a>
//                     </article>
//                     `;
//                 }

//                 if(bentoContainer) bentoContainer.insertAdjacentHTML('beforeend', bentoHTML);
//             }
//         });
        
//         // Final Step: Clone ticker items for seamless infinite loop animation
//         if(tickerContainer && tickerContainer.innerHTML.trim() !== "") {
//              tickerContainer.innerHTML += tickerContainer.innerHTML;
//         }

//     } catch (error) {
//         console.error('Error loading content:', error);
//     }
// }












//*********************** AUTHOR PAGE  */
async function loadArticlesByAuthor() {
    const container = document.getElementById('author-feed');
    if (!container) return; // Se non siamo nella pagina autore, esci.

    const targetAuthor = container.getAttribute('data-author');
    const jsonPath = '../content/content.json'; // Percorso del JSON

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Errore nel caricamento del JSON');
        
        const data = await response.json();

        // 1. FILTRO: Trova solo gli articoli di questo autore
        const authorArticles = data.filter(article => article.author === targetAuthor);

        // Pulisci il caricamento
        container.innerHTML = '';

        if (authorArticles.length === 0) {
            container.innerHTML = `<p style="grid-column: span 3; text-align: center; color: var(--text-secondary);">Nessun articolo trovato per ${targetAuthor}.</p>`;
            return;
        }

        // 2. GENERAZIONE CARD (risolvendo automaticamente i link)
        authorArticles.forEach(article => {
            // Risolvi il link per tornare alla cartella corretta
            let resolvedUrl = article.url;

            // Se il path contiene "authors/articles/", sostituisci con "articles/"
            if (resolvedUrl.includes('authors/articles/')) {
                resolvedUrl = resolvedUrl.replace('authors/articles/', 'articles/');
            } else {
                // fallback: se relativo, aggiungi ../
                resolvedUrl = `../${resolvedUrl}`;
            }

            // Colore categoria opzionale
            let catColor = 'var(--accent)'; 
            
            const cardHTML = `
                <a href="${resolvedUrl}" class="simple-article-card fade-in-up">
                    <div class="img-box" style="height: 240px; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);">
                    </div>
                    <span class="eyebrow" style="color: ${catColor};">${article.category}</span>
                    <h3>${article.title}</h3>
                    <p style="color: var(--text-secondary); margin-top: 8px; font-size: 0.9rem;">${article.date}</p>
                </a>
            `;
            
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (error) {
        console.error('Errore:', error);
        container.innerHTML = '<p style="text-align: center; color: red;">Impossibile caricare gli articoli.</p>';
    }
}

// CSS aggiuntivo per animazioni (puoi anche metterlo nel tuo file CSS)
const style = document.createElement('style');
style.innerHTML = `
    .fade-in-up {
        animation: fadeInUp 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    @keyframes fadeInUp {
        to { opacity: 1; transform: translateY(0); }
    }
    .simple-article-card:nth-child(1) { animation-delay: 0.1s; }
    .simple-article-card:nth-child(2) { animation-delay: 0.2s; }
    .simple-article-card:nth-child(3) { animation-delay: 0.3s; }
    .simple-article-card:hover img {
        transform: scale(1.05) !important;
    }
`;
document.head.appendChild(style);















/* ================== */
/* ================== */
/* ================== */
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

function copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const textSpan = document.getElementById('copyText');
        const originalText = textSpan.innerText;
        
        btn.classList.add('copied');
        textSpan.innerText = 'Copiato!';
        
        setTimeout(() => {
            btn.classList.remove('copied');
            textSpan.innerText = originalText;
        }, 2000);
    });
}