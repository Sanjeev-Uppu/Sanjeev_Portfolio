 document.addEventListener('DOMContentLoaded', function() {
            
            // --- Mobile Menu Logic ---
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const closeMenuButton = document.getElementById('close-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.remove('-translate-x-full'); });
            closeMenuButton.addEventListener('click', () => { mobileMenu.classList.add('-translate-x-full'); });
            mobileNavLinks.forEach(link => { link.addEventListener('click', () => { mobileMenu.classList.add('-translate-x-full'); }); });

            // --- Active Navigation Link Styling on Scroll ---
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a.nav-link');
            
            // Using rootMargin for better trigger accuracy.
            // This triggers when the top of a section is between 40% from the top and 60% from the bottom of the viewport.
            // This ensures an item is almost always active.
            const navObserverOptions = { 
                root: null, 
                rootMargin: '-40% 0px -60% 0px', 
                threshold: 0 
            };

            const navObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('nav-link-active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('nav-link-active');
                            }
                        });
                    }
                });
            }, navObserverOptions);
            sections.forEach(section => { navObserver.observe(section); });

            // --- General Fade-in and Slide-in Animations on Scroll ---
            const animationElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
            const animationObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
            const animationObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, animationObserverOptions);
            animationElements.forEach(el => { animationObserver.observe(el); });

            // --- Glitter on Click for Headings and Buttons ---
            const animatedElements = document.querySelectorAll('.animated-heading, .animated-button');
            animatedElements.forEach(element => {
                element.addEventListener('click', (e) => {
                    for(let i = 0; i < 20; i++) {
                        createGlitter(e.clientX, e.clientY);
                    }
                });
            });

            function createGlitter(x, y) {
                const particle = document.createElement('div');
                particle.className = 'glitter-particle';
                document.body.appendChild(particle);

                const size = Math.floor(Math.random() * 4 + 3);
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                const destinationX = (Math.random() - 0.5) * 300;
                const destinationY = (Math.random() - 0.5) * 300;

                particle.style.setProperty('--x', `${destinationX}px`);
                particle.style.setProperty('--y', `${destinationY}px`);
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                setTimeout(() => {
                    particle.remove();
                }, 800);
            }

            // --- Initialize Particles.js ---
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffffff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.3, "random": false },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#4a5568", "opacity": 0.2, "width": 1 },
                    "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                    "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
                },
                "retina_detect": true
            });
        });