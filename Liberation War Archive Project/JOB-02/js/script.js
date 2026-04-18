// script.js

// Function to toggle mobile navigation [cite: 213]
function toggleNav() {
    const nav = document.querySelector('.nav-links');
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

// Ensure clean code by checking for scroll events [cite: 181]
window.onscroll = function () {
    const navbar = document.getElementById("mainNav");
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    } else {
        navbar.style.boxShadow = "none";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    // Target all featured cards for the scroll animation
    const scrollElements = document.querySelectorAll('.animate-scroll');
    scrollElements.forEach(el => observer.observe(el));
});
// script.js
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Apply to all cards with the scroll-reveal class
    const targets = document.querySelectorAll(".scroll-reveal");
    targets.forEach(target => observer.observe(target));
});
document.addEventListener("DOMContentLoaded", function () {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modalImg = document.getElementById("modalImg");
    const zoomModal = new bootstrap.Modal(document.getElementById('zoomModal'));

    // 1. Category Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Update button styles
            filterBtns.forEach(b => b.classList.remove("active", "btn-success"));
            this.classList.add("active", "btn-success");

            const filterValue = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                    setTimeout(() => item.style.opacity = "1", 10);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 400);
                }
            });
        });
    });

    // 2. Zoom Functionality
    document.querySelectorAll(".zoom-trigger").forEach(trigger => {
        trigger.addEventListener("click", function () {
            const imgSrc = this.closest(".img-container").querySelector("img").src;
            modalImg.src = imgSrc;
            zoomModal.show();
        });
    });
});
// Function to handle the reveal animation on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150; // Distance from bottom of screen to trigger

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        } else {
            // Optional: remove if you want it to fade out when scrolling back up
            // element.classList.remove("active");
        }
    });
}

// Listen for scroll events
window.addEventListener("scroll", revealOnScroll);

// Initial check when page loads
window.addEventListener("load", () => {
    revealOnScroll();
    console.log("Archive interface initialized.");
});

// Smooth scroll for nav links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/**
 * Liberation War Archive - Interactive Script
 * Standards: Clean code, ES6+ Syntax
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Run on load

    // 2. Form Submission Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // In a real application, you would use Fetch API to send data to a server
            alert('Thank you for your contribution. The administrators have been notified.');
            contactForm.reset();
        });
    }

    // 3. Smooth Scrolling for Navigation
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
});
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and add to clicked
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.fighter-card');

        cards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const typeFilter = document.getElementById('typeFilter');
    const dateFilter = document.getElementById('dateFilter');
    const items = document.querySelectorAll('.doc-item');

    // Filtering Logic
    function applyFilters() {
        const type = typeFilter.value;
        const date = dateFilter.value;

        items.forEach(item => {
            const matchesType = type === 'all' || item.getAttribute('data-type') === type;
            const matchesDate = date === 'all' || item.getAttribute('data-date') === date;

            if (matchesType && matchesDate) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    typeFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);

    // Modal Population Logic
    const docModal = document.getElementById('docModal');
    docModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;

        // Extract data from button attributes
        const title = button.getAttribute('data-title');
        const source = button.getAttribute('data-source');
        const desc = button.getAttribute('data-desc');

        // Update modal content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalSource').textContent = source;
        document.getElementById('modalDesc').textContent = desc;
    });
});


// 1. Filtering Logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // UI Update
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('btn-danger', 'active'));
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.add('btn-outline-light'));
        button.classList.add('btn-danger', 'active');
        button.classList.remove('btn-outline-light');

        const filterValue = button.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// 2. Lightbox Initialization (Zoom & High Res Display)
// Note: You must include the GLightbox JS/CSS via CDN for this to work.
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    zoomable: true
});

// Display file name after selection
const fileInput = document.getElementById('fileUpload');
const fileNameDisplay = document.getElementById('fileName');

fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        const names = Array.from(this.files).map(file => file.name).join(', ');
        fileNameDisplay.textContent = names;
        fileNameDisplay.classList.remove('text-muted');
        fileNameDisplay.classList.add('text-danger', 'fw-bold');
    } else {
        fileNameDisplay.textContent = "No file chosen";
    }
});

// Simple Form Submission Logic
document.getElementById('contributionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // In a real full-stack app, you would use Fetch/Axios to send data to your server
    alert('Thank you for your contribution! Our administrators will review your submission and contact you soon.');
    this.reset();
    fileNameDisplay.textContent = "No file chosen";
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill all required fields.");
        return;
    }

    // Simple email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter a valid email.");
        return;
    }

    // Show success message
    let alertBox = document.getElementById("successAlert");
    alertBox.classList.remove("d-none");

    // Reset form
    document.getElementById("contactForm").reset();

    // Hide alert after 3 seconds
    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 3000);
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill all fields");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
        alert("Invalid email");
        return;
    }

    let alertBox = document.getElementById("successAlert");
    alertBox.classList.remove("d-none");

    document.getElementById("contactForm").reset();

    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 3000);
});
// Mobile menu toggle
document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("navLinks").classList.toggle("active");
});

// Add shadow on scroll
window.addEventListener("scroll", function () { 
    const navbar = document.querySelector(".custom-navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});
document.getElementById("contactForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (name && email && subject && message) {

        alert("Message sent successfully!");

        document.getElementById("contactForm").reset();

    }

});