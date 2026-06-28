// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Close mobile menu if open
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
          menuBtn.classList.remove('active');
          mobileMenu.classList.remove('open');
        }

        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Mobile Navbar Drawer Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
}

// Navbar styling changes on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('bg-[#030712]/95', 'shadow-xl');
    } else {
      nav.classList.remove('bg-[#030712]/95', 'shadow-xl');
    }
  }
});

// Contact Form Handler & Client-side Validation
const contactForm = document.getElementById('contact-form');
const formAlert = document.getElementById('form-alert');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && formAlert && submitBtn) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset status alert
    formAlert.className = 'hidden rounded-lg p-4 text-sm';
    formAlert.innerHTML = '';

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic Validation Check
    if (!name || !email || !subject || !message) {
      showFormAlert('Please fill in all the fields.', 'error');
      return;
    }

    // Email Pattern Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Check if Access Key is configured
    const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
    if (accessKeyInput && accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE') {
      showFormAlert('Please configure your Web3Forms Access Key in index.html to activate email delivery.', 'error');
      return;
    }

    // Disable button & show sending spinner animation
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner animate-spin text-xs"></i>`;

    // Send data to Web3Forms API
    const formData = new FormData(contactForm);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        showFormAlert('Message sent successfully! Thank you for reaching out, Ravish will get back to you shortly.', 'success');
        contactForm.reset();
      } else {
        console.log(response);
        showFormAlert(json.message || 'Something went wrong. Please try again.', 'error');
      }
    })
    .catch(error => {
      console.log(error);
      showFormAlert('Network error. Please check your internet connection and try again.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
}

// Helper function to display alerts
function showFormAlert(msg, type) {
  if (!formAlert) return;
  formAlert.classList.remove('hidden');
  
  if (type === 'error') {
    formAlert.classList.add('bg-red-500/10', 'border', 'border-red-500/20', 'text-red-400');
    formAlert.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i> ${msg}`;
  } else {
    formAlert.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/20', 'text-emerald-400');
    formAlert.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${msg}`;
    
    // Auto-dismiss success message after 5s
    setTimeout(() => {
      formAlert.classList.add('hidden');
      formAlert.className = 'hidden rounded-lg p-4 text-sm';
    }, 5000);
  }
}

// Section Scroll Reveal Fade Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.05
});

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(section);
});