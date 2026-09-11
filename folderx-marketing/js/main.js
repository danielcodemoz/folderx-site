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
