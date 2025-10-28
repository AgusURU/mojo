// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(20, 20, 20, 0.98)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
    }
});

// Menu Category Toggle
document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-items');

    categories.forEach(category => {
        category.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all categories and menu items
            categories.forEach(cat => cat.classList.remove('active'));
            menuItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked category and corresponding menu items
            this.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
        });
    });
});

// Gallery Lightbox Effect (Simple)
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            `;
            
            const content = lightbox.querySelector('.lightbox-content');
            content.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const img = lightbox.querySelector('img');
            img.style.cssText = `
                width: 100%;
                height: auto;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: -40px;
                background: #D4A574;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Add CSS for animations
            if (!document.querySelector('#lightbox-styles')) {
                const style = document.createElement('style');
                style.id = 'lightbox-styles';
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Reservation Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.nombre || !data.telefono || !data.fecha || !data.hora || !data.personas) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Date validation
        const selectedDate = new Date(data.fecha);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Por favor, selecciona una fecha futura.');
            return;
        }
        
        // Show success message
        showReservationSuccess(data);
        
        // Reset form
        form.reset();
    });
    
    // Set minimum date to today
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
});

function showReservationSuccess(data) {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'reservation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h3>¡Reserva Enviada!</h3>
            </div>
            <div class="modal-body">
                <p>Gracias <strong>${data.nombre}</strong>, hemos recibido tu solicitud de reserva:</p>
                <ul>
                    <li><strong>Fecha:</strong> ${formatDate(data.fecha)}</li>
                    <li><strong>Hora:</strong> ${data.hora}</li>
                    <li><strong>Personas:</strong> ${data.personas}</li>
                    <li><strong>Teléfono:</strong> ${data.telefono}</li>
                </ul>
                <p>Nos pondremos en contacto contigo para confirmar la reserva.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        margin-bottom: 1.5rem;
    `;
    
    const icon = modal.querySelector('.fas');
    icon.style.cssText = `
        color: #D4A574;
        font-size: 3rem;
        margin-bottom: 1rem;
    `;
    
    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        margin-bottom: 2rem;
        text-align: left;
    `;
    
    const list = modal.querySelector('ul');
    list.style.cssText = `
        margin: 1rem 0;
        padding-left: 1rem;
    `;
    
    document.body.appendChild(modal);
    
    // Global close function
    window.closeModal = function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('es-ES', options);
}

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.menu-item, .gallery-item, .feature, .info-item').forEach(el => {
        observer.observe(el);
    });
});

// Contact Methods Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp click handler
    const whatsappLink = document.querySelector('a[href*="wa.me"]');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
            const message = encodeURIComponent('Hola! Me gustaría hacer una reserva en Parillada MOJO.');
            this.href = `https://wa.me/59899123456?text=${message}`;
        });
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 4) {
                    value = value;
                } else if (value.length <= 8) {
                    value = value.substring(0, 4) + '-' + value.substring(4);
                } else {
                    value = value.substring(0, 4) + '-' + value.substring(4, 8) + '-' + value.substring(8, 12);
                }
            }
            e.target.value = value;
        });
    });
});

// Loading Animation for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Easter Egg: Console Message
console.log(`
🥩 ¡Bienvenido a Parillada MOJO! 🥩
═══════════════════════════════════
Desarrollado con ❤️ para la mejor parrilla de Ciudad Vieja.
¿Te gusta nuestro sitio? ¡Ven a probar nuestras carnes!

📍 Ciudad Vieja, Montevideo, Uruguay
📞 +598 99 123 456
🕐 Lunes a Domingo: 19:00 - 01:00
`);