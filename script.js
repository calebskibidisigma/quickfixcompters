document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize service cards and Learn More buttons
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add click handler for Learn More button
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        const serviceContent = card.querySelector('.service-content');
        const arrowIcon = learnMoreBtn.querySelector('i');

        learnMoreBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event from firing
            serviceContent.classList.toggle('hidden');
            
            // Toggle arrow rotation
            if (serviceContent.classList.contains('hidden')) {
                arrowIcon.style.transform = 'rotate(0deg)';
            } else {
                arrowIcon.style.transform = 'rotate(90deg)';
            }
        });

        // Original card click handler for cart functionality
        card.addEventListener('click', function() {
            const serviceId = this.dataset.serviceId;
            const serviceName = this.querySelector('h3').textContent;
            const servicePrice = this.querySelector('.price').textContent;
            
            // Add to cart logic
            addToCart(serviceId, serviceName, servicePrice);
        });
    });

    // FAQ Section functionality
    console.log('Initializing FAQ section...');
    const faqContainer = document.querySelector('.glassmorphism.rounded-xl.divide-y');
    console.log('FAQ container found:', faqContainer);

    if (faqContainer) {
        const faqItems = faqContainer.querySelectorAll('div.p-6');
        console.log('Number of FAQ items found:', faqItems.length);

        faqItems.forEach((item, index) => {
            console.log(`Setting up FAQ item ${index + 1}`);
            const button = item.querySelector('button');
            const content = item.querySelector('div.mt-3');
            const icon = button.querySelector('i');

            console.log('Button found:', button);
            console.log('Content found:', content);
            console.log('Icon found:', icon);

            if (button && content && icon) {
                button.addEventListener('click', () => {
                    console.log(`FAQ item ${index + 1} clicked`);
                    
                    // Close all other FAQ items
                    faqItems.forEach((otherItem, otherIndex) => {
                        if (otherItem !== item) {
                            const otherContent = otherItem.querySelector('div.mt-3');
                            const otherIcon = otherItem.querySelector('i');
                            if (otherContent && otherIcon) {
                                otherContent.classList.add('hidden');
                                otherIcon.classList.remove('ri-subtract-line');
                                otherIcon.classList.add('ri-add-line');
                            }
                        }
                    });

                    // Toggle current item
                    content.classList.toggle('hidden');
                    console.log('Content visibility toggled. Hidden:', content.classList.contains('hidden'));
                    
                    // Toggle icon
                    if (content.classList.contains('hidden')) {
                        icon.classList.remove('ri-subtract-line');
                        icon.classList.add('ri-add-line');
                    } else {
                        icon.classList.remove('ri-add-line');
                        icon.classList.add('ri-subtract-line');
                    }
                });
            }
        });
    }

    // Cart functionality
    const cart = [];
    
    function addToCart(id, name, price) {
        cart.push({ id, name, price });
        updateCartUI();
    }

    function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center py-2';
            li.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartItems.appendChild(li);
            total += parseFloat(item.price.replace('$', ''));
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}); 