// FOLDER X — Interactive Features
// Scroll reveals, smooth animations, and micro-interactions

(function() {
    'use strict';
    
    // === SCROLL REVEAL OBSERVER ===
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(el => observer.observe(el));
    };
    
    // === PARALLAX FLOATING FOLDERS ===
    const initParallax = () => {
        const folders = document.querySelectorAll('.folder');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            folders.forEach(folder => {
                const speed = folder.dataset.speed || 1;
                const yPos = -(scrolled * speed * 0.05);
                folder.style.transform = `translateY(${yPos}px)`;
            });
        });
    };
    
    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // === NAVIGATION SCROLL BEHAVIOR ===
    const initNavScroll = () => {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.style.transform = 'translateY(0)';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scroll down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scroll up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    };
    
    // === FEATURE CARD TILT EFFECT ===
    const initCardTilt = () => {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;
                
                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    };
    
    // === ANIMATED COUNTER (for stats if needed) ===
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    };
    
    // === DOWNLOAD BUTTON RIPPLE EFFECT ===
    const initRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };
    
    // === CURSOR GLOW EFFECT (desktop only) ===
    const initCursorGlow = () => {
        if (window.innerWidth < 1024) return;
        
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    };
    
    // === LAZY LOAD IMAGES ===
    const initLazyLoad = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    // === FOLD ANIMATION ON LOAD ===
    const initLoadAnimation = () => {
        document.body.style.opacity = '0';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.6s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    };
    
    // === TEMPLATE TREE HOVER HIGHLIGHT ===
    const initTreeHighlight = () => {
        const treeItems = document.querySelectorAll('.tree-item');
        
        treeItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(20, 184, 166, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
    };
    
    // === TEMPLATE MODAL SYSTEM ===
    const templateTrees = {
        academic: {
            title: 'Academic Project',
            tree: [
                { name: 'project', level: 0 },
                { name: 'research', level: 1 },
                { name: 'papers', level: 2 },
                { name: 'notes', level: 2 },
                { name: 'data', level: 1 },
                { name: 'raw', level: 2 },
                { name: 'processed', level: 2 },
                { name: 'analysis', level: 1 },
                { name: 'scripts', level: 2 },
                { name: 'results', level: 2 },
                { name: 'literature', level: 1 },
                { name: 'references', level: 2 },
                { name: 'thesis', level: 1 },
                { name: 'chapters', level: 2 },
                { name: 'figures', level: 2 }
            ]
        },
        design: {
            title: 'Design Project',
            tree: [
                { name: 'project', level: 0 },
                { name: 'assets', level: 1 },
                { name: 'images', level: 2 },
                { name: 'icons', level: 2 },
                { name: 'fonts', level: 2 },
                { name: 'designs', level: 1 },
                { name: 'wireframes', level: 2 },
                { name: 'mockups', level: 2 },
                { name: 'finals', level: 2 },
                { name: 'branding', level: 1 },
                { name: 'logo', level: 2 },
                { name: 'colors', level: 2 },
                { name: 'exports', level: 1 },
                { name: 'print', level: 2 },
                { name: 'web', level: 2 }
            ]
        },
        laravel: {
            title: 'Laravel Project',
            tree: [
                { name: 'project', level: 0 },
                { name: 'app', level: 1 },
                { name: 'Http', level: 2 },
                { name: 'Controllers', level: 3 },
                { name: 'Middleware', level: 3 },
                { name: 'Models', level: 2 },
                { name: 'Services', level: 2 },
                { name: 'resources', level: 1 },
                { name: 'views', level: 2 },
                { name: 'css', level: 2 },
                { name: 'js', level: 2 },
                { name: 'routes', level: 1 },
                { name: 'database', level: 1 },
                { name: 'migrations', level: 2 },
                { name: 'seeders', level: 2 },
                { name: 'public', level: 1 },
                { name: 'storage', level: 1 },
                { name: 'tests', level: 1 }
            ]
        },
        react: {
            title: 'React Project',
            tree: [
                { name: 'project', level: 0 },
                { name: 'src', level: 1 },
                { name: 'components', level: 2 },
                { name: 'UI', level: 3 },
                { name: 'Layout', level: 3 },
                { name: 'hooks', level: 2 },
                { name: 'services', level: 2 },
                { name: 'utils', level: 2 },
                { name: 'pages', level: 2 },
                { name: 'assets', level: 2 },
                { name: 'images', level: 3 },
                { name: 'styles', level: 3 },
                { name: 'public', level: 1 },
                { name: 'tests', level: 1 },
                { name: 'docs', level: 1 }
            ]
        },
        office: {
            title: 'Office Documents',
            tree: [
                { name: 'documents', level: 0 },
                { name: 'reports', level: 1 },
                { name: 'monthly', level: 2 },
                { name: 'quarterly', level: 2 },
                { name: 'presentations', level: 1 },
                { name: 'spreadsheets', level: 1 },
                { name: 'budgets', level: 2 },
                { name: 'invoices', level: 2 },
                { name: 'contracts', level: 1 },
                { name: 'meetings', level: 1 },
                { name: 'archive', level: 1 }
            ]
        },
        web: {
            title: 'Web Development',
            tree: [
                { name: 'project', level: 0 },
                { name: 'src', level: 1 },
                { name: 'components', level: 2 },
                { name: 'assets', level: 2 },
                { name: 'images', level: 3 },
                { name: 'css', level: 3 },
                { name: 'js', level: 3 },
                { name: 'utils', level: 2 },
                { name: 'public', level: 1 },
                { name: 'dist', level: 1 },
                { name: 'docs', level: 1 },
                { name: 'tests', level: 1 },
                { name: 'config', level: 1 }
            ]
        }
    };
    
    const folderIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V7Z" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    const initTemplateModal = () => {
        const modal = document.getElementById('templateModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalTree = document.getElementById('modalTree');
        const modalBackdrop = modal.querySelector('.modal-backdrop');
        const modalClose = modal.querySelector('.modal-close');
        const templateCards = document.querySelectorAll('.template-card[data-template]');
        
        let previouslyFocused = null;
        
        const openModal = (template) => {
            const data = templateTrees[template];
            if (!data) return;
            
            previouslyFocused = document.activeElement;
            
            modalTitle.textContent = data.title;
            modalTree.innerHTML = '';
            
            data.tree.forEach(item => {
                const div = document.createElement('div');
                div.className = `modal-tree-item level-${item.level}`;
                div.innerHTML = `
                    <div class="modal-tree-icon">${folderIcon}</div>
                    <span>${item.name}</span>
                `;
                modalTree.appendChild(div);
            });
            
            modal.removeAttribute('hidden');
            setTimeout(() => modalClose.focus(), 100);
        };
        
        const closeModal = () => {
            modal.setAttribute('hidden', '');
            if (previouslyFocused) {
                previouslyFocused.focus();
            }
        };
        
        templateCards.forEach(card => {
            card.addEventListener('click', () => {
                const template = card.dataset.template;
                openModal(template);
            });
        });
        
        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
                closeModal();
            }
        });
        
        modal.addEventListener('keydown', (e) => {
            if (!modal.hasAttribute('hidden') && e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    };
    
    // === ADD RIPPLE CSS DYNAMICALLY ===
    const addRippleStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .cursor-glow {
                position: fixed;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                transition: opacity 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    };
    
    // === EASTER EGG: KONAMI CODE ===
    const initKonamiCode = () => {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    };
    
    const activateEasterEgg = () => {
        document.body.style.animation = 'rainbow 2s linear infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🎉 FOLDER X Easter Egg Activated! 🎉');
    };
    
    // === INIT ALL ===
    const init = () => {
        addRippleStyles();
        initLoadAnimation();
        revealElements();
        initParallax();
        initSmoothScroll();
        initNavScroll();
        initCardTilt();
        initRippleEffect();
        initLazyLoad();
        initTreeHighlight();
        initTemplateModal();
        initKonamiCode();
        
        // Desktop-only features
        if (window.innerWidth >= 1024) {
            // initCursorGlow(); // Commented out for performance
        }
        
        // Log version
        console.log('%cFOLDER X v1.0.1', 'font-size: 20px; font-weight: bold; color: #14b8a6;');
        console.log('%cWebsite by DanielPro', 'font-size: 12px; color: #6a6a6a;');
    };
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
