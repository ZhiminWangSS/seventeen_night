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

// 往期回顾功能
function setupReviewGallery() {
    const reviewItems = document.querySelectorAll('.review-item');
    
    reviewItems.forEach(item => {
        const header = item.querySelector('.review-header');
        const gallery = item.querySelector('.review-gallery');
        const expandBtn = item.querySelector('.review-expand-btn');
        
        if (header && gallery && expandBtn) {
            header.addEventListener('click', function() {
                const isExpanded = item.classList.contains('expanded');
                
                // 关闭其他展开的项目
                reviewItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('expanded')) {
                        otherItem.classList.remove('expanded');
                        otherItem.querySelector('.review-gallery').style.display = 'none';
                    }
                });
                
                // 切换当前项目状态
                if (isExpanded) {
                    item.classList.remove('expanded');
                    gallery.style.display = 'none';
                } else {
                    item.classList.add('expanded');
                    gallery.style.display = 'block';
                }
            });
        }
        
        // 为单张图片查看器添加功能
        const reviewImage = item.querySelector('#review-image');
        const prevBtn = item.querySelector('#prev-btn');
        const nextBtn = item.querySelector('#next-btn');
        
        if (reviewImage && prevBtn && nextBtn) {
            // 图片数据数组（可以扩展为多张图片）
            const images = [
                {
                    src: './figures/snapshot/2025-12-17.png',
                    alt: '2025年12月精彩瞬间',
                    description: '2025年12月精彩瞬间'
                }
                // 可以在这里添加更多图片
                // {
                //     src: './figures/snapshot/another-photo.jpg',
                //     alt: '其他照片',
                //     description: '其他精彩瞬间'
                // }
            ];
            
            let currentImageIndex = 0;
            
            // 更新图片显示
            function updateImage() {
                const currentImage = images[currentImageIndex];
                reviewImage.src = currentImage.src;
                reviewImage.alt = currentImage.alt;
                
                const description = item.querySelector('.image-description');
                if (description) {
                    description.textContent = currentImage.description;
                }
                
                // 更新按钮状态
                prevBtn.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
                nextBtn.style.opacity = currentImageIndex === images.length - 1 ? '0.3' : '1';
                prevBtn.style.cursor = currentImageIndex === 0 ? 'not-allowed' : 'pointer';
                nextBtn.style.cursor = currentImageIndex === images.length - 1 ? 'not-allowed' : 'pointer';
            }
            
            // 上一张按钮
            prevBtn.addEventListener('click', function() {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateImage();
                }
            });
            
            // 下一张按钮
            nextBtn.addEventListener('click', function() {
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateImage();
                }
            });
            
            // 点击图片放大功能
            reviewImage.addEventListener('click', function() {
                // 使用现有的modal显示放大图片
                const modal = document.getElementById('cocktail-modal');
                const modalImage = document.getElementById('modal-image');
                const modalTitle = document.getElementById('modal-title');
                const modalDescription = document.getElementById('modal-description');
                
                if (modal && modalImage && modalTitle && modalDescription) {
                    modalImage.src = this.src;
                    modalImage.alt = this.alt;
                    modalTitle.textContent = this.alt;
                    modalDescription.textContent = images[currentImageIndex].description;
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
            
            // 初始化按钮状态
            updateImage();
        }
        
        // 保留原有的多图片网格点击放大功能（以防有其他地方还在使用）
        const galleryImages = item.querySelectorAll('.gallery-item');
        galleryImages.forEach(galleryImage => {
            galleryImage.addEventListener('click', function() {
                const img = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay span');
                if (img) {
                    // 使用现有的modal显示放大图片
                    const modal = document.getElementById('cocktail-modal');
                    const modalImage = document.getElementById('modal-image');
                    const modalTitle = document.getElementById('modal-title');
                    const modalDescription = document.getElementById('modal-description');
                    
                    if (modal && modalImage && modalTitle && modalDescription) {
                        modalImage.src = img.src;
                        modalImage.alt = img.alt;
                        modalTitle.textContent = img.alt;
                        
                        if (description && overlay) modalDescription.textContent = overlay.textContent;
                        
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        });
    });
}

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
        // description: '半颗柠檬+40ml伏特加+20ml蓝橙+雪碧或者气泡水补满'
        description: " "
    },
    'fire-cloud': {
        name: '火烧云',
        image: './figures/wines/Burning_Cloud.png',
        // description: '一瓶养乐多打底+伏特加30ml+半颗柠檬+一小勺红石榴糖浆'
        description: " "
    },
    
    // 朗姆基酒
    'orange-sea': {
        name: '橘子海',
        image: './figures/wines/OrangeSea.png',
        // description: '白朗姆20ml+蓝橙30ml shake橙汁打底+酒液'
        description: " "
    },
    'replace': {
        name: '代替',   
        image: './figures/wines/Replace.png',
        // description: '白朗姆20ml+蓝橙30ml+水溶c补到70%葡萄气泡水补满'
        description: " "
    },
    
    // 特调
    'sleeping-pill': {
        name: '安眠药',
        image: './figures/wines/SleepingPills.png',
        // description: '养乐多打底+蓝橙20ml+白朗姆20ml+伏特加20ml shake'
        description: " "
    },
    'confession': {
        name: '告白',
        image: './figures/wines/Confession.png',
        // description: '蓝橙力娇酒20ml+养乐多一瓶打底元气森林葡萄+伏特加30ml'
        description: " "
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
    
    // 威士忌基酒
    'godfather': {
        name: '教父',
        image: './figures/wines/GodFather.png',
        description: '教父'
    },
    'long-island': {
        name: '长岛冰茶',
        image: './figures/wines/Long_Island_Iced_Tea.jpg',
        description: '长岛冰茶'
    },
    'whiskey-sour': {
        name: '威士忌酸',
        image: './figures/wines/whiskey-sour.jpg',
        description: '威士忌酸'
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
    setupSubscribeForm();
    setupReviewGallery();
});

// Subscribe form functionality
function setupSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Form validation
            const nickname = document.getElementById('nickname').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!nickname || !email) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // Create form data for Google Form
            const formData = new FormData();
            formData.append('entry.517674580', nickname);
            formData.append('entry.171183705', email);
            
            // Submit to Google Form using fetch
            fetch('https://docs.google.com/forms/d/e/1FAIpQLScGEU4LiAT0A8HwvtWdfwpxqpI51gI1IkoGrAoTunFCUrsxjA/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                // Show success message
                showMessage('感谢您的订阅！我们会尽快与您联系。', 'success');
                
                // Reset form after a delay
                setTimeout(() => {
                    subscribeForm.reset();
                }, 1000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                showMessage('提交失败，请稍后再试', 'error');
            });
        });
    }
}

// Show message function
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '10px 15px';
    messageElement.style.marginTop = '15px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.textAlign = 'center';
    
    if (type === 'error') {
        messageElement.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
        messageElement.style.color = '#dc3545';
        messageElement.style.border = '1px solid rgba(220, 53, 69, 0.3)';
    } else {
        messageElement.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
        messageElement.style.color = '#28a745';
        messageElement.style.border = '1px solid rgba(40, 167, 69, 0.3)';
    }
    
    // Add message to the form
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}