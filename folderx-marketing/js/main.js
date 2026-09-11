// Translations
const translations = {
    pt: {
        'app-name': 'FolderX',
        'hero-title': 'Organize os seus projetos com facilidade',
        'hero-subtitle': 'Crie estruturas de pastas automatizadas com modelos inteligentes. Poupe tempo e mantenha os seus projetos sempre organizados.',
        'cta-download': 'Transferir FolderX',
        'cta-learn': 'Saiba mais',
        'features-title': 'Funcionalidades',
        'feature-1-title': 'Modelos Inteligentes',
        'feature-1-desc': 'Crie estruturas de pastas completas com um clique usando modelos pré-configurados ou personalizados.',
        'feature-2-title': 'Estrutura Organizada',
        'feature-2-desc': 'Mantenha os seus projetos organizados com hierarquias claras e fáceis de navegar.',
        'feature-3-title': 'Poupe Tempo',
        'feature-3-desc': 'Deixe de criar pastas manualmente. Automatize e foque-se no que realmente importa.',
        'gallery-title': 'Veja o FolderX em ação',
        'gallery-1': 'Interface principal - Modelos',
        'gallery-2': 'Estrutura de Pastas',
        'gallery-3': 'Outras Funcionalidades',
        'download-title': 'Transferir FolderX',
        'download-subtitle': 'Disponível para Windows',
        'download-installer': 'Instalador (v1.0.1)',
        'download-portable': 'Versão Portátil',
        'footer-rights': 'Todos os direitos reservados.'
    },
    en: {
        'app-name': 'FolderX',
        'hero-title': 'Organize your projects with ease',
        'hero-subtitle': 'Create automated folder structures with smart templates. Save time and keep your projects always organized.',
        'cta-download': 'Download FolderX',
        'cta-learn': 'Learn more',
        'features-title': 'Features',
        'feature-1-title': 'Smart Templates',
        'feature-1-desc': 'Create complete folder structures with one click using pre-configured or custom templates.',
        'feature-2-title': 'Organized Structure',
        'feature-2-desc': 'Keep your projects organized with clear and easy-to-navigate hierarchies.',
        'feature-3-title': 'Save Time',
        'feature-3-desc': 'Stop creating folders manually. Automate and focus on what really matters.',
        'gallery-title': 'See FolderX in action',
        'gallery-1': 'Main interface - Templates',
        'gallery-2': 'Folder Structure',
        'gallery-3': 'Other Features',
        'download-title': 'Download FolderX',
        'download-subtitle': 'Available for Windows',
        'download-installer': 'Installer (v1.0.1)',
        'download-portable': 'Portable Version',
        'footer-rights': 'All rights reserved.'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initAnimation();
    initScrollEffects();
    initMobileMenu();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Language Management
function initLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    const savedLang = localStorage.getItem('language') || 'pt';
    
    setLanguage(savedLang);
    
    langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });
}

function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    
    // Update lang toggle buttons
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
    
    // Update all translated elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Hero Animation
function initAnimation() {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (shouldReduceMotion) {
        // Show organized state immediately
        const messyState = document.querySelector('.messy-state');
        const organizedState = document.querySelector('.organized-state');
        if (messyState) messyState.style.display = 'none';
        if (organizedState) organizedState.style.opacity = '1';
        return;
    }
    
    animateFolders();
}

function animateFolders() {
    const messyState = document.querySelector('.messy-state');
    const organizedState = document.querySelector('.organized-state');
    
    if (!messyState || !organizedState) return;
    
    const folders = messyState.querySelectorAll('.folder');
    const animationDuration = 2000; // 2 seconds
    const pauseDuration = 2000; // 2 seconds pause
    
    let animationPhase = 0; // 0: messy->organized, 1: organized->messy
    
    function animate() {
        if (animationPhase === 0) {
            // Transition from messy to organized
            folders.forEach((folder, index) => {
                setTimeout(() => {
                    folder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    folder.style.opacity = '0';
                    folder.style.transform = 'scale(0.8)';
                }, index * 100);
            });
            
            setTimeout(() => {
                messyState.style.display = 'none';
                organizedState.style.opacity = '0';
                organizedState.style.display = 'block';
                
                requestAnimationFrame(() => {
                    organizedState.style.transition = 'opacity 1s ease';
                    organizedState.style.opacity = '1';
                });
            }, 500);
            
            animationPhase = 1;
            setTimeout(animate, animationDuration + pauseDuration);
            
        } else {
            // Transition from organized to messy
            organizedState.style.transition = 'opacity 0.5s ease';
            organizedState.style.opacity = '0';
            
            setTimeout(() => {
                organizedState.style.display = 'none';
                messyState.style.display = 'block';
                
                folders.forEach((folder, index) => {
                    folder.style.opacity = '0';
                    folder.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        folder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        folder.style.opacity = '1';
                        folder.style.transform = 'scale(1)';
                    }, index * 100);
                });
            }, 500);
            
            animationPhase = 0;
            setTimeout(animate, animationDuration + pauseDuration);
        }
    }
    
    // Start animation after a brief delay
    setTimeout(animate, 1000);
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and mockups
    document.querySelectorAll('.feature-card, .mockup').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a control button
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
            }, 300);
        });
    });
}

// Handle image loading errors with placeholder
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mockup-content img').forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder SVG if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.background = 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)';
            placeholder.style.color = 'white';
            placeholder.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>';
            
            this.parentNode.innerHTML = '';
            this.parentNode.appendChild(placeholder);
        });
    });
});
