// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL COM DUAS CORES
function typeWriter() {
    const blueElement = document.querySelector('#typing-title .title-blue');
    const whiteElement = document.querySelector('#typing-title .title-white');
    const textBlue = 'Soluções Web ';
    const textWhite = 'Profissionais Para Seu Negócio';
    let indexBlue = 0;
    let indexWhite = 0;
    
    function typeBlue() {
        if (indexBlue < textBlue.length) {
            blueElement.textContent = textBlue.substring(0, indexBlue + 1);
            indexBlue++;
            setTimeout(typeBlue, 80);
        } else {
            setTimeout(typeWhite, 200);
        }
    }
    
    function typeWhite() {
        if (indexWhite < textWhite.length) {
            whiteElement.textContent = textWhite.substring(0, indexWhite + 1);
            indexWhite++;
            setTimeout(typeWhite, 80);
        }
    }
    
    setTimeout(typeBlue, 500);
}

// ANIMAÇÕES DE DESLIZE PARA TÍTULOS E TEXTOS
function initSlideAnimations() {
    const slideElements = document.querySelectorAll('.slide-title, .slide-text, .slide-btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    slideElements.forEach(element => observer.observe(element));
}

// CAROUSEL FUNCTIONALITY - MOBILE NATIVO COM DOTS
class MobileCarousel {
    constructor(carouselName) {
        this.carouselName = carouselName;
        this.container = document.querySelector(`[data-carousel="${carouselName}"]`);
        this.dotsContainer = document.querySelector(`[data-carousel-dots="${carouselName}"]`);
        this.currentIndex = 0;
        this.dots = [];
        this.isEnabled = false;
        
        if (this.container && this.dotsContainer) {
            this.init();
        }
    }
    
    init() {
        this.checkViewport();
        window.addEventListener('resize', () => this.checkViewport());
        this.createDots();
        this.setupScrollDetection();
    }
    
    checkViewport() {
        const shouldEnable = window.innerWidth <= 1024;
        
        if (shouldEnable && !this.isEnabled) {
            this.enable();
        } else if (!shouldEnable && this.isEnabled) {
            this.disable();
        }
    }
    
    enable() {
        this.isEnabled = true;
        this.createDots();
    }
    
    disable() {
        this.isEnabled = false;
        if (this.dotsContainer) {
            this.dotsContainer.style.display = 'none';
        }
    }
    
    getItems() {
        return Array.from(this.container.children);
    }
    
    createDots() {
        if (!this.isEnabled || !this.dotsContainer) return;
        
        const items = this.getItems();
        this.dotsContainer.innerHTML = '';
        this.dots = [];
        
        items.forEach((item, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
        
        this.dotsContainer.style.display = items.length > 1 ? 'flex' : 'none';
    }
    
    setupScrollDetection() {
        if (!this.container) return;
        
        let scrollTimeout;
        this.container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateDotsBasedOnScroll();
            }, 100);
        });
    }
    
    updateDotsBasedOnScroll() {
        if (!this.isEnabled || !this.container) return;
        
        const scrollLeft = this.container.scrollLeft;
        const itemWidth = this.container.offsetWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);
        
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateDots();
        }
    }
    
    goToSlide(index) {
        if (!this.isEnabled || !this.container) return;
        
        const itemWidth = this.container.offsetWidth;
        this.container.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });
        
        this.currentIndex = index;
        this.updateDots();
    }
    
    updateDots() {
        if (!this.isEnabled) return;
        
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Initialize all carousels
let carousels = {};

function initCarousels() {
    carousels.services = new MobileCarousel('services');
    carousels.benefits = new MobileCarousel('benefits');
    carousels.plans = new MobileCarousel('plans');
    carousels.partner = new MobileCarousel('partner');
}

// Create particles with enhanced animation
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const numParticles = 25;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        const blueHue = Math.floor(Math.random() * 40) + 200;
        const brightness = Math.floor(Math.random() * 40) + 60;
        particle.style.backgroundColor = `hsla(${blueHue}, 100%, ${brightness}%, 0.7)`;
        particle.style.boxShadow = `0 0 ${size * 3}px hsla(${blueHue}, 100%, ${brightness}%, 0.9)`;
        
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.8 + 0.3;
        
        container.appendChild(particle);
    }
}

// Enhanced Scroll Reveal Animation with Parallax
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
    
    // Parallax effect for images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        const speed = 0.05;
        const rect = img.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const offset = rect.top + scrolled;
        const diff = scrolled - offset;
        const yPos = -(diff * speed);
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
}

// Counter Animation with enhanced easing
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        if (counter.classList.contains('animated')) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500;
        const windowHeight = window.innerHeight;
        const counterTop = counter.getBoundingClientRect().top;
        
        if (counterTop < windowHeight * 0.8) {
            counter.classList.add('animated');
            
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                const current = Math.floor(target * easeOutQuart);
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    });
}

// FAQ Toggle with smooth animation
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    } else {
        faqItem.classList.remove('active');
    }
}

// Enhanced Briefing Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar efeito de digitação
    typeWriter();
    
    // Iniciar animações de deslize
    initSlideAnimations();
    
    // Initialize carousels
    setTimeout(initCarousels, 500);
    
    // Create particles
    createParticles();
    
    const briefingForm = document.getElementById('briefingForm');
    
    if (briefingForm) {
        briefingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            let message = '*🔵 NOVO BRIEFING DEZAIN CODE*\n\n';
            
            const labels = {
                name: '👤 Nome',
                email: '📧 E-mail',
                phone: '📱 WhatsApp',
                business: '🏢 Negócio',
                segment: '🎯 Segmento',
                objective: '🎪 Objetivo do site',
                plan: '💎 Plano de interesse',
                message: '📝 Informações adicionais'
            };
            
            formData.forEach((value, key) => {
                if (value && labels[key]) {
                    message += `*${labels[key]}:* ${value}\n`;
                }
            });
            
            message += '\n_Enviado através do site Dezain Code_';
            
            const whatsappUrl = `https://wa.me/5583991816152?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ENVIADO COM SUCESSO!';
            submitBtn.style.background = 'linear-gradient(135deg, #00d084, #00a86b)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
        
        const formControls = briefingForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
});

// Smooth Scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Enhanced Service Cards Hover Effect with Tilt (Desktop only)
if (window.innerWidth > 1024) {
    document.addEventListener('DOMContentLoaded', function() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `
                    translateY(-16px) 
                    scale(1.02) 
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    });
}

// Plan Cards Enhanced Animation (Desktop only)
if (window.innerWidth > 1024) {
    document.addEventListener('DOMContentLoaded', function() {
        const planCards = document.querySelectorAll('.plan-card');
        
        planCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                planCards.forEach(otherCard => {
                    if (otherCard !== card && !otherCard.classList.contains('featured')) {
                        otherCard.style.opacity = '0.6';
                        otherCard.style.transform = 'scale(0.95)';
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                planCards.forEach(otherCard => {
                    otherCard.style.opacity = '1';
                    otherCard.style.transform = '';
                });
            });
        });
    });
}

// Benefit Items Stagger Animation
function animateBenefitItems() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const windowHeight = window.innerHeight;
    
    benefitItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < windowHeight * 0.85) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
            }, index * 100);
        }
    });
}

// WhatsApp Button Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse-whatsapp 2s infinite';
        });
    }
});

// Initialize Intersection Observer for advanced animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            animateCounters();
            animateBenefitItems();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    initIntersectionObserver();
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    revealOnScroll();
    animateCounters();
});

// Prevent layout shift
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// SVG Icon Animations Enhancement (Desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', function() {
        const animatedIcons = document.querySelectorAll('.animated-icon');
        
        animatedIcons.forEach(icon => {
            const card = icon.closest('.service-card, .benefit-item');
            
            if (card) {
                card.addEventListener('mouseenter', function() {
                    icon.style.filter = 'drop-shadow(0 15px 30px rgba(0, 191, 165, 0.8))';
                });
                
                card.addEventListener('mouseleave', function() {
                    icon.style.filter = 'drop-shadow(0 10px 20px rgba(0, 191, 165, 0.4))';
                });
            }
        });
    });
}

// Add error handling for form submission
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3b30';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid && !e.defaultPrevented) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
});

// Mobile touch optimization
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.service-card, .plan-card, .benefit-item');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }, { passive: true });
        });
    });
}

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const animatedIcons = document.querySelectorAll('.animated-icon');
    if (document.hidden) {
        animatedIcons.forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    } else {
        animatedIcons.forEach(icon => {
            icon.style.animationPlayState = 'running';
        });
    }
});

// Console message for developers
console.log('%c🚀 Dezain Code - Site desenvolvido com excelência', 'color: #00bfa5; font-size: 16px; font-weight: bold;');
console.log('%cTodos os direitos reservados © 2025', 'color: #667eea; font-size: 12px;');