// Typing Effect Logic
const texts = [
  "Create with clarity and precision.", 
  "Build strategies with advanced analytics.", 
  "Engineer intuitive, intelligent reporting."
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
  if (count === texts.length) { count = 0; }
  currentText = texts[count];

  if (isDeleting) {
    letter = currentText.slice(0, --index);
  } else {
    letter = currentText.slice(0, ++index);
  }

  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    typewriterEl.textContent = letter;
  }

  let typeSpeed = isDeleting ? 30 : 70;

  if (!isDeleting && letter.length === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && letter.length === 0) {
    isDeleting = false;
    count++;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(type, typeSpeed);
}

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

function activateRevealElement(el) {
  window.requestAnimationFrame(() => {
    el.classList.add('active');
  });
}

const observer = new IntersectionObserver((entries, revealObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateRevealElement(entry.target);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Dynamic Chart.js Initialization and Re-rendering
let chart1 = null;
let chart2 = null;

function initCharts(isDark) {
  const labelColor = isDark ? '#aca399' : '#615243';
  
  const commonOptions = {
    plugins: { 
      legend: { 
        position: 'bottom', 
        labels: { 
          color: labelColor, 
          font: { family: 'Inter', size: 12, weight: '500' },
          padding: 15
        } 
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 15, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#f0e6dc' : '#3a2e1d',
        bodyColor: isDark ? '#aca399' : '#615243',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return ' ' + context.label + ': ' + context.raw + '%';
          }
        }
      }
    },
    cutout: '68%', 
    responsive: true, 
    maintainAspectRatio: false,
    animation: { duration: 1500, easing: 'easeOutQuart' }
  };
  
  const chart1Ctx = document.getElementById('chart1');
  if (chart1Ctx) {
    if (chart1) { chart1.destroy(); }
    
    const pythonColor = isDark ? '#e59955' : '#3a2e1d';
    const sqlColor = isDark ? '#aca399' : '#c4874b';
    const nosqlColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#e8e2d7';
    
    chart1 = new Chart(chart1Ctx, {
      type: 'doughnut',
      data: { 
        labels: ['Python', 'SQL', 'NoSQL (MongoDB)'], 
        datasets: [{ 
          data: [80, 75, 50], 
          backgroundColor: [pythonColor, sqlColor, nosqlColor], 
          borderWidth: 0 
        }] 
      },
      options: commonOptions
    });
  }
  
  const chart2Ctx = document.getElementById('chart2');
  if (chart2Ctx) {
    if (chart2) { chart2.destroy(); }
    
    const pbiColor = isDark ? '#e59955' : '#c4874b';
    const tableauColor = isDark ? '#817366' : '#9b8066';
    const excelColor = isDark ? '#aca399' : '#d2c4b5';
    
    chart2 = new Chart(chart2Ctx, {
      type: 'doughnut',
      data: { 
        labels: ['Power BI', 'Tableau', 'Excel Analytics'], 
        datasets: [{ 
          data: [85, 70, 75], 
          backgroundColor: [pbiColor, tableauColor, excelColor], 
          borderWidth: 0 
        }] 
      },
      options: commonOptions
    });
  }
}

// Update GitHub Statistics Theme
function updateGithubStats(isDark) {
  const statsImg = document.getElementById('githubStatsImg');
  const contribImg = document.getElementById('githubContribImg');
  
  if (statsImg) {
    if (isDark) {
      statsImg.src = "https://github-readme-stats.vercel.app/api?username=nirakarrath&show_icons=true&theme=transparent&hide_border=true&title_color=f0e6dc&text_color=aca399&icon_color=e59955";
    } else {
      statsImg.src = "https://github-readme-stats.vercel.app/api?username=nirakarrath&show_icons=true&theme=transparent&hide_border=true&title_color=3a2e1d&text_color=615243&icon_color=c4874b";
    }
  }
  
  if (contribImg) {
    if (isDark) {
      contribImg.src = "https://github-readme-activity-graph.vercel.app/graph?username=niru356&theme=react-dark&bg_color=110f17&hide_border=true";
    } else {
      contribImg.src = "https://github-readme-activity-graph.vercel.app/graph?username=niru356&theme=github-compact";
    }
  }
}

// Interactive Particle Background Canvas System
let particleAnimationId;
  // Optimized Particle System Initialization
  function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleAnimationId = null;
    const mouse = { x: null, y: null, radius: 130 };

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      createParticles();
    }

    // Reduce particle density on small viewports
    function calculateParticleCount() {
      const area = (canvas.width * canvas.height) / 1000000; // million pixels
      const baseDensity = 25; // per million pixels
      const max = window.innerWidth < 768 ? 30 : 100;
      const min = window.innerWidth < 768 ? 10 : 15;
      return Math.min(max, Math.max(min, Math.floor(area * baseDensity)));
    }

    function createParticles() {
      particles = [];
      const particleCount = calculateParticleCount();
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 0.35;
        const vy = (Math.random() - 0.5) * 0.35;
        particles.push(new Particle(x, y, vx, vy, radius));
      }
    }

    class Particle {
      constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.alpha = this.baseAlpha;
      }
      draw() {
        const accentRgb = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '196, 135, 75';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${this.alpha})`;
        ctx.fill();
      }
      update() {
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.alpha = Math.min(0.7, this.baseAlpha + force * 0.4);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            const accentRgb = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '196, 135, 75';
            ctx.strokeStyle = `rgba(${accentRgb}, ${force * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            this.alpha = this.baseAlpha;
          }
        } else {
          this.alpha = this.baseAlpha;
        }
        this.draw();
      }
    }

    function drawLines() {
      const accentRgb = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '196, 135, 75';
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDistance) {
            const alpha = (maxDistance - dist) / maxDistance * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      drawLines();
      particleAnimationId = requestAnimationFrame(animate);
    }

    // Pause when page hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(particleAnimationId);
        particleAnimationId = null;
      } else if (particleAnimationId === null) {
        animate();
      }
    });

    // IntersectionObserver to pause when canvas out of viewport
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!particleAnimationId) animate();
        } else {
          cancelAnimationFrame(particleAnimationId);
          particleAnimationId = null;
        }
      });
    }, { threshold: 0.1 });
    canvasObserver.observe(canvas);

    // Resize handling
    window.addEventListener('resize', () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        resizeCanvas();
      }, 200);
    });

    // Mouse move handling
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Initial setup
    resizeCanvas();
    animate();
  }

// Dom Loaded Handlers
document.addEventListener("DOMContentLoaded", () => {
  // Start typewriter effect
  setTimeout(type, 800);

  // Observe reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisibleOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisibleOnLoad) {
      activateRevealElement(el);
      return;
    }
    observer.observe(el);
  });
  
  // Header scrolled class trigger
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    if (window.scrollY > 40) {
      topBar.classList.add('scrolled');
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        topBar.classList.add('scrolled');
      } else {
        topBar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggling
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.classList.remove('active');
        const icon = mobileBtn ? mobileBtn.querySelector('i') : null;
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  });

  // Contact Form Submission UX alert
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      alert('Message sent successfully!');
    });
  }

  // Lazy load all images
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
  });

  // IntersectionObserver for background video to start/pause based on visibility
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const videoSrc = heroVideo.dataset.src || heroVideo.getAttribute('src');
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoSrc && !heroVideo.getAttribute('src')) {
            heroVideo.src = videoSrc;
          }
          const playPromise = heroVideo.play();
          if (playPromise) {
            playPromise.catch(() => {});
          }
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.1 });
    videoObserver.observe(heroVideo);
  }

  // Initialize particle system only on desktop viewports
  if (window.innerWidth > 768) {
    initParticleSystem();
  }

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const isDarkActive = savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(isDark) {
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (isDark) {
      document.body.classList.add('dark-mode');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
      localStorage.setItem('theme', 'light');
    }
    
    // Update dependent components
    initCharts(isDark);
    updateGithubStats(isDark);
  }

  // Set initial theme
  setTheme(isDarkActive);

  // Toggle Listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentlyDark = document.body.classList.contains('dark-mode');
      setTheme(!currentlyDark);
    });
  }

  // Track CV/Resume downloads
  const downloadLinks = document.querySelectorAll('.track-download');
  downloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log(`Resume downloaded via button ID: ${link.id}`);
    });
  });

  // 3D Perspective Tilt on Desktop cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 992) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // Slightly increased tilt range for richer sensation
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.005)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg) scale(1)`;
    });
  });
});
