document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply observer to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Apply observer to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(title);
    });
    
    // Add hover effect to menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (hero && heroContent) {
            hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = 1 - scrollPosition / 700;
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('.menu-section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--secondary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});

// Add a simple loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add a subtle typing effect to the hero tagline
window.addEventListener('load', function() {
    const tagline = document.querySelector('.hero-content p');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const speed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Modal functionality
const modal = document.getElementById('cocktail-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close-modal');

// Cocktail data with image URLs
const cocktailData = {
    // 伏特加基酒
    'manchester': {
        name: '海边的曼彻斯特',
        image: './figures/wines/ManchesterByTheSea.jpg',
        description: '半颗柠檬+40ml伏特加+20ml蓝橙+雪碧或者气泡水补满'
    },
    'fire-cloud': {
        name: '火烧云',
        image: './figures/wines/Burning_Cloud.png',
        description: '一瓶养乐多打底+伏特加30ml+半颗柠檬+一小勺红石榴糖浆'
    },
    
    // 朗姆基酒
    'orange-sea': {
        name: '橘子海',
        image: './figures/wines/OrangeSea.png',
        description: '白朗姆20ml+蓝橙30ml shake橙汁打底+酒液'
    },
    'replace': {
        name: '代替',   
        image: './figures/wines/Replace.png',
        description: '白朗姆20ml+蓝橙30ml+水溶c补到70%葡萄气泡水补满'
    },
    
    // 特调
    'sleeping-pill': {
        name: '安眠药',
        image: './figures/wines/SleepingPills.png',
        description: '养乐多打底+蓝橙20ml+白朗姆20ml+伏特加20ml shake'
    },
    'confession': {
        name: '告白',
        image: './figures/wines/Confession.png',
        description: '蓝橙力娇酒20ml+养乐多一瓶打底元气森林葡萄+伏特加30ml'
    },
    'dragon-fruit': {
        name: '火龙果系列',
        image: './figures/wines/DragonFruit.png',
        description: '需要预约'
    },

    'hot-wine': {
        name: '热红酒',
        image: './figures/wines/HotWine.jpg',
        description: '需要预约'
    },
    
};

// Add click event to all menu items
function setupModalEvents() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const cocktailName = this.getAttribute('data-cocktail');
            const cocktail = cocktailData[cocktailName];
            
            if (cocktail) {
                modalImage.src = cocktail.image;
                modalTitle.textContent = cocktail.name;
                modalDescription.textContent = cocktail.description;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when clicking on the close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
}

// Initialize modal events when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupModalEvents();
});