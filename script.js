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
            messageBoxOverlay.classList.add('visible');

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
});
