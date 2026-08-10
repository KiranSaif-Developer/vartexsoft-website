(function () {
  const showcaseData = {
    development: {
      label: "Development",
      image: "assets/images/image4.jpg",
      tags: ["Custom Development", "Web App Development", "Mobile App Development", "Frontend & Backend"]
    },
    wordpress: {
      label: "WordPress Development",
      image: "assets/images/image6.jpg",
      tags: ["Custom Theme Design", "Elementor & Plugin Setup", "WooCommerce Store", "Site Migration & Speed Fix"]
    },
    marketing: {
      label: "Digital Marketing",
      image: "assets/images/image7.jpg",
      tags: ["Meta & Google Ads", "Social Media Management", "Email Marketing", "Brand Strategy"]
    },
    youtube: {
      label: "YouTube Automation",
      image: "assets/images/image8.jpg",
      tags: ["Channel Setup & Branding", "Script & Niche Research", "Video Editing Pipeline", "SEO & Analytics"]
    },
    seo: {
      label: "SEO & Content",
      image: "assets/images/image5.jpg",
      tags: ["Search Engine Optimization", "Content Writing", "Technical Audits", "Keyword Research"]
    }
  };

  function initServicesShowcase() {
    const tabButtons = document.querySelectorAll(".vx-tab-btn");
    const showcaseImg = document.getElementById("vx-showcase-img");
    const showcaseTags = document.getElementById("vx-showcase-tags");
    const showcaseBadge = document.getElementById("vx-showcase-badge");

    if (!tabButtons.length || !showcaseImg) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const targetKey = btn.getAttribute("data-target");
        const currentData = showcaseData[targetKey];
        if (!currentData) return;

        showcaseImg.style.opacity = "0.3";
        showcaseTags.style.opacity = "0.3";

        setTimeout(() => {
          showcaseImg.closest(".vx-showcase__img-wrap").classList.remove("vx-showcase__img-wrap--fallback");
          showcaseImg.src = currentData.image;
          if (showcaseBadge) showcaseBadge.textContent = currentData.label;

          showcaseTags.innerHTML = currentData.tags
            .map((tag) => `<span>${tag}</span>`)
            .join("");

          showcaseImg.style.opacity = "1";
          showcaseTags.style.opacity = "1";
        }, 200);
      });
    });
  }

  // This was missing — without it, every .vx-reveal element stays invisible forever.
  function initScrollReveal() {
    const items = document.querySelectorAll(".vx-reveal");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
  }

  // Subtle 3D tilt on the Services cards, following the mouse position.
  function initServiceCardTilt() {
    const cards = document.querySelectorAll(".vx-service-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const ry = ((x - centerX) / centerX) * 6;
        const rx = ((centerY - y) / centerY) * 6;

        card.style.setProperty("--rx", `${rx}deg`);
        card.style.setProperty("--ry", `${ry}deg`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  // FAQ accordion — safe to keep even if the page has no .vx-faq-item yet.
  function initFAQ() {
    const faqItems = document.querySelectorAll(".vx-faq-item");
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const btn = item.querySelector(".vx-faq-item__q");
      const answer = item.querySelector(".vx-faq-item__a");
      if (!btn || !answer) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("vx-open");

        faqItems.forEach((other) => {
          other.classList.remove("vx-open");
          const a = other.querySelector(".vx-faq-item__a");
          if (a) a.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("vx-open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  function init() {
    initScrollReveal();
    initServicesShowcase();
    initServiceCardTilt();
    initFAQ();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const faqCards = document.querySelectorAll(".vx-faq-card");
  const tabBtns = document.querySelectorAll(".vx-tab-btn");
  const searchInput = document.getElementById("vxFaqSearch");

  // 1. Category Filter Functionality
  function filterFAQs(category) {
    faqCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      // Agar 'all' selected ho ya category match kare to show karo, warna hide karo
      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
        card.classList.remove("active"); // Hidden cards ko close kar do
      }
    });
  }

  // 2. Tab Buttons Event Listeners
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active class swap
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Search bar clear karo jab tab change ho
      if (searchInput) searchInput.value = "";

      const category = btn.getAttribute("data-category");
      filterFAQs(category);
    });
  });

  // 3. Accordion Expand/Collapse Toggle
  faqCards.forEach((card) => {
    const questionBtn = card.querySelector(".vx-faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = card.classList.contains("active");

        // Baaki sab active cards ko close karo
        faqCards.forEach((c) => c.classList.remove("active"));

        // Agar pehle se open nahi tha to open kar do
        if (!isActive) {
          card.classList.add("active");
        }
      });
    }
  });

  // 4. Live Search Filtering
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Reset tab button highlight to 'All Questions' when searching
      tabBtns.forEach((b) => b.classList.remove("active"));
      const allTab = document.querySelector('.vx-tab-btn[data-category="all"]');
      if (allTab) allTab.classList.add("active");

      faqCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
          card.classList.remove("active");
        }
      });
    });
  }
});
