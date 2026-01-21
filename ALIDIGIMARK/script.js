// Service modal data
const serviceData = {
    branding: {
        title: "Branding & Digital Strategy",
        icon: "fas fa-bullseye",
        color: "var(--primary-blue)",
        content: `<p>We help you identify your brand and develop a winning strategy that maximizes your effectiveness while minimizing the time and money required to achieve your goals.</p>
        <ul style="margin-top: 15px; padding-left: 20px;">
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Brand Identity Development</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Digital Strategy Planning</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Market Positioning</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Competitor Analysis</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> ROI-Focused Campaign Planning</li>
        </ul>`
    },
    website: {
        title: "Website Design & Development",
        icon: "fas fa-code",
        color: "var(--secondary-red)",
        content: `<p>Our design team will create the best looking and most effective website possible. We build responsive, fast, and conversion-optimized websites.</p>
        <ul style="margin-top: 15px; padding-left: 20px;">
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Responsive Web Design</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> E-commerce Development</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Website Maintenance</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> UX/UI Optimization</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Mobile-First Approach</li>
        </ul>`
    },
    marketing: {
        title: "Digital Marketing",
        icon: "fas fa-chart-line",
        color: "var(--accent-green)",
        content: `<p>We get results. Whether you are looking for more website traffic, more leads, more sales, more social followers, higher engagement rates, higher email open rates ... whatever your needs -- we get it done.</p>
        <ul style="margin-top: 15px; padding-left: 20px;">
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Social Media Marketing</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Search Engine Optimization (SEO)</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Pay-Per-Click Advertising</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Email Marketing</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Content Marketing</li>
        </ul>`
    },
    content: {
        title: "Content Writing",
        icon: "fas fa-pen-fancy",
        color: "var(--primary-blue)",
        content: `<p>Our writers are specialized in marketing content that can feature to gain initial interest, support the buying process & promote return visits.</p>
        <ul style="margin-top: 15px; padding-left: 20px;">
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Blog Writing</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Social Media Content</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Email Newsletter Writing</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Website Copywriting</li>
            <li><i class="fas fa-check" style="color: var(--accent-green); margin-right: 8px;"></i> Video Script Writing</li>
        </ul>`
    }
};

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalIcon = document.getElementById('modalIcon');
const modalContent = document.getElementById('modalContent');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Tile flip functionality
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', function() {
        this.classList.toggle('flipped');
        
        // For service tiles, open modal instead of flip on mobile
        if (window.innerWidth <= 768 && this.classList.contains('service-tile')) {
            const service = this.getAttribute('data-service');
            openServiceModal(service);
            this.classList.remove('flipped'); // Don't flip on mobile
        }
    });
});

// Modal functionality
function openServiceModal(service) {
    if (serviceData[service]) {
        modalTitle.textContent = serviceData[service].title;
        modalIcon.className = serviceData[service].icon;
        modalIcon.style.color = serviceData[service].color;
        modalContent.innerHTML = serviceData[service].content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Service links in footer
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const service = this.getAttribute('data-service');
        openServiceModal(service);
    });
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = parseInt(counter.innerText);
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });
}

// Intersection Observer for counters
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const business = document.getElementById('business').value;
    const service = document.getElementById('service').value;
    
    // In a real implementation, you would send this data to a server
    // For now, we'll show a success message
    alert(`Thank you, ${name} from ${business}! We've received your inquiry about ${service} services. We'll contact you within 24 hours to discuss how we can make your business visible.`);
    
    // Reset form
    this.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Input focus effects
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-blue)';
        this.nextElementSibling.style.width = '100%';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'var(--light-gray)';
            this.nextElementSibling.style.width = '0';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.97)';
    }
});

// Add floating animation to trust badges with delay
document.querySelectorAll('.badge').forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.5}s`;
});

// Add hover effect to why points
document.querySelectorAll('.why-point').forEach(point => {
    point.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.why-icon');
        icon.style.transform = 'scale(1.3) rotate(10deg)';
    });
    
    point.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.why-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Social media hover effects
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (this.querySelector('.fa-facebook')) this.style.color = '#1877F2';
        if (this.querySelector('.fa-twitter')) this.style.color = '#1DA1F2';
        if (this.querySelector('.fa-instagram')) this.style.color = '#E4405F';
        if (this.querySelector('.fa-linkedin')) this.style.color = '#0A66C2';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = '#D1D5DB';
    });
});

// Initialize animations on load
window.addEventListener('load', function() {
    // Add animation classes to elements
    document.querySelectorAll('h2').forEach((h2, index) => {
        setTimeout(() => {
            h2.classList.add('animate__animated', 'animate__fadeInDown');
        }, index * 200);
    });
});

// Set bar animation heights
document.querySelectorAll('.chart-bar').forEach((bar, index) => {
    const heights = ['70%', '90%', '85%', '95%'];
    bar.style.setProperty('--target-height', heights[index]);
});

// Metric animations
document.querySelectorAll('.metric').forEach((metric, index) => {
    setTimeout(() => {
        metric.style.animation = 'metric-pop 0.5s ease-out';
    }, index * 500);
});