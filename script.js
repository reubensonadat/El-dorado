// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex'); // Make it visible
            document.body.style.overflow = 'hidden'; // Prevent scrolling on body
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex'); // Hide it
            document.body.style.overflow = ''; // Restore scrolling on body
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = '';
            });
        });
    }


    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const messageBoxOverlay = document.getElementById('messageBoxOverlay');
    const closeMessageBoxButton = document.getElementById('closeMessageBox');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const clientName = document.getElementById('clientName').value;
            const clientPhoneNumber = document.getElementById('clientPhoneNumber').value;
            const eventDate = document.getElementById('eventDate').value;
            const eventLocation = document.getElementById('eventLocation').value;
            const otherInfo = document.getElementById('otherInfo').value;

            // WhatsApp number for El-Dorado Luxury Hiring Services
            const whatsappNumber = '233541651298'; // Ghana country code (233) + 0541651298

            // Construct the message for WhatsApp
            const message = `Hello El-Dorado Luxury Hiring Services,\n\nI would like to make an inquiry:\n\n` +
                            `Name: ${clientName}\n` +
                            `Phone Number: ${clientPhoneNumber}\n` +
                            `Date of Event: ${eventDate}\n` +
                            `Location of Event: ${eventLocation}\n` +
                            `Other Information: ${otherInfo || 'N/A'}\n\n` +
                            `Please get back to me as soon as possible. Thank you!`;

            // Encode the message for a URL
            const encodedMessage = encodeURIComponent(message);

            // Construct the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            // Show custom message box
            if (messageBoxOverlay) {
                messageBoxOverlay.classList.add('visible');
            }

            // Clear the form fields after submission
            this.reset();
        });
    }

    // --- Message Box Close Button ---
    if (closeMessageBoxButton) {
        closeMessageBoxButton.addEventListener('click', () => {
            messageBoxOverlay.classList.remove('visible');
        });
    }

    // Close message box if clicked outside (on overlay)
    if (messageBoxOverlay) {
        messageBoxOverlay.addEventListener('click', (event) => {
            if (event.target === messageBoxOverlay) {
                messageBoxOverlay.classList.remove('visible');
            }
        });
    }

    // --- Scroll Animations using Intersection Observer ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });


    // --- Image Gallery Modal ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModal');

    if (modal && modalImg && closeModalBtn) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                modalImg.src = item.src;
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Restore background scroll
        };

        closeModalBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            // Close modal if the overlay is clicked, but not the content inside
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }


    // --- FAQ Accordion ---
    const accordionItems = document.querySelectorAll('.faq-question');

    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-question.active');
            // Collapse the currently open item if it's not the one being clicked
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.setAttribute('aria-expanded', 'false');
                currentlyActive.nextElementSibling.style.maxHeight = 0;
            }

            // Toggle the clicked item
            item.classList.toggle('active');
            const answer = item.nextElementSibling;
            
            if (item.classList.contains('active')) {
                item.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = 0;
            }
        });
    });

    // --- Fuel Cost Calculator ---
    const calculateFuelBtn = document.getElementById('calculateFuelBtn');
    if (calculateFuelBtn) {
        calculateFuelBtn.addEventListener('click', () => {
            const distanceInput = document.getElementById('distanceInput');
            const fuelCostResult = document.getElementById('fuelCostResult');
            
            const distance = parseFloat(distanceInput.value);

            if (isNaN(distance) || distance <= 0) {
                fuelCostResult.textContent = 'Please enter a valid distance.';
                fuelCostResult.style.color = '#ef4444'; // Red color for error
                return;
            }

            // Constants for calculation
            const fuelEfficiency = 8.5; // Average km per liter for a 2019 Ford Transit 350
            const fuelPricePerLiter = 14.50; // Estimated price in GHS (Ghana Cedis)

            // Calculation
            const neededLiters = distance / fuelEfficiency;
            const totalCost = neededLiters * fuelPricePerLiter;

            // Display result
            fuelCostResult.style.color = '#1a73e8'; // Reset to primary color
            fuelCostResult.textContent = `Estimated Fuel Cost: GHS ${totalCost.toFixed(2)}`;
        });
    }
});
