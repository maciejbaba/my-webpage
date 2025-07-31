// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // Theme Management
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  // Update theme toggle icon
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add visual feedback
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Smooth Scroll Enhancement
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(this.getAttribute('href'));
      }
    });
  });
  
  // Update active navigation link
  function updateActiveNavLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`a[href="${href}"]`)?.classList.add('active');
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Special handling for stat cards counter animation
        if (entry.target.classList.contains('stat-card')) {
          animateCounter(entry.target);
        }
        
        // Unobserve after animation to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
    .glass-section,
    .stat-card,
    .skill-category,
    .project-card,
    .contact-method,
    .cta-button
  `);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Counter Animation for Statistics
  function animateCounter(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalNumber) {
        current = finalNumber;
        clearInterval(timer);
      }
      
      const suffix = numberElement.textContent.includes('+') ? '+' : '';
      numberElement.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Parallax Effect for Floating Shapes
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  // Throttled scroll event for performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        updateScrollIndicator();
        updateNavbarOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);

  // Scroll Indicator
  function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - (scrollY / 300));
      scrollIndicator.style.opacity = opacity;
    }
  }

  // Update Navbar on Scroll
  function updateNavbarOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Enhanced Typing Animation
  function startTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const text = 'Full Stack Developer';
    const speed = 100;
    let i = 0;
    
    typingElement.textContent = '';
    
    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
  }
  
  startTypingAnimation();

  // Project Card Interactions
  document.querySelectorAll('.project-card').forEach(card => {
    const iframe = card.querySelector('iframe');
    
    card.addEventListener('mouseenter', () => {
      if (iframe) {
        iframe.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (iframe) {
        iframe.style.transform = 'scale(1.02)';
      }
    });
  });

  // Skill Item Interactions
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', () => {
      // Add click feedback
      item.style.transform = 'translateY(-8px) scale(1.05)';
      setTimeout(() => {
        item.style.transform = 'translateY(-4px)';
      }, 200);
    });
  });

  // Enhanced Contact Method Interactions
  document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('mouseenter', () => {
      const icon = method.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
      }
    });
    
    method.addEventListener('mouseleave', () => {
      const icon = method.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Loading Animation
  function initializeLoadingAnimations() {
    const elements = document.querySelectorAll('.loading');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('loaded');
      }, index * 100);
    });
  }
  
  initializeLoadingAnimations();

  // Performance: Preload critical images
  function preloadImages() {
    const imageUrls = [
      'https://avatars.githubusercontent.com/u/81487891?v=4'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
  
  preloadImages();

  // Add custom cursor effect for interactive elements
  function addCursorEffects() {
    const interactiveElements = document.querySelectorAll(`
      .nav-link,
      .skill-item,
      .project-link,
      .contact-method,
      .cta-button,
      .tech-tag
    `);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
      });
      
      el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
      });
    });
  }
  
  addCursorEffects();

  // Error handling for iframes
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('error', function() {
      const parent = this.closest('.project-image');
      if (parent) {
        parent.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--bg-secondary); color: var(--text-muted);">
            <div style="text-align: center;">
              <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <p>Preview not available</p>
            </div>
          </div>
        `;
      }
    });
  });

  console.log('🚀 Modern portfolio initialized successfully!');
});
