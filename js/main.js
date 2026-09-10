/**
 * MD. ABU SUFIAN SOBUJ - PORTFOLIO INTERACTIVITY
 * 100% Functional Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initServicesLinks();
  initProjectsFilter();
  initProjectModal();
  initEstimator();
  initProposalCopy();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Navbar & Active Link Tracking
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Services to Estimator Interactive Connector
   ========================================================================== */
function initServicesLinks() {
  const serviceLinks = document.querySelectorAll('[data-service-calc]');
  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-service-calc');
      const radio = document.querySelector(`input[name="project_type"][value="${target}"]`);
      if (radio) {
        radio.checked = true;
        const form = document.getElementById('estimatorForm');
        if (form) form.dispatchEvent(new Event('change'));
      }
      document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   4. Portfolio Projects Filter
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Details Modal
   ========================================================================== */
const projectData = {
  saas: {
    title: "CloudScale - Enterprise SaaS Analytics Platform",
    category: "Web Application / SaaS",
    image: "assets/images/project-saas.svg",
    description: "A comprehensive multi-tenant analytics dashboard designed for high-throughput enterprise SaaS. Features real-time metric streams, customizable widgets, automated PDF reports, and role-based permissions.",
    features: [
      "Multi-tenant data isolation with PostgreSQL schemas",
      "Real-time event streaming via WebSockets and Redis pub/sub",
      "Interactive data visualization charts using Chart.js / D3",
      "Automated PDF report generation and scheduling",
      "Role-based access control (Admin, Manager, Analyst, Viewer)"
    ],
    tech: ["React.js", "Node.js", "Express", "PostgreSQL", "Redis", "Docker", "TailwindCSS"]
  },
  ecommerce: {
    title: "ApexMart - Headless E-Commerce & Global Checkout",
    category: "E-Commerce",
    image: "assets/images/project-ecommerce.svg",
    description: "A high-performance modern e-commerce storefront engineered for ultra-fast load times and seamless global checkout. Features multi-currency pricing, inventory sync, and Stripe + PayPal payment flows.",
    features: [
      "Headless architecture with sub-second page transition speeds",
      "Multi-currency conversion with real-time exchange rates",
      "Automated inventory management and stock alerts",
      "Custom checkout funnel with abandoned cart email recovery",
      "Admin order dispatch and tracking portal"
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Stripe API", "MongoDB", "Tailwind CSS"]
  },
  crm: {
    title: "OmniCore - Custom Enterprise Resource Planning & CRM",
    category: "Custom Software",
    image: "assets/images/project-crm.svg",
    description: "A tailor-made business management suite unifying lead pipelines, sales workflows, invoicing, and client records into a streamlined operational hub.",
    features: [
      "Interactive drag-and-drop Kanban pipeline for lead tracking",
      "Automated recurring invoicing and tax calculation",
      "Granular team access permissions and audit log",
      "Email & SMS notifications triggered by deal milestones",
      "RESTful API for syncing data with 3rd-party logistics & accounting"
    ],
    tech: ["Python / Django", "React", "PostgreSQL", "Celery", "Redis", "Docker"]
  },
  fintech: {
    title: "VaultPay - Multi-Currency Payment Gateway & Webhook Hub",
    category: "API & Integration",
    image: "assets/images/project-fintech.svg",
    description: "A resilient financial middleware connecting businesses to payment providers, escrow settlements, automated payouts, and accounting tools with 99.99% uptime.",
    features: [
      "Seamless integration with Stripe Connect, PayPal, and local bank APIs",
      "Zero-downtime webhook ingestion engine with BullMQ retry queues",
      "AES-256 encrypted payload storage and cryptographic signing",
      "Automated reconciliations and PDF financial ledger generation",
      "Sandbox testing environment with mock transaction triggers"
    ],
    tech: ["Node.js", "TypeScript", "Redis", "PostgreSQL", "Stripe API", "AWS Lambda"]
  },
  healthcare: {
    title: "MedSync Pro - Clinic Management & Telehealth Portal",
    category: "Web Application",
    image: "assets/images/project-healthcare.svg",
    description: "A secure clinic portal facilitating patient scheduling, doctor appointment management, encrypted electronic health records (EHR), and telehealth video consults.",
    features: [
      "Doctor schedule synchronization and patient calendar booking",
      "HIPAA-compliant encrypted medical record storage",
      "Integrated WebRTC video conferencing for remote doctor consultations",
      "Automated SMS/WhatsApp appointment reminders",
      "Prescription generation with PDF download & pharmacy routing"
    ],
    tech: ["React.js", "Node.js", "WebRTC", "PostgreSQL", "Socket.io", "AWS S3"]
  },
  logistics: {
    title: "FleetTrack - Real-Time Logistics & Dispatch Platform",
    category: "Custom Software",
    image: "assets/images/project-logistics.svg",
    description: "An IoT-enabled dispatch suite designed for logistics operators. Tracks vehicle telematics, plans optimal fuel-efficient routes, and manages delivery confirmations.",
    features: [
      "Live GPS tracking with Mapbox GL vector map rendering",
      "Automated turn-by-turn route optimization algorithm",
      "Geofencing triggers and automated arrival notifications",
      "Driver mobile web dashboard for instant delivery sign-offs",
      "Exportable telematics reports for fuel and speed compliance"
    ],
    tech: ["Vue.js", "Python / FastAPI", "PostGIS", "WebSockets", "Mapbox GL"]
  },
  mobileapp: {
    title: "TaskPulse - Cross-Platform Mobile & Desktop Productivity Suite",
    category: "Mobile & Cross-Platform App",
    image: "assets/images/project-mobile-app.svg",
    description: "A production-grade cross-platform application empowering distributed teams with offline-first synchronization, push notifications, and ultra-fast desktop and mobile native performance.",
    features: [
      "Native mobile experience for iOS & Android built with Flutter & Dart",
      "Lightweight, secure cross-platform desktop client built with Tauri (macOS, Windows, Linux)",
      "Offline SQLite cache with automated background cloud sync",
      "Real-time event streaming and push notifications via WebSockets & FCM",
      "Robust enterprise REST/GraphQL backend engineered with NestJS and PostgreSQL"
    ],
    tech: ["Flutter", "Dart", "Tauri", "NestJS", "TypeScript", "PostgreSQL", "SQLite"]
  },
  automation: {
    title: "AutoFlow - n8n Enterprise Workflow Automation & Webhook Hub",
    category: "Workflow Automation & API",
    image: "assets/images/project-automation.svg",
    description: "An automated workflow orchestration engine connecting CRM systems, payment gateways, messaging tools, and internal databases with zero manual data entry.",
    features: [
      "Complex multi-branch workflow orchestration powered by self-hosted n8n",
      "Automated lead enrichment, deal assignment, and CRM synchronization",
      "Real-time payment webhook processing (Stripe & PayPal) with error retry loops",
      "Automated WhatsApp & Email notifications triggered by customer lifecycle events",
      "Custom NestJS microservices handling cryptographic signature verification"
    ],
    tech: ["n8n", "NestJS", "Node.js", "TypeScript", "Stripe API", "WhatsApp API", "Redis"]
  }
};

function initProjectModal() {
  const modal = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close-btn');
  const detailBtns = document.querySelectorAll('[data-project-key]');

  if (!modal) return;

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalDesc').textContent = data.description;
    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalImg').alt = data.title;

    // Features list
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${feat}</span>`;
      featuresContainer.appendChild(li);
    });

    // Tech chips
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-chip';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    // Action buttons
    const inquireBtn = document.getElementById('modalInquireBtn');
    const modalWaBtn = document.getElementById('modalWaBtn');

    if (inquireBtn) {
      inquireBtn.onclick = () => {
        closeModal();
        const msgField = document.getElementById('contactMessage');
        if (msgField) {
          msgField.value = `Hello Md. Abu Sufian Sobuj, I saw your "${data.title}" project on your portfolio and would like to build a custom solution for my business.`;
        }
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      };
    }

    if (modalWaBtn) {
      const waText = encodeURIComponent(`Hello Md. Abu Sufian Sobuj, I saw your "${data.title}" project on your portfolio and would like to discuss building something similar.`);
      modalWaBtn.href = `https://wa.me/8801540107844?text=${waText}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      openProjectModal(key);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Interactive Project Estimator
   ========================================================================== */
function initEstimator() {
  const estimatorForm = document.getElementById('estimatorForm');
  if (!estimatorForm) return;

  const basePrices = {
    website: { min: 250, max: 450, time: "3 - 5 days" },
    webapp: { min: 650, max: 1200, time: "2 - 3 weeks" },
    mobileapp: { min: 800, max: 1600, time: "3 - 4 weeks" },
    software: { min: 950, max: 1800, time: "3 - 5 weeks" },
    ecommerce: { min: 450, max: 850, time: "1 - 2 weeks" },
    automation: { min: 350, max: 750, time: "1 - 2 weeks" },
    optimization: { min: 180, max: 350, time: "2 - 4 days" }
  };

  const featureCosts = {
    auth: 120,
    payment: 180,
    admin: 220,
    api: 150,
    crossplatform: 250,
    n8n: 180,
    nestjs: 200,
    support: 100
  };

  function calculateEstimate() {
    const selectedType = estimatorForm.querySelector('input[name="project_type"]:checked')?.value || 'website';
    const selectedSpeed = estimatorForm.querySelector('input[name="speed"]:checked')?.value || 'standard';

    let base = basePrices[selectedType] || basePrices.website;
    let minCost = base.min;
    let maxCost = base.max;
    let timeline = base.time;

    const checkedFeatures = estimatorForm.querySelectorAll('input[name="features"]:checked');
    checkedFeatures.forEach(box => {
      const cost = featureCosts[box.value] || 0;
      minCost += cost;
      maxCost += cost;
    });

    if (selectedSpeed === 'express') {
      minCost = Math.round(minCost * 1.25);
      maxCost = Math.round(maxCost * 1.25);
      timeline = "⚡ Rush Delivery (Priority Sprint)";
    }

    const priceDisplay = document.getElementById('calcPriceDisplay');
    const timelineDisplay = document.getElementById('calcTimelineDisplay');
    const typeSummary = document.getElementById('calcTypeSummary');
    const featuresCount = document.getElementById('calcFeaturesCount');

    if (priceDisplay) priceDisplay.textContent = `$${minCost} - $${maxCost}`;
    if (timelineDisplay) timelineDisplay.innerHTML = `⏱️ Estimated Delivery: <strong>${timeline}</strong>`;
    if (typeSummary) {
      const typeLabels = {
        website: "Website Development",
        webapp: "Web Application / Portal",
        mobileapp: "Mobile & Cross-Platform App (Flutter / Tauri)",
        software: "Custom Software / ERP",
        ecommerce: "E-Commerce Platform",
        automation: "n8n Workflow Automation & NestJS API",
        optimization: "Bug Fixing & Speed Tuning"
      };
      typeSummary.textContent = typeLabels[selectedType] || "Custom Project";
    }
    if (featuresCount) {
      featuresCount.textContent = `${checkedFeatures.length} Add-ons Selected`;
    }

    return { selectedType, minCost, maxCost, timeline, checkedFeatures };
  }

  estimatorForm.addEventListener('change', calculateEstimate);
  calculateEstimate();

  const estimatorWaBtn = document.getElementById('estimatorWaBtn');
  if (estimatorWaBtn) {
    estimatorWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const est = calculateEstimate();
      const typeNames = {
        website: "Website Development",
        webapp: "Web Application",
        mobileapp: "Mobile & Cross-Platform App (Flutter/Tauri)",
        software: "Custom Software",
        ecommerce: "E-Commerce",
        automation: "Workflow Automation (n8n/NestJS)",
        optimization: "Bug Fixing / Speed"
      };

      const phone = "8801540107844";
      const text = encodeURIComponent(
        `Hello Md. Abu Sufian Sobuj,\n\n` +
        `I would like to discuss a project:\n` +
        `• Service: ${typeNames[est.selectedType] || est.selectedType}\n` +
        `• Estimated Budget: $${est.minCost} - $${est.maxCost}\n` +
        `• Timeline: ${est.timeline}\n\n` +
        `Could we discuss the requirements and milestones?`
      );

      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      showToast("Opening WhatsApp with your project summary!");
    });
  }

  const estimatorFormBtn = document.getElementById('estimatorFormBtn');
  if (estimatorFormBtn) {
    estimatorFormBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const est = calculateEstimate();
      const serviceSelect = document.getElementById('serviceSelect');
      const messageField = document.getElementById('contactMessage');
      const budgetField = document.getElementById('contactBudget');

      if (serviceSelect) {
        serviceSelect.value = est.selectedType;
      }
      if (budgetField) {
        budgetField.value = `$${est.minCost} - $${est.maxCost}`;
      }
      if (messageField) {
        messageField.value = `Hi Sobuj, I need help building a ${serviceSelect?.options[serviceSelect.selectedIndex]?.text || 'project'}. Our targeted timeline is ${est.timeline}. Let's discuss details!`;
      }

      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      showToast("Project estimator details applied to the contact form!");
    });
  }
}

/* ==========================================================================
   7. Proposal Pitch Copy Function
   ========================================================================== */
function initProposalCopy() {
  const copyBtn = document.getElementById('copyProposalBtn');
  if (!copyBtn) return;

  const proposalText = 
`Hello [Name],

Do you need a reliable team to build a website, web application, or custom software for your business?

*We can help.*

We are a dedicated team of developers specializing in building and improving digital solutions for businesses. Whether you need a new website, a custom web application, a business management system, or technical support for an existing platform, our team can handle it.

*What we can help you with:*
* Website & Web Application Development
* Mobile & Cross-Platform App Development (Flutter, Dart & Tauri)
* Custom Software & Enterprise ERP/CRM Systems
* Enterprise Backend & Microservices (NestJS)
* Workflow Automation & Third-Party API Integration (n8n)
* E-commerce & Business Websites
* Bug Fixing & Performance Optimization
* Website & App Maintenance & Technical Support

Our approach is simple: understand your requirements, build the right solution, and provide reliable support when you need it.

If you have a project in mind—or even an idea that you would like to turn into a working platform—just reply to this email. We’d be happy to discuss it with you.

Best regards,
Md. Abu Sufian Sobuj
Development Team Lead
Email: mdsobuj6926231@gmail.com
WhatsApp / Phone: +880 1540-107844
Facebook: https://www.facebook.com/mdsobuj6926231
Instagram: https://www.instagram.com/sobuj5789?stkn=MWNwOW9yZjNwd2xscw==`;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(proposalText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = proposalText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast("✓ Proposal pitch copied to clipboard!");
    } catch (err) {
      showToast("Proposal text copied!");
    }
  });
}

/* ==========================================================================
   8. Fully Functional Contact Form with Live AJAX Delivery
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const directWaBtn = document.getElementById('directWaBtn');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const btnText = document.getElementById('contactSubmitText');
  const btnSpinner = document.getElementById('contactSubmitSpinner');
  const btnIcon = document.getElementById('contactSubmitIcon');
  const alertBox = document.getElementById('formAlertBox');

  // Direct WhatsApp Button Handler
  if (directWaBtn) {
    directWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = "8801540107844";
      const name = document.getElementById('contactName')?.value.trim() || '';
      const service = document.getElementById('serviceSelect')?.options[document.getElementById('serviceSelect')?.selectedIndex]?.text || 'Project';
      const msg = document.getElementById('contactMessage')?.value.trim() || '';
      
      let defaultMsg = `Hello Md. Abu Sufian Sobuj, I visited your portfolio and would like to discuss a project.`;
      if (name || msg) {
        defaultMsg = `Hello Md. Abu Sufian Sobuj,\nMy Name: ${name || 'Client'}\nService: ${service}\nMessage: ${msg}`;
      }
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
      showToast("Opening WhatsApp chat...");
    });
  }

  // Live AJAX Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const service = document.getElementById('serviceSelect')?.options[document.getElementById('serviceSelect')?.selectedIndex]?.text || '';
      const budget = document.getElementById('contactBudget')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
          alertBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
          alertBox.style.color = '#fca5a5';
          alertBox.textContent = 'Please fill in all required fields (Name, Email, and Message).';
        }
        showToast("Please fill in all required fields.");
        return;
      }

      // UI Loading State
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnIcon) btnIcon.style.display = 'none';
      if (btnSpinner) btnSpinner.style.display = 'inline';

      try {
        const response = await fetch('https://formsubmit.co/ajax/mdsobuj6926231@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            service: service,
            budget: budget || 'Not specified',
            message: message,
            _subject: `New Project Inquiry from ${name} (${service})`
          })
        });

        const result = await response.json();

        if (response.ok || result.success === "true" || result.success === true) {
          if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
            alertBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            alertBox.style.color = '#6ee7b7';
            alertBox.innerHTML = `<strong>✓ Thank you, ${name}!</strong> Your message has been sent directly to Md. Abu Sufian Sobuj. We will get back to you shortly at <em>${email}</em>.`;
          }
          showToast("✓ Message delivered successfully!");
          form.reset();
        } else {
          throw new Error("FormSubmit response not ok");
        }
      } catch (err) {
        // Fallback to mailto so message is never lost
        const subject = encodeURIComponent(`Project Inquiry: ${service} from ${name}`);
        const body = encodeURIComponent(
          `Hi Md. Abu Sufian Sobuj,\n\nName: ${name}\nEmail: ${email}\nService Needed: ${service}\nBudget Range: ${budget || 'Not specified'}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:mdsobuj6926231@gmail.com?subject=${subject}&body=${body}`;
        
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.style.background = 'rgba(6, 182, 212, 0.15)';
          alertBox.style.border = '1px solid rgba(6, 182, 212, 0.4)';
          alertBox.style.color = '#7dd3fc';
          alertBox.innerHTML = `Opened your email client with your message prepared. You can also chat directly on WhatsApp!`;
        }
        showToast("Opening email client fallback...");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnIcon) btnIcon.style.display = 'inline';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
