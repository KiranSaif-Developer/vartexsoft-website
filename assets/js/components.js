/* ==========================================================================
   VartexSoft — Shared Components (Navbar + Footer)
   Edit ONCE here — every page that includes this file updates automatically.
   Usage: put <div id="vx-navbar"></div> and <div id="vx-footer"></div>
   in the page, then load this script before closing </body>.
   ========================================================================== */

(function () {
  // data-root values: (none) = root page (index.html)
  //   "sub"    = one level deep, e.g. pages/services.html, pages/about.html
  //   "nested" = two levels deep, e.g. pages/services/web-development.html
  const rootAttr = document.body.getAttribute("data-root");
  const ROOT = rootAttr === "nested" ? "../.." : rootAttr === "sub" ? ".." : ".";

  const NAV_LINKS = [
    { label: "Home", href: `${ROOT}/index.html` },
    { label: "Services", href: `${ROOT}/pages/services.html` },
    { label: "Courses", href: `${ROOT}/pages/courses.html` },
    { label: "About Us", href: `${ROOT}/pages/about.html` },
    { label: "Blogs", href: `${ROOT}/pages/blog.html` },
    { label: "Team", href: `${ROOT}/pages/team.html` },
    { label: "Contact Us", href: `${ROOT}/pages/contact.html` },
    
  ];

  function navbarHTML() {
    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${
          l.label === document.body.getAttribute("data-page") ? "vx-active" : ""
        }">${l.label}</a>`
    ).join("");

    return `
      <nav class="vx-navbar" id="vxNavbar">
        <a href="${ROOT}/index.html" class="vx-navbar__logo">
          <img src="${ROOT}/assets/images/logo.png" alt="VartexSoft logo" onerror="this.style.display='none'">
        </a>

        <ul class="vx-navbar__links">${links}</ul>

        <a href="${ROOT}/pages/apply-project.html" class="vx-navbar__cta vx-desktop-only">Start a Project</a>

        <button class="vx-navbar__burger" id="vxBurger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div class="vx-navbar__mobile-panel" id="vxMobilePanel">
        <button class="vx-navbar__close" id="vxClose" aria-label="Close menu">&times;</button>
        ${links}
        <a href="${ROOT}/pages/apply-project.html" class="vx-navbar__cta" style="margin-top:20px;display:inline-flex;">Start a Project</a>
      </div>
    `;
  }

  const SOCIAL_ICONS = {
    tiktok:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.6 5.82c-.94-.82-1.5-1.98-1.6-3.32h-3.1v13.6c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1 0-5.54c.28 0 .55.04.8.12V10.4a5.9 5.9 0 0 0-.8-.06 5.87 5.87 0 0 0-5.87 5.87A5.87 5.87 0 0 0 9.13 22a5.87 5.87 0 0 0 5.87-5.87V9.02a8.06 8.06 0 0 0 4.6 1.44V7.36c-1.14 0-2.19-.38-3-.99v-.01Z"/></svg>',
    twitter:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.9 3H22l-7.5 8.57L23 21h-6.9l-5.4-6.6L4.5 21H1.4l8.03-9.18L1 3h7.07l4.9 6.05L18.9 3Zm-1.21 16.17h1.72L7.4 4.74H5.55L17.69 19.17Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.98h4v11.02H3V9.98Zm7 0h3.83v1.51h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v6.43h-4v-5.7c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01v5.8H10V9.98Z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.5 21v-8.1h2.72l.4-3.16h-3.12V7.75c0-.91.25-1.53 1.56-1.53h1.67V3.4c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.05 1.47-4.05 4.16v2.3H7.5v3.16h2.75V21h3.25Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  };

  const SOCIAL_LINKS = [
    { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@vartexsoft" },
    { key: "twitter", label: "Twitter", href: "#" },
    { key: "linkedin", label: "LinkedIn", href: "#" },
    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586228192824" },
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/vartexsoft/" },
  ];

  function socialsHTML() {
    return SOCIAL_LINKS.map(
      (s) =>
        `<a href="${s.href}" aria-label="${s.label}">${SOCIAL_ICONS[s.key]}</a>`
    ).join("");
  }

  function footerHTML() {
    return `
      <footer class="vx-footer">
        <div class="vx-footer__arc"></div>
        <div class="vx-footer__top">
          <div class="vx-footer__brand">
            <img src="${ROOT}/assets/images/logo.png" alt="VartexSoft logo" onerror="this.style.display='none'">
            <p>Based in Bahawalpur, Pakistan, we specialize in building modern digital solutions and empowering the next generation of developers.</p>
            <div class="vx-footer__socials">
              ${socialsHTML()}
            </div>
          </div>

          <div class="vx-footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="${ROOT}/pages/about.html">About Us</a></li>
              <li><a href="${ROOT}/pages/contact.html">Contact Us</a></li>
              <li><a href="${ROOT}/pages/blog.html">Blogs</a></li>
              <li><a href="${ROOT}/pages/apply-project.html">Start a Project</a></li>
            </ul>
          </div>

          <div class="vx-footer__col">
            <h4>Services</h4>
            <ul>
              <li><a href="${ROOT}/pages/services/web-development.html">Web Development</a></li>
              <li><a href="${ROOT}/pages/services/app-development.html">App Development</a></li>
              <li><a href="${ROOT}/pages/services/digital-marketing.html">Digital Marketing</a></li>
              <li><a href="${ROOT}/pages/services/seo.html">SEO Optimization</a></li>
            </ul>
          </div>

          <div class="vx-footer__col">
            <h4>Courses</h4>
            <ul>
              <li><a href="${ROOT}/pages/courses/web-development.html">Web Development</a></li>
              <li><a href="${ROOT}/pages/courses/digital-marketing.html">Digital Marketing</a></li>
              <li><a href="${ROOT}/pages/courses/graphic-designing.html">Graphic Designing</a></li>
              <li><a href="${ROOT}/pages/courses/app-development.html">App Development</a></li>
            </ul>
            <ul class="vx-footer__more-list" id="vxCoursesMore" hidden>
              <li><a href="${ROOT}/pages/courses/wordpress.html">Wordpress</a></li>
              <li><a href="${ROOT}/pages/courses/shopify.html">Shopify</a></li>
              <li><a href="${ROOT}/pages/courses/seo.html">SEO</a></li>
              <li><a href="${ROOT}/pages/courses/tiktok-monetization.html">Tiktok Monitization</a></li>
              <li><a href="${ROOT}/pages/courses/youtube-automation.html">YouTube Automation</a></li>
            </ul>
            <button type="button" class="vx-footer__more-toggle" id="vxCoursesToggle">More</button>
          </div>

          <div class="vx-footer__col">
            <h4>Contact</h4>
            <ul class="vx-footer__contact">
              <li><a href="tel:+923007806086">+92 300 780 6086</a></li>
              <li><a href="mailto:info@vartexsoft.com">info@vartexsoft.com</a></li>
              <li>Rohaan Plaza, Faisal Colony St. 1,<br>Women University Road,<br>Bahawalpur, Punjab, Pakistan</li>
            </ul>
          </div>
        </div>

        <div class="vx-footer__bottom">
          <div class="vx-footer__bottom-row">
            <span>© <span id="vxYear"></span> <span class="vx-footer__brand-name">Vartex Soft</span>. All rights reserved. Think Higher. Build Smarter.</span>
            <div>
              <a href="${ROOT}/pages/privacy.html">Privacy Policy</a>
              <a href="${ROOT}/pages/terms.html">Terms of Service</a>
              <a href="${ROOT}/pages/cookies.html">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function mount() {
    const navSlot = document.getElementById("vx-navbar");
    const footerSlot = document.getElementById("vx-footer");
    if (navSlot) navSlot.innerHTML = navbarHTML();
    if (footerSlot) footerSlot.innerHTML = footerHTML();

    const yearEl = document.getElementById("vxYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Navbar scroll state
    const navbar = document.getElementById("vxNavbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("vx-scrolled", window.scrollY > 20);
      });
    }

    // Mobile menu open/close
    const burger = document.getElementById("vxBurger");
    const panel = document.getElementById("vxMobilePanel");
    const closeBtn = document.getElementById("vxClose");

    if (burger && panel) {
      burger.addEventListener("click", () => panel.classList.add("vx-open"));
    }
    if (closeBtn && panel) {
      closeBtn.addEventListener("click", () => panel.classList.remove("vx-open"));
    }

    // Courses "More / Less" expand toggle
    const moreToggle = document.getElementById("vxCoursesToggle");
    const moreList = document.getElementById("vxCoursesMore");
    if (moreToggle && moreList) {
      moreToggle.addEventListener("click", () => {
        const isHidden = moreList.hasAttribute("hidden");
        if (isHidden) {
          moreList.removeAttribute("hidden");
          moreToggle.textContent = "Less";
        } else {
          moreList.setAttribute("hidden", "");
          moreToggle.textContent = "More";
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();