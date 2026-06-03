/* ============================================================
   MAIN.JS — Core initialization & orchestration
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules in order
  initLoader();
  initCursor();
  initStarField();
  initParticles();
  initNavbar();
  initTyped();
  init3DCard();
  initScrollReveal();
  initStatCounters();
  initSkillBars();
  initProjects();
  initTestimonials();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initSmoothScroll();
  initMouseSpotlight();
  initFloatingIcons();
});

/* ============================================================
   PAGE LOADER
   ============================================================ */
function initLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  
  // Simulate loading progress
  const bar = loader.querySelector('.loader-bar');
  if (bar) {
    let width = 0;
    const interval = setInterval(() => {
      width += Math.random() * 30;
      if (width >= 100) {
        width = 100;
        clearInterval(interval);
      }
      bar.style.width = width + '%';
    }, 200);
  }

  // Hide loader after content is ready
  const hideLoader = () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero animations
      document.querySelectorAll('.hero-left, .hero-right').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }, 1400);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
}

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = window.pageYOffset / total;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!nav) return;

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      
      const offset = 80; // Nav height
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
  const elements = document.querySelectorAll(revealClasses.join(', '));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   TYPED TEXT EFFECT
   ============================================================ */
function initTyped() {
  const el = document.querySelector('.hero-typed');
  if (!el) return;

  const phrases = [
    'Full Stack Developer',
    'AI Innovator',
    'Creative Designer',
    'Entrepreneur',
    'Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  setTimeout(type, 1000);
}

/* ============================================================
   3D CARD TILT (Mouse Move)
   ============================================================ */
function init3DCard() {
  const card = document.querySelector('.profile-card-3d');
  if (!card) return;

  const inner = card.querySelector('.profile-card-inner');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angleX = -(e.clientY - centerY) / 15;
    const angleY = (e.clientX - centerX) / 15;
    
    inner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });

  // General tilt for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (0.5 - y) * 10;
      const tiltY = (x - 0.5) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   STAT COUNTERS (animate on scroll)
   ============================================================ */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current < target) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   SKILL PROGRESS BARS (animate on scroll)
   ============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress-bar[data-width]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   PROJECTS — Hover ripple
   ============================================================ */
function initProjects() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      const rect = card.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: 10px; height: 10px;
        background: rgba(0, 229, 255, 0.3);
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let autoInterval;

  const slideTo = (index) => {
    const maxIndex = Math.max(0, cards.length - 2); // Show 2 at a time on desktop
    current = Math.max(0, Math.min(index, cards.length - 1));
    
    const cardWidth = cards[0].offsetWidth + 32; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  };

  const next = () => slideTo((current + 1) % cards.length);
  const prev = () => slideTo((current - 1 + cards.length) % cards.length);

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);
  dots.forEach((dot, i) => dot.addEventListener('click', () => slideTo(i)));

  // Auto-slide every 4s
  autoInterval = setInterval(next, 4000);

  track.addEventListener('mouseenter', () => clearInterval(autoInterval));
  track.addEventListener('mouseleave', () => {
    autoInterval = setInterval(next, 4000);
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.form-submit');
    const originalHtml = btn.innerHTML;
    
    btn.innerHTML = '<span class="submit-text"><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
    btn.disabled = true;
    
    // Simulate send
    setTimeout(() => {
      btn.innerHTML = '<span class="submit-text"><i class="fas fa-check"></i> Message Sent!</span>';
      btn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
      
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    }, 1500);
  });
}

/* ============================================================
   MOUSE SPOTLIGHT
   ============================================================ */
function initMouseSpotlight() {
  const spotlight = document.querySelector('.mouse-spotlight');
  if (!spotlight) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const animate = () => {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    spotlight.style.left = currentX + 'px';
    spotlight.style.top = currentY + 'px';
    requestAnimationFrame(animate);
  };

  animate();
}

/* ============================================================
   FLOATING TECH ICONS
   ============================================================ */
function initFloatingIcons() {
  // Add random floating animation delays
  document.querySelectorAll('.orbit-icon').forEach((icon, i) => {
    icon.style.animationDelay = `${i * 0.5}s`;
  });
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  if (window.innerWidth <= 768) return;
  
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  
  if (!dot || !ring) return;

  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    
    // Create trail
    createTrail(mouseX, mouseY);
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  };
  animateRing();

  // Hover effects
  const interactiveEls = 'a, button, .skill-card, .project-card, .service-card, .testimonial-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveEls)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveEls)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* ─── Cursor Trail ─── */
let trailPool = [];
let trailIndex = 0;
const TRAIL_LENGTH = 12;

function createTrail(x, y) {
  if (trailPool.length < TRAIL_LENGTH) {
    const el = document.createElement('div');
    el.className = 'cursor-trail';
    document.body.appendChild(el);
    trailPool.push(el);
  }
  
  const trail = trailPool[trailIndex % TRAIL_LENGTH];
  trailIndex++;
  
  const colors = ['#00E5FF', '#7B61FF', '#FF4D9D'];
  const color = colors[trailIndex % colors.length];
  const size = Math.max(2, 6 - (trailIndex % TRAIL_LENGTH) * 0.4);
  
  trail.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${color};
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    opacity: ${0.6 - (trailIndex % TRAIL_LENGTH) * 0.05};
    transition: opacity 0.3s ease;
  `;
  
  setTimeout(() => {
    trail.style.opacity = '0';
  }, 50);
}

/* ============================================================
   STAR FIELD
   ============================================================ */
function initStarField() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 200;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  };

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.2,
        opacity: Math.random(),
        opacitySpeed: 0.005 + Math.random() * 0.01,
        increasing: Math.random() > 0.5
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      // Twinkle
      if (star.increasing) {
        star.opacity += star.opacitySpeed;
        if (star.opacity >= 1) star.increasing = false;
      } else {
        star.opacity -= star.opacitySpeed;
        if (star.opacity <= 0.1) star.increasing = true;
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ============================================================
   PARTICLE SYSTEM (canvas-based)
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -1000, mouseY = -1000;
  const PARTICLE_COUNT = 60;

  const colors = [
    'rgba(0, 229, 255, ',
    'rgba(123, 97, 255, ',
    'rgba(255, 77, 157, '
  ];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.2 + Math.random() * 0.4,
      connected: []
    };
  }

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Mouse repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.5;
        p.vy += (dy / dist) * force * 0.5;
      }

      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.vx += (Math.random() - 0.5) * 0.05;
      p.vy += (Math.random() - 0.5) * 0.05;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx2 = p.x - q.x;
        const dy2 = p.y - q.y;
        const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (d2 < 100) {
          const alpha = (1 - d2 / 100) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
