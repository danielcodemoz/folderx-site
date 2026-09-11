// FOLDER X — WOW Interactive Features
// Canvas hero animation · Theme toggle · Language toggle · Smooth interactions

(function() {
    'use strict';
    
    // ===================================
    // CANVAS HERO ANIMATION
    // Chaos → Order folder animation
    // ===================================
    
    class FolderCanvas {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.folders = [];
            this.files = [];
            this.phase = 'chaos'; // chaos → organizing → organized → repeat
            this.phaseTimer = 0;
            this.phaseDuration = {
                chaos: 4000,
                organizing: 2000,
                organized: 3000
            };
            
            this.resize();
            this.init();
            this.animate();
            
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width * window.devicePixelRatio;
            this.canvas.height = rect.height * window.devicePixelRatio;
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            this.width = rect.width;
            this.height = rect.height;
        }
        
        init() {
            const isDark = document.body.classList.contains('dark-theme');
            const colors = isDark 
                ? ['#14b8a6', '#2dd4bf', '#5eead4', '#0d9488']
                : ['#14b8a6', '#2dd4bf', '#0d9488', '#5eead4'];
            
            // Create folders
            for (let i = 0; i < 12; i++) {
                this.folders.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    size: 40 + Math.random() * 40,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: 0.6 + Math.random() * 0.4,
                    targetX: 0,
                    targetY: 0,
                    targetRotation: 0,
                    label: ['Design', 'React', 'Academic', 'Laravel', 'Office', 'Docs', 'Assets', 'Utils', 'Tests', 'Config', 'Build', 'Dist'][i]
                });
            }
            
            // Create file dots
            for (let i = 0; i < 30; i++) {
                this.files.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: 4 + Math.random() * 6,
                    opacity: 0.3 + Math.random() * 0.4,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
            
            this.calculateOrganizedPositions();
        }
        
        calculateOrganizedPositions() {
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            const spacing = 100;
            
            // Tree structure positions
            const positions = [
                { x: 0, y: -spacing * 1.5 },      // Root
                { x: -spacing, y: 0 },             // Left branch
                { x: spacing, y: 0 },              // Right branch
                { x: -spacing * 1.5, y: spacing },  // Left children
                { x: -spacing * 0.5, y: spacing },
                { x: spacing * 0.5, y: spacing },
                { x: spacing * 1.5, y: spacing },
                { x: -spacing, y: spacing * 2 },   // Bottom row
                { x: 0, y: spacing * 2 },
                { x: spacing, y: spacing * 2 },
                { x: -spacing * 1.5, y: spacing * 2.5 },
                { x: spacing * 1.5, y: spacing * 2.5 }
            ];
            
            this.folders.forEach((folder, i) => {
                if (i < positions.length) {
                    folder.targetX = centerX + positions[i].x;
                    folder.targetY = centerY + positions[i].y;
                    folder.targetRotation = 0;
                }
            });
        }
        
        updatePhase(deltaTime) {
            this.phaseTimer += deltaTime;
            
            if (this.phase === 'chaos' && this.phaseTimer > this.phaseDuration.chaos) {
                this.phase = 'organizing';
                this.phaseTimer = 0;
            } else if (this.phase === 'organizing' && this.phaseTimer > this.phaseDuration.organizing) {
                this.phase = 'organized';
                this.phaseTimer = 0;
            } else if (this.phase === 'organized' && this.phaseTimer > this.phaseDuration.organized) {
                this.phase = 'chaos';
                this.phaseTimer = 0;
                this.init(); // Restart with new random positions
            }
        }
        
        drawFolder(folder) {
            const ctx = this.ctx;
            const isDark = document.body.classList.contains('dark-theme');
            
            ctx.save();
            ctx.translate(folder.x, folder.y);
            ctx.rotate(folder.rotation);
            ctx.globalAlpha = folder.opacity;
            
            // Folder shape
            const w = folder.size;
            const h = folder.size * 0.7;
            
            // Shadow
            if (isDark) {
                ctx.shadowColor = folder.color;
                ctx.shadowBlur = 20;
            } else {
                ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                ctx.shadowBlur = 10;
            }
            
            // Folder body
            ctx.fillStyle = folder.color;
            ctx.beginPath();
            ctx.roundRect(-w/2, -h/2, w, h, 4);
            ctx.fill();
            
            // Folder tab
            ctx.beginPath();
            ctx.roundRect(-w/2, -h/2 - 8, w * 0.4, 8, 2);
            ctx.fill();
            
            // Label (when organized)
            if (this.phase === 'organized' && folder.size > 50) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = isDark ? '#0a0a0a' : '#ffffff';
                ctx.font = '10px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(folder.label.slice(0, 6), 0, 0);
            }
            
            ctx.restore();
        }
        
        drawFile(file) {
            const ctx = this.ctx;
            const isDark = document.body.classList.contains('dark-theme');
            
            ctx.save();
            ctx.globalAlpha = file.opacity;
            
            if (isDark) {
                ctx.shadowColor = file.color;
                ctx.shadowBlur = 8;
            }
            
            ctx.fillStyle = file.color;
            ctx.beginPath();
            ctx.arc(file.x, file.y, file.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
        
        drawConnections() {
            if (this.phase !== 'organized') return;
            
            const ctx = this.ctx;
            const isDark = document.body.classList.contains('dark-theme');
            
            ctx.save();
            ctx.strokeStyle = isDark ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.2)';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.5;
            
            // Draw tree connections
            const connections = [
                [0, 1], [0, 2],          // Root to branches
                [1, 3], [1, 4],          // Left branch
                [2, 5], [2, 6],          // Right branch
                [3, 7], [4, 8], [5, 9],  // To bottom row
                [7, 10], [9, 11]         // Bottom connections
            ];
            
            connections.forEach(([from, to]) => {
                if (this.folders[from] && this.folders[to]) {
                    ctx.beginPath();
                    ctx.moveTo(this.folders[from].x, this.folders[from].y);
                    ctx.lineTo(this.folders[to].x, this.folders[to].y);
                    ctx.stroke();
                }
            });
            
            ctx.restore();
        }
        
        animate() {
            const deltaTime = 16;
            
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Update phase
            this.updatePhase(deltaTime);
            
            // Update and draw files
            this.files.forEach(file => {
                if (this.phase === 'chaos') {
                    file.x += file.vx;
                    file.y += file.vy;
                    
                    if (file.x < 0 || file.x > this.width) file.vx *= -1;
                    if (file.y < 0 || file.y > this.height) file.vy *= -1;
                }
                
                this.drawFile(file);
            });
            
            // Draw connections first (behind folders)
            this.drawConnections();
            
            // Update and draw folders
            this.folders.forEach(folder => {
                if (this.phase === 'chaos') {
                    // Chaotic movement
                    folder.x += folder.vx;
                    folder.y += folder.vy;
                    folder.rotation += folder.rotationSpeed;
                    
                    // Bounce off edges
                    if (folder.x < 0 || folder.x > this.width) folder.vx *= -1;
                    if (folder.y < 0 || folder.y > this.height) folder.vy *= -1;
                } else if (this.phase === 'organizing') {
                    // Smooth transition to organized position
                    const speed = 0.08;
                    folder.x += (folder.targetX - folder.x) * speed;
                    folder.y += (folder.targetY - folder.y) * speed;
                    folder.rotation += (folder.targetRotation - folder.rotation) * speed;
                } else {
                    // Stay in organized position with gentle float
                    const time = Date.now() * 0.001;
                    folder.x = folder.targetX + Math.sin(time + folder.targetX) * 2;
                    folder.y = folder.targetY + Math.cos(time + folder.targetY) * 2;
                }
                
                this.drawFolder(folder);
            });
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // ===================================
    // THEME TOGGLE
    // ===================================
    
    const initThemeToggle = () => {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        
        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            document.body.classList.add('dark-theme');
        }
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Recreate canvas animation with new theme colors
            if (window.folderCanvas) {
                window.folderCanvas.init();
            }
        });
    };
    
    // ===================================
    // LANGUAGE TOGGLE
    // ===================================
    
    const initLanguageToggle = () => {
        const toggle = document.getElementById('lang-toggle');
        if (!toggle) return;
        
        const ptBtn = toggle.querySelector('.lang-pt');
        const enBtn = toggle.querySelector('.lang-en');
        let currentLang = localStorage.getItem('lang') || 'pt';
        
        const setLanguage = (lang) => {
            currentLang = lang;
            localStorage.setItem('lang', lang);
            
            ptBtn.classList.toggle('active', lang === 'pt');
            enBtn.classList.toggle('active', lang === 'en');
            
            // Update all elements with data-en attribute
            if (lang === 'en') {
                document.querySelectorAll('[data-en]').forEach(el => {
                    const enText = el.getAttribute('data-en');
                    if (!el.hasAttribute('data-pt')) {
                        el.setAttribute('data-pt', el.textContent.trim());
                    }
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = enText;
                    } else if (el.hasAttribute('content')) {
                        el.setAttribute('content', enText);
                    } else {
                        el.textContent = enText;
                    }
                });
            } else {
                document.querySelectorAll('[data-pt]').forEach(el => {
                    const ptText = el.getAttribute('data-pt');
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = ptText;
                    } else if (el.hasAttribute('content')) {
                        el.setAttribute('content', ptText);
                    } else {
                        el.textContent = ptText;
                    }
                });
            }
        };
        
        // Initialize with saved language
        setLanguage(currentLang);
        
        toggle.addEventListener('click', () => {
            setLanguage(currentLang === 'pt' ? 'en' : 'pt');
        });
    };
    
    // ===================================
    // HAMBURGER MENU
    // ===================================
    
    const initHamburgerMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!hamburger || !mobileMenu) return;
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    };
    
    // ===================================
    // SCROLL REVEAL OBSERVER
    // ===================================
    
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
    
    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    
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
    
    // ===================================
    // NAVIGATION SCROLL BEHAVIOR
    // ===================================
    
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
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    };
    
    // ===================================
    // FEATURE CARD TILT EFFECT
    // ===================================
    
    const initCardTilt = () => {
        const cards = document.querySelectorAll('.feature-card, .template-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -2;
                const rotateY = ((x - centerX) / centerX) * 2;
                
                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    };
    
    // ===================================
    // INIT ALL
    // ===================================
    
    const init = () => {
        // Canvas hero animation
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.folderCanvas = new FolderCanvas('folder-canvas');
        }
        
        // UI controls
        initThemeToggle();
        initLanguageToggle();
        initHamburgerMenu();
        
        // Interactions
        revealElements();
        initSmoothScroll();
        initNavScroll();
        
        // Desktop-only features
        if (window.innerWidth >= 1024) {
            initCardTilt();
        }
        
        // Log version
        console.log('%cFOLDER X v1.0.1 — WOW Edition', 'font-size: 20px; font-weight: bold; color: #14b8a6;');
        console.log('%cWebsite by DanielPro', 'font-size: 12px; color: #6a6a6a;');
    };
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
