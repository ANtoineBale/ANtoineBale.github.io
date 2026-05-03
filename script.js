// Apply the saved theme as early as possible so animated backgrounds
// initialize with the correct color palette on first load.
(function applyInitialTheme() {
  try {
    if (localStorage.getItem("theme") === "dark" && document.body) {
      document.body.classList.add("dark");
    }
  } catch (error) {
    // localStorage can be unavailable in strict privacy contexts.
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.querySelector(".nav-toggle");
  const headerActions = document.querySelector("[data-header-actions]");
  const currentPage = body.dataset.page;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Injection du logo 3D "AB" + transformation de tout le .brand en lien vers l'accueil
  document.querySelectorAll(".brand").forEach(function (brand) {
    if (brand.querySelector(".logo-3d")) return; // évite la duplication

    // 1. Création du cube logo 3D
    const logo = document.createElement("div");
    logo.className = "logo-3d";
    logo.setAttribute("aria-hidden", "true");
    logo.innerHTML =
      '<div class="logo-3d-cube">' +
      '  <div class="logo-3d-face front">AB</div>' +
      '  <div class="logo-3d-face back">AB</div>' +
      '  <div class="logo-3d-face right">AB</div>' +
      '  <div class="logo-3d-face left">AB</div>' +
      '  <div class="logo-3d-face top">AB</div>' +
      '  <div class="logo-3d-face bottom">AB</div>' +
      "</div>";

    // 2. Enveloppement du contenu du brand dans un lien <a> vers l'accueil
    const brandLink = document.createElement("a");
    brandLink.href = "index.html";
    brandLink.className = "brand-link";
    brandLink.setAttribute("aria-label", "Antoine Balesi - retour à l'accueil");

    // Déplace tous les enfants existants dans le lien
    while (brand.firstChild) {
      brandLink.appendChild(brand.firstChild);
    }
    // Ajoute le logo en premier
    brandLink.prepend(logo);
    brand.appendChild(brandLink);
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "Mode clair" : "Mode sombre";
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  function highlightCurrentNav() {
    if (!currentPage) return;

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      const isActive = link.dataset.nav === currentPage;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function closeMobileNav() {
    if (!headerActions || !navToggle) return;

    headerActions.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function setTextImmediately(element, text) {
    element.dataset.typed = "true";
    element.textContent = text;
    element.classList.add("typing-complete");
  }

  updateThemeButton();
  highlightCurrentNav();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        body.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeButton();
    });
  }

  if (navToggle && headerActions) {
    navToggle.addEventListener("click", function () {
      const isOpen = headerActions.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        closeMobileNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileNav();
      }
    });
  }

  document.querySelectorAll(".typing-target").forEach(function (target, index) {
    const text = target.dataset.text || "";

    if (prefersReducedMotion) {
      setTextImmediately(target, text);
      return;
    }

    typeText(target, text, 16 + index * 2);
  });

  function typeText(element, text, speed) {
    if (element.dataset.typed === "true") return;

    // Masque l'élément pendant l'animation pour éviter les interruptions de lecteur d'écran
    element.setAttribute("aria-hidden", "true");
    element.dataset.typed = "true";
    element.textContent = "";
    let i = 0;

    function write() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(write, speed);
      } else {
        element.classList.add("typing-complete");
        // Révèle le contenu aux lecteurs d'écran une fois l'animation terminée
        element.removeAttribute("aria-hidden");
      }
    }

    write();
  }

  const contactForm = document.getElementById("contactForm");
  const confirmation = document.getElementById("confirmation");

  if (contactForm && confirmation) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // — Validation accessible (WCAG 3.3.1 / 3.3.3) —
      var valid = true;
      var firstError = null;

      // Réinitialise les erreurs précédentes
      contactForm.querySelectorAll(".form-error").forEach(function (el) {
        el.textContent = "";
      });
      contactForm.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
      });

      var nomEl = document.getElementById("nom");
      var emailEl = document.getElementById("email");
      var messageEl = document.getElementById("messageContact");
      var nomError = document.getElementById("nomError");
      var emailError = document.getElementById("emailError");
      var messageError = document.getElementById("messageError");

      if (!nomEl.value.trim()) {
        nomEl.setAttribute("aria-invalid", "true");
        if (nomError) nomError.textContent = "Veuillez saisir votre nom.";
        valid = false;
        if (!firstError) firstError = nomEl;
      }

      if (!emailEl.value.trim()) {
        emailEl.setAttribute("aria-invalid", "true");
        if (emailError) emailError.textContent = "Veuillez saisir votre adresse email.";
        valid = false;
        if (!firstError) firstError = emailEl;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        emailEl.setAttribute("aria-invalid", "true");
        if (emailError) emailError.textContent = "Format invalide. Exemple : nom@domaine.fr";
        valid = false;
        if (!firstError) firstError = emailEl;
      }

      if (!messageEl.value.trim()) {
        messageEl.setAttribute("aria-invalid", "true");
        if (messageError) messageError.textContent = "Veuillez saisir votre message.";
        valid = false;
        if (!firstError) firstError = messageEl;
      }

      if (!valid) {
        if (firstError) firstError.focus();
        return;
      }

      // — Envoi via Netlify Forms —
      const nom = nomEl.value.trim();
      const displayName = nom || "pour votre message";
      const formData = new FormData(contactForm);
      const params = new URLSearchParams();
      formData.forEach(function (value, key) {
        params.append(key, value);
      });

      const submitBtn = contactForm.querySelector("button[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Envoi en cours…";
      }
      confirmation.innerHTML = "";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          confirmation.innerHTML =
            "Merci " +
            displayName +
            " ! Votre message a bien été envoyé — réponse sous 24 h en semaine.";
          contactForm.reset();
        })
        .catch(function () {
          confirmation.innerHTML =
            "Une erreur est survenue. Vous pouvez écrire directement à " +
            "<a href=\"mailto:antoinebalesi@gmail.com\">antoinebalesi@gmail.com</a>.";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || "Envoyer le message";
          }
        });
    });
  }

  createParticles();
  initScrollReveal();
  initSummaryTracking();
  initBackToTop();
  initCounters();
  initPageTransitions();
  initParallax();

  function createParticles() {
    if (prefersReducedMotion) return;

    const container = document.getElementById("particles");
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";

      const size = Math.random() * 10 + 6;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = Math.random() * 100 + "%";
      const riseDuration = Math.random() * 10 + 10;
      const scintilleDuration = Math.random() * 2 + 1.5;
      const opacity = Math.random() * 0.35 + 0.2;
      particle.style.animationDuration = riseDuration + "s, " + scintilleDuration + "s";
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.opacity = opacity.toString();
      particle.style.setProperty("--p-opacity", opacity.toString());

      container.appendChild(particle);
    }
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll(".scroll-reveal, .reveal, .timeline-item");
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(function (element) {
        element.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll(".metric-number, .stat-number");
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = "true";

        const raw = el.textContent.trim();
        // Ne pas animer les formats complexes comme "4,95/5"
        if (raw.includes("/") || raw.includes(",")) {
          return;
        }
        const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
        const suffix = raw.replace(/[0-9.]/g, "");
        if (isNaN(num)) return;

        const duration = 1400;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = num % 1 === 0
            ? Math.floor(ease * num)
            : Math.round(ease * num * 100) / 100;
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function initPageTransitions() {
    document.body.classList.add("page-loaded");

    document.querySelectorAll("a[href]").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("http") || link.hasAttribute("download") || link.target === "_blank") return;

      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        setTimeout(function () {
          window.location.href = href;
        }, 300);
      });
    });
  }

  function initParallax() {
    if (prefersReducedMotion) return;

    window.addEventListener("scroll", function () {
      const y = window.scrollY;
      document.body.style.setProperty("--parallax-y", y * 0.15 + "px");
    });
  }

  function initBackToTop() {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.setAttribute("aria-label", "Retour en haut de page");
    btn.textContent = "↑";
    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {
      btn.classList.toggle("visible", window.scrollY > 400);
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  function initSummaryTracking() {
    const links = document.querySelectorAll(".summary-link");
    const sections = document.querySelectorAll(".experience-anchor");

    if (!links.length || !sections.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            links.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        links.forEach(function (item) {
          item.classList.remove("active");
        });
        link.classList.add("active");
      });
    });
  }

  // Accessibilité : masque les éléments purement décoratifs aux lecteurs d'écran
  document.querySelectorAll(".icon-badge").forEach(function (el) {
    el.setAttribute("aria-hidden", "true");
  });

  // Note : aria-hidden sur .typing-target est géré directement dans typeText()
  // afin d'être retiré automatiquement en fin d'animation.

  // Accessibilité : liens externes — avertissement "(nouvelle fenêtre)"
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    var label = link.getAttribute("aria-label");
    var text = link.textContent.trim();
    if (!label || !label.includes("nouvelle fenêtre")) {
      link.setAttribute(
        "aria-label",
        (label || text) + " (nouvelle fenêtre)"
      );
    }
  });

  // Accessibilité : liens de téléchargement PDF
  document.querySelectorAll('a[download]').forEach(function (link) {
    var href = link.getAttribute("href") || "";
    if (href.endsWith(".pdf") && !link.textContent.includes("PDF")) {
      var label = link.getAttribute("aria-label") || link.textContent.trim();
      link.setAttribute("aria-label", label + " (PDF, téléchargement)");
    }
  });

  // ── Lightbox ──────────────────────────────────────────
  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image agrandie");

  var lbImg = document.createElement("img");
  lbImg.setAttribute("alt", "");

  var closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Fermer");
  closeBtn.innerHTML = "&times;";

  overlay.appendChild(lbImg);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  var zoomableImages = document.querySelectorAll(
    'main .detail-img, ' +
    'main .slide-img, ' +
    'main .gallery-item img, ' +
    'main .exp-visual img'
  );

  zoomableImages.forEach(function (img) {
    if (img.classList.contains("exp-brand-logo")) return;

    img.classList.add("is-zoomable");
    img.style.cursor = "zoom-in";
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Agrandir l'image");

    function triggerZoom(e) {
      if (e) e.preventDefault();
      openLightbox(img.currentSrc || img.src, img.alt);
    }

    img.addEventListener("click", triggerZoom);
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        triggerZoom(e);
      }
    });
  });

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target !== lbImg) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
});

/* ═══════════════════════════════════════════════════════════════
   SPOTLIGHT CARDS — effet glow qui suit le curseur
   S'applique sur tous les éléments [data-glow]
════════════════════════════════════════════════════════════════ */
(function () {
  function initGlowCards() {
    // Désactive l'effet spotlight sur mobile (pas de curseur)
    if (window.matchMedia('(max-width: 760px)').matches) return;

    var cards = document.querySelectorAll('[data-glow]');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.style.setProperty('--glow-opacity', '1');
      });

      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--glow-opacity', '0');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlowCards);
  } else {
    initGlowCards();
  }
}());

/* ═══════════════════════════════════════════════════════════════
   WIP OVERLAY — en cours de construction
   - Active l'accès admin : visiter ?admin=on  (stocke dans localStorage)
   - Désactive l'accès admin : visiter ?admin=off
   - Sur les pages avec data-wip="true", affiche l'overlay sauf pour l'admin
════════════════════════════════════════════════════════════════ */
(function () {
  var params = new URLSearchParams(window.location.search);

  // Activation / désactivation du mode admin via URL
  if (params.get("admin") === "on") {
    localStorage.setItem("wip_admin", "on");
    // Nettoie le paramètre de l'URL sans recharger la page
    var cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  }
  if (params.get("admin") === "off") {
    localStorage.removeItem("wip_admin");
    var cleanUrl2 = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl2);
  }

  // Vérifie si la page est en WIP et si l'admin n'est pas connecté
  var isWip = document.body.getAttribute("data-wip") === "true";
  var isAdmin = localStorage.getItem("wip_admin") === "on";

  if (isWip && !isAdmin) {
    var overlay = document.createElement("div");
    overlay.className = "wip-overlay";
    overlay.innerHTML =
      '<div class="wip-overlay__icon" aria-hidden="true">⚙︎</div>' +
      '<h1 class="wip-overlay__title">Page en construction</h1>' +
      '<p class="wip-overlay__sub">Cette page est en cours de rédaction. Elle sera bientôt disponible.</p>' +
      '<a href="index.html" class="wip-overlay__back">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>' +
        'Retour à l\'accueil' +
      '</a>';
    document.body.appendChild(overlay);
  }
}());
