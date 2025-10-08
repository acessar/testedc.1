// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL COM CORES HALLOWEEN
function typeWriter() {
    const purpleElement = document.querySelector('#typing-title .title-purple');
    const cyanElement = document.querySelector('#typing-title .title-cyan');
    const textPurple = 'Soluções Web ';
    const textCyan = 'Profissionais Para Seu Negócio';
    let indexPurple = 0;
    let indexCyan = 0;
    
    function typePurple() {
        if (indexPurple < textPurple.length) {
            purpleElement.textContent = textPurple.substring(0, indexPurple + 1);
            indexPurple++;
            setTimeout(typePurple, 80);
        } else {
            setTimeout(typeCyan, 200);
        }
    }
    
    function typeCyan() {
        if (indexCyan < textCyan.length) {
            cyanElement.textContent = textCyan.substring(0, indexCyan + 1);
            indexCyan++;
            setTimeout(typeCyan, 80);
        }
    }
    
    setTimeout(typePurple, 500);
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

// Create Halloween-themed particles with enhanced animation
function createParticles() {
    const container = document.getElementById('particles');
    const numParticles = 30;
    
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
        
        // Halloween color palette
        const colors = ['#ff6b35', '#ff8c42', '#4a1a5c', '#ff6b35'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.backgroundColor = randomColor;
        particle.style.boxShadow = `0 0 ${size * 3}px ${randomColor}`;
        
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.8 + 0.3;
        
        container.appendChild(particle);
    }
}

// Halloween-themed floating elements
function createHalloweenElements() {
    const container = document.querySelector('.halloween-elements');
    
    // Create additional floating elements
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'halloween-particle';
        element.style.position = 'absolute';
        element.style.width = Math.random() * 20 + 10 + 'px';
        element.style.height = Math.random() * 20 + 10 + 'px';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.background = `radial-gradient(circle, ${['#ff6b35', '#ff8c42', '#4a1a5c'][Math.floor(Math.random() * 3)]}, transparent)`;
        element.style.borderRadius = '50%';
        element.style.animation = `halloweenFloat ${5 + Math.random() * 10}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.opacity = Math.random() * 0.5 + 0.2;
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        
        container.appendChild(element);
    }
}

// Enhanced Scroll Reveal Animation with Parallax
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Trigger animation when element is 15% into viewport
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
    
    // Smooth parallax for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const speed = 0.02 + (index * 0.01);
        const rect = card.getBoundingClientRect();
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercentage = (windowHeight - rect.top) / windowHeight;
            const translateY = scrollPercentage * 20 * speed;
            
            if (card.classList.contains('visible')) {
                card.style.transform = `translateY(calc(-16px + ${translateY}px))`;
            }
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
                
                // Easing function for smooth animation
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
    
    // Close all items with animation
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
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
    
    // Create Halloween elements
    createHalloweenElements();
    
    const briefingForm = document.getElementById('briefingForm');
    
    if (briefingForm) {
        briefingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            let message = '*🎃 NOVO BRIEFING HALLOWEEN DEZAIN CODE*\n\n';
            
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
            
            message += '\n🎃 _Enviado através do site Halloween Special Dezain Code_';
            
            const whatsappUrl = `https://wa.me/5583991816152?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Success animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-skull"></i> ENVIADO COM SUCESSO!';
            submitBtn.style.background = 'linear-gradient(135deg, #ff6b35, #8b00ff)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
        
        // Enhanced form field animations
        const formControls = briefingForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.3)';
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.style.boxShadow = '';
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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(10, 10, 10, 0.85)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Service Cards Hover Effect with Tilt
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

// Plan Cards Enhanced Animation
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
        let isHovering = false;
        
        whatsappBtn.addEventListener('mouseenter', function() {
            isHovering = true;
            this.style.animation = 'none';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            isHovering = false;
            this.style.animation = 'pulse-whatsapp 2s infinite';
        });
    }
});

// Image Lazy Loading Effect
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Text Animation on Scroll
function animateTextOnScroll() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const windowHeight = window.innerHeight;
    
    textElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.9 && !element.classList.contains('text-animated')) {
            element.classList.add('text-animated');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Halloween-themed interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add Halloween sound effects on hover (visual feedback only)
    const halloweenElements = document.querySelectorAll('.ghost, .bat, .skull, .pumpkin');
    
    halloweenElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Halloween-themed cursor trail
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        const trailElement = document.createElement('div');
        trailElement.style.position = 'fixed';
        trailElement.style.left = e.clientX + 'px';
        trailElement.style.top = e.clientY + 'px';
        trailElement.style.width = '4px';
        trailElement.style.height = '4px';
        trailElement.style.background = ['#ff6b35', '#ff8c42', '#4a1a5c'][Math.floor(Math.random() * 3)];
        trailElement.style.borderRadius = '50%';
        trailElement.style.pointerEvents = 'none';
        trailElement.style.zIndex = '9999';
        trailElement.style.opacity = '0.7';
        trailElement.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(trailElement);
        
        mouseTrail.push(trailElement);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trailElement && trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 1000);
    });
    
    // Add CSS for trail animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes halloweenFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
            50% { transform: translateY(-10px) translateX(-5px) rotate(180deg); }
            75% { transform: translateY(-25px) translateX(5px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
});

// SVG Icon Animations Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações interativas extras para os ícones SVG
    const animatedIcons = document.querySelectorAll('.animated-icon');
    
    animatedIcons.forEach(icon => {
        const card = icon.closest('.service-card, .benefit-item');
        
        if (card) {
            card.addEventListener('mouseenter', function() {
                icon.style.filter = 'drop-shadow(0 15px 30px rgba(0, 255, 255, 0.8))';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.filter = 'drop-shadow(0 10px 20px rgba(0, 255, 255, 0.4))';
            });
        }
    });
    
    // Animações específicas para o ícone de chatbot
    const chatbotIcon = document.querySelector('.chatbot-icon');
    if (chatbotIcon) {
        const card = chatbotIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const dots = chatbotIcon.querySelectorAll('.chat-dot-1, .chat-dot-2, .chat-dot-3');
                const signal = chatbotIcon.querySelector('.bot-signal');
                
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'typingBounce 0.5s ease-in-out 2';
                    }, index * 100);
                });
                
                if (signal) {
                    signal.style.animation = 'signalPulse 0.5s ease-in-out 3';
                }
            });
        }
    }
    
    // Animações específicas para o ícone de personalização
    const customIcon = document.querySelector('.palette-icon');
    if (customIcon) {
        const card = customIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const colors = customIcon.querySelectorAll('[class*="color"]');
                colors.forEach((color, index) => {
                    setTimeout(() => {
                        color.style.animation = 'colorPulse 0.5s ease-in-out';
                    }, index * 100);
                });
            });
        }
    }
    
    // Animações específicas para o ícone de manutenção
    const maintenanceIcon = document.querySelector('.tools-icon');
    if (maintenanceIcon) {
        const card = maintenanceIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const gear = maintenanceIcon.querySelector('.gear-circle');
                const wrench = maintenanceIcon.querySelector('.wrench');
                
                if (gear) {
                    gear.style.animation = 'gearSpin 1s linear infinite';
                }
                if (wrench) {
                    wrench.style.animation = 'wrenchRotate 0.5s ease-in-out 3';
                }
            });
        }
    }
    
    // Animações específicas para o ícone de vendas
    const salesIcon = document.querySelector('.chart-icon');
    if (salesIcon) {
        const chartLine = salesIcon.querySelector('.growth-line');
        const dots = salesIcon.querySelectorAll('[class*="chart-point"]');
        
        const card = salesIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                if (chartLine) {
                    chartLine.style.animation = 'chartGrow 1s ease-in-out forwards';
                }
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'dotPulse 0.5s ease-in-out';
                    }, index * 100);
                });
            });
        }
    }
});

// Check Icon Animations Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const checkIcons = document.querySelectorAll('.check-icon, .check-icon-small');
    
    checkIcons.forEach(icon => {
        const item = icon.closest('.plan-feature, .showcase-features li');
        
        if (item) {
            item.addEventListener('mouseenter', function() {
                const circle = icon.querySelector('.check-circle');
                const mark = icon.querySelector('.check-mark');
                
                if (circle && mark) {
                    circle.style.animation = 'checkCirclePulse 0.5s ease-in-out';
                    mark.style.animation = 'checkMarkDraw 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        circle.style.animation = '';
                        mark.style.animation = '';
                    }, 500);
                }
            });
        }
    });
});

// FAQ Icon Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.faq-icon');
            const faqItem = this.closest('.faq-item');
            if (icon && !faqItem.classList.contains('active')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, a, .btn, .service-card, .plan-card, .benefit-item');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations
        document.querySelectorAll('.animated-icon').forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.animated-icon').forEach(icon => {
            icon.style.animationPlayState = 'running';
        });
    }
});

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
                    field.style.borderColor = '#ff6b35';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
});

// Add smooth fade-in for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile touch optimization
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.service-card, .plan-card, .benefit-item');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    });
}

// Main Event Listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    animateCounters();
    animateBenefitItems();
    animateTextOnScroll();
});

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            animateCounters();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    revealOnScroll();
    initIntersectionObserver();
    lazyLoadImages();
    
    // Add entrance animation to hero
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

// Console message for developers
console.log('%c🎃 Dezain Code - Halloween Special desenvolvido com excelência', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%cTodos os direitos reservados © 2025', 'color: #8b00ff; font-size: 12px;');
