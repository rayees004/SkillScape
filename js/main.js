/**
 * SKILLSCAPE Phase 1 - Master Interactive Engine
 * Handles Navigation, Modals, WhatsApp Dynamic Messages,
 * Brochure Requests, Course Filtering, and Interactive State.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initModals();
  initCourseFiltering();
  initAccordions();
  initBrochureModal();
  initContactForms();
});

// WhatsApp Phone Number from Brief
const SKILLSCAPE_PHONE = '916238683077';

/**
 * 1. Sticky Header with blur and shadow on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-close-btn');

  if (!hamburger || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * 3. Fade-in on Scroll Observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback
    elements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * 4. Course Enquiry Modal Handling
 */
function initModals() {
  const modalBackdrop = document.getElementById('enquiryModal');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const courseInput = modalBackdrop.querySelector('#enquiryCourseName');
  const courseDisplay = modalBackdrop.querySelector('#enquiryCourseDisplay');
  const enquiryForm = modalBackdrop.querySelector('#modalEnquiryForm');

  // Trigger enquiry buttons across pages
  document.querySelectorAll('[data-enquire-course]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-enquire-course') || 'General Enquiry';
      if (courseInput) courseInput.value = courseName;
      if (courseDisplay) courseDisplay.textContent = courseName;
      openModal(modalBackdrop);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modalBackdrop));
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal(modalBackdrop);
  });

  // Handle Enquiry Form Submit
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = enquiryForm.querySelector('#enqName').value.trim();
      const email = enquiryForm.querySelector('#enqEmail').value.trim();
      const phone = enquiryForm.querySelector('#enqPhone').value.trim();
      const course = courseInput ? courseInput.value : 'General Enquiry';
      const message = enquiryForm.querySelector('#enqMessage') ? enquiryForm.querySelector('#enqMessage').value.trim() : '';

      if (!name || !phone) {
        showToast('Please fill in your name and phone number.', 'error');
        return;
      }

      // Generate WhatsApp Direct link as well
      const whatsappMsg = `Hello SKILLSCAPE, I would like to enquire about: *${course}*.\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${message}`;
      const waUrl = `https://wa.me/${SKILLSCAPE_PHONE}?text=${encodeURIComponent(whatsappMsg)}`;

      closeModal(modalBackdrop);
      enquiryForm.reset();
      showToast(`Thank you ${name}! Your enquiry for "${course}" has been submitted. Opening WhatsApp...`, 'success');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);
    });
  }
}

/**
 * 5. Brochure Request Modal (Section 6 & 8 Requirement)
 * "Add a request for brochure option for each course – Phone No: and Email ID will be collected
 * from website and brochure will be shared to them via WhatsApp."
 */
function initBrochureModal() {
  const brochureModal = document.getElementById('brochureModal');
  if (!brochureModal) return;

  const closeBtn = brochureModal.querySelector('.modal-close-btn');
  const courseInput = brochureModal.querySelector('#brochureCourseName');
  const courseDisplay = brochureModal.querySelector('#brochureCourseDisplay');
  const brochureForm = brochureModal.querySelector('#brochureForm');

  document.querySelectorAll('[data-brochure-course]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-brochure-course') || 'Comprehensive Syllabus';
      if (courseInput) courseInput.value = courseName;
      if (courseDisplay) courseDisplay.textContent = courseName;
      openModal(brochureModal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(brochureModal));
  }

  brochureModal.addEventListener('click', (e) => {
    if (e.target === brochureModal) closeModal(brochureModal);
  });

  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = brochureForm.querySelector('#brochurePhone').value.trim();
      const email = brochureForm.querySelector('#brochureEmail').value.trim();
      const course = courseInput ? courseInput.value : 'Course Syllabus';

      if (!phone || !email) {
        showToast('Please enter both your Phone No and Email ID.', 'error');
        return;
      }

      closeModal(brochureModal);
      brochureForm.reset();

      const waMsg = `Hello SKILLSCAPE, please send the official curriculum brochure for *${course}* to my WhatsApp: ${phone} (Email: ${email}).`;
      const waUrl = `https://wa.me/${SKILLSCAPE_PHONE}?text=${encodeURIComponent(waMsg)}`;

      showToast(`Brochure request received! Sending ${course} syllabus to WhatsApp (${phone})...`, 'success');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1200);
    });
  }
}

/**
 * 6. Course Filtering on courses.html
 */
function initCourseFiltering() {
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const courseCards = document.querySelectorAll('.course-filter-card');
  const searchInput = document.getElementById('courseSearchInput');
  const courseCountDisplay = document.getElementById('visibleCoursesCount');

  if (!filterButtons.length || !courseCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;

    courseCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.course-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.course-desc')?.textContent || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (courseCountDisplay) {
      courseCountDisplay.textContent = visibleCount;
    }
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/**
 * 7. Accordion Toggle
 */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const content = header.nextElementSibling;
      const isOpen = parent.classList.contains('active');

      // Close siblings if in an accordion group
      const group = parent.parentElement;
      if (group && group.classList.contains('accordion-group')) {
        group.querySelectorAll('.accordion-item').forEach(item => {
          item.classList.remove('active');
          const c = item.querySelector('.accordion-content');
          if (c) c.style.maxHeight = null;
        });
      }

      if (!isOpen) {
        parent.classList.add('active');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        parent.classList.remove('active');
        if (content) content.style.maxHeight = null;
      }
    });
  });
}

/**
 * 8. Contact Form on contact.html & for-organizations.html
 */
function initContactForms() {
  const mainContactForm = document.getElementById('mainContactForm');
  if (!mainContactForm) return;

  // Check URL query parameters for pre-selected options
  const urlParams = new URLSearchParams(window.location.search);
  const purposeParam = urlParams.get('purpose');
  const courseParam = urlParams.get('course');

  const purposeSelect = mainContactForm.querySelector('#contactPurpose');
  const messageArea = mainContactForm.querySelector('#contactMessage');

  if (purposeParam && purposeSelect) {
    for (let i = 0; i < purposeSelect.options.length; i++) {
      if (purposeSelect.options[i].value.toLowerCase().includes(purposeParam.toLowerCase())) {
        purposeSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (courseParam && messageArea) {
    messageArea.value = `Enquiring specifically about: ${courseParam}\n`;
  }

  mainContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = mainContactForm.querySelector('#contactName').value.trim();
    const email = mainContactForm.querySelector('#contactEmail').value.trim();
    const phone = mainContactForm.querySelector('#contactPhone').value.trim();
    const purpose = purposeSelect ? purposeSelect.value : 'General Enquiry';
    const message = messageArea ? messageArea.value.trim() : '';

    if (!name || !phone || !email) {
      showToast('Please fill in your name, email, and phone number.', 'error');
      return;
    }

    const waMsg = `Hello SKILLSCAPE,\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLooking For: ${purpose}\nMessage: ${message}`;
    const waUrl = `https://wa.me/${SKILLSCAPE_PHONE}?text=${encodeURIComponent(waMsg)}`;

    showToast(`Thank you ${name}! Connecting your enquiry with SKILLSCAPE team...`, 'success');
    mainContactForm.reset();

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  });
}

/**
 * Modal Helper Functions
 */
function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18D9C5" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A6D9" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
