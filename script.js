/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar ícones Lucide
  lucide.createIcons();
  
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    offset: 100,
    delay: 0,
  });
  
  // Registrar ScrollTrigger do GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Inicializar componentes
  initHeader();
  initHeroAnimations();
  initCounterAnimations();
  initFormHandlers();
  initFAQ();
  initMobileMenu();
  initSmoothScroll();
  initPhoneMask();
  initParallax();
});

/* ============================================
   HEADER SCROLL
   ============================================ */

function initHeader() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adicionar classe scrolled
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Esconder header ao rolar para baixo (opcional)
    // if (currentScroll > lastScroll && currentScroll > 500) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }
    
    lastScroll = currentScroll;
  });
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */

function initHeroAnimations() {
  // Animação de typing no título (opcional)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // GSAP Timeline para animação sequencial
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-description', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-cta-group .btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');
  }
  
  // Animação dos orbs de fundo
  gsap.to('.orb-1', {
    x: 30,
    y: -30,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.orb-2', {
    x: -20,
    y: 20,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */

function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

function initParallax() {
  // Parallax suave nos cards de serviço
  const servicoCards = document.querySelectorAll('.servico-card');
  
  servicoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
  // Parallax scroll nos elementos
  gsap.utils.toArray('.servico-card').forEach((card, i) => {
    gsap.to(card, {
      y: -30,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearch');
  
  // Accordion functionality
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Toggle do item clicado
      if (isActive) {
        item.classList.remove('active');
      } else {
        // Fechar outros itens da mesma categoria (opcional)
        const category = item.closest('.faq-category');
        const categoryItems = category.querySelectorAll('.faq-item');
        categoryItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Abrir o item clicado
        item.classList.add('active');
        
        // Scroll suave até o item
        setTimeout(() => {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });
  
  // Busca no FAQ
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          
          // Highlight do termo
          if (searchTerm.length > 2) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
        }
      });
      
      // Se busca vazia, mostrar todos
      if (searchTerm === '') {
        faqItems.forEach(item => {
          item.style.display = 'block';
          item.classList.remove('active');
        });
        
        // Abrir primeiro item de cada categoria
        document.querySelectorAll('.faq-category').forEach(category => {
          const firstItem = category.querySelector('.faq-item');
          if (firstItem) {
            firstItem.classList.add('active');
          }
        });
      }
    });
  }
}

/* ============================================
   FORMULÁRIOS
   ============================================ */

function initFormHandlers() {
  // Formulário de Briefing
  const briefingForm = document.getElementById('briefingForm');
  if (briefingForm) {
    briefingForm.addEventListener('submit', handleBriefingSubmit);
  }
  
  // Formulário de Parceiros
  const parceirosForm = document.getElementById('parceirosForm');
  if (parceirosForm) {
    parceirosForm.addEventListener('submit', handleParceirosSubmit);
  }
  
  // Validação em tempo real
  const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  let isValid = true;
  
  // Validação básica
  if (field.hasAttribute('required') && !value) {
    isValid = false;
  }
  
  // Validação de email
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }
  
  // Validação de telefone
  if (type === 'tel' && value) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    isValid = phoneRegex.test(value);
  }
  
  // Aplicar classes
  if (isValid) {
    field.classList.remove('error');
    field.classList.add('valid');
  } else {
    field.classList.add('error');
    field.classList.remove('valid');
  }
  
  return isValid;
}

function handleBriefingSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validar todos os campos
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showNotification('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
    return;
  }
  
  // Desabilitar botão
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Enviando...</span>';
  
  // Simular envio (adicionar loader)
  setTimeout(() => {
    // Criar mensagem para WhatsApp
    const message = `
🔵 *NOVO BRIEFING*

*Nome:* ${data.name}
*E-mail:* ${data.email}
*WhatsApp:* ${data.phone}
*Negócio:* ${data.business}
*Segmento:* ${data.segment}
*Objetivo:* ${data.objective}
*Plano:* ${data.plan}
${data.message ? `*Observações:* ${data.message}` : ''}
    `.trim();
    
    const whatsappURL = `https://wa.me/5583991816152?text=${encodeURIComponent(message)}`;
    
    // Resetar formulário
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    
    // Mostrar sucesso
    showNotification('Formulário preenchido! Redirecionando para o WhatsApp...', 'success');
    
    // Abrir WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 1500);
  }, 1000);
}

function handleParceirosSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validar campos obrigatórios
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Enviando...</span>';
  
  setTimeout(() => {
    const message = `
🤝 *SOLICITAÇÃO DE PARCERIA - DEZAIN CODE*

*Nome:* ${data.nome}
${data.empresa ? `*Empresa:* ${data.empresa}` : ''}
*Cidade/Estado:* ${data.cidade}
*Telefone:* ${data.telefone}
*E-mail:* ${data.email}
*Tipo de Parceria:* ${data.tipo}
${data.experiencia ? `*Experiência:* ${data.experiencia}` : ''}
${data.observacoes ? `*Observações:* ${data.observacoes}` : ''}

📄 _Aguardo o Guia de Parceria em PDF_
    `.trim();
    
    const whatsappURL = `https://wa.me/5583991816152?text=${encodeURIComponent(message)}`;
    
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    
    showNotification('Formulário preenchido! Redirecionando para o WhatsApp...', 'success');
    
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 1500);
  }, 1000);
}

/* ============================================
   MÁSCARA DE TELEFONE
   ============================================ */

function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      
      if (value.length <= 2) {
        value = value.replace(/^(\d{0,2})/, '($1');
      } else if (value.length <= 6) {
        value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
      } else if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      
      e.target.value = value;
    });
  });
}

/* ============================================
   NOTIFICAÇÕES
   ============================================ */

function showNotification(message, type = 'info') {
  // Remover notificação existente
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Estilos inline para a notificação
  Object.assign(notification.style, {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#2563EB',
    color: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease-out',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    maxWidth: '400px'
  });
  
  document.body.appendChild(notification);
  lucide.createIcons();
  
  // Adicionar animação CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  `;
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    document.head.appendChild(style);
  }
  
  // Remover após 5 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar links vazios ou só com #
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fechar menu mobile se aberto
        const mobileMenu = document.querySelector('.nav-menu');
        if (mobileMenu && mobileMenu.classList.contains('mobile-active')) {
          mobileMenu.classList.remove('mobile-active');
          document.querySelector('.mobile-menu-toggle').classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('mobile-active');
      
      // Prevenir scroll do body quando menu aberto
      if (menu.classList.contains('mobile-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Adicionar estilos para menu mobile
    if (!document.querySelector('#mobile-menu-styles')) {
      const style = document.createElement('style');
      style.id = 'mobile-menu-styles';
      style.textContent = `
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
            padding: 6rem 2rem 2rem;
            transition: right 0.3s ease;
            overflow-y: auto;
            z-index: 998;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          
          .nav-menu.mobile-active {
            right: 0;
          }
          
          .nav-menu li {
            width: 100%;
          }
          
          .nav-link {
            display: block;
            padding: 0.75rem 0;
            font-size: 1.125rem;
          }
          
          .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          
          .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
          }
          
          .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
          }
          
          .nav-cta {
            display: inline-flex;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/* ============================================
   SCROLL ANIMATIONS COM GSAP
   ============================================ */

// Animações dos cards de serviço
gsap.utils.toArray('.servico-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power3.out'
  });
});

// Animações dos planos
gsap.utils.toArray('.plan-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out'
  });
});

// Animação do special offer
gsap.from('.special-offer', {
  scrollTrigger: {
    trigger: '.special-offer',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  ease: 'back.out(1.7)'
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Lazy loading de imagens (se houver)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Debounce para resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalcular animações se necessário
    ScrollTrigger.refresh();
    AOS.refresh();
  }, 250);
});

/* ============================================
   EASTER EGGS E DETALHES
   ============================================ */

// Confetti ao enviar formulário com sucesso (opcional)
function triggerConfetti() {
  // Implementar com biblioteca canvas-confetti se desejar
  console.log('🎉 Formulário enviado com sucesso!');
}

// Log de boas-vindas no console
console.log('%c🚀 Dezain Code', 'font-size: 24px; font-weight: bold; color: #2563EB;');
console.log('%cSite desenvolvido com tecnologias modernas', 'font-size: 12px; color: #475569;');
console.log('%c- HTML5 Semântico\n- CSS3 com Variáveis\n- JavaScript Vanilla\n- GSAP para animações\n- AOS para scroll animations', 'font-size: 11px; color: #94A3B8;');

// Detectar modo escuro do sistema (para futuras implementações)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log('🌙 Dark mode detectado');
}

// Prevenir comportamentos indesejados
document.addEventListener('keydown', (e) => {
  // Permitir F12, Ctrl+Shift+I, etc para desenvolvedores
  // mas pode adicionar outras prevenções se necessário
});

console.log('%c✅ Site carregado com sucesso!', 'font-size: 14px; font-weight: bold; color: #10B981;');