// Site behaviour: smooth scroll (Lenis), header state, mobile menu, in-page links, the hero arch intro,
// scroll reveals, stat counters and the copy-email button. Motion only runs when the visitor allows it.
// Astro bundles this file with Lenis (from npm) into one small script.
import Lenis from "lenis";

(function () {
  "use strict";
  window.__siteReady = true; // the inline head script un-hides content if this never gets set
  var root = document.documentElement;
  var motion = root.classList.contains("motion");
  var header = document.querySelector(".site-header");

  var lenis = motion ? new Lenis({ autoRaf: true }) : null;

  // ---------- Header border once the page has scrolled ----------
  var sentinel = document.querySelector(".top-sentinel");
  if (sentinel && header) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  // ---------- Mobile menu ----------
  var menuBtn = document.querySelector(".menu-btn");
  function setMenu(open) {
    if (!menuBtn) return;
    root.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    if (lenis) open ? lenis.stop() : lenis.start();
    else document.body.style.overflow = open ? "hidden" : "";
    if (open) document.querySelector(".site-nav a").focus({ preventScroll: true });
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  // ---------- In-page links ----------
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute("href");
    var target = hash === "#" || hash === "#home" ? null : document.querySelector(hash);
    if (hash !== "#" && hash !== "#home" && !target) return;
    e.preventDefault();
    if (root.classList.contains("menu-open")) setMenu(false);
    if (lenis) lenis.scrollTo(target || 0); // Lenis honours the sections' scroll-margin-top (header clearance)
    else if (target) target.scrollIntoView({ behavior: motion ? "smooth" : "auto" });
    else window.scrollTo({ top: 0, behavior: motion ? "smooth" : "auto" });
    if (target) {
      // Keyboard and screen-reader users continue from the section they jumped to.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    history.replaceState(null, "", hash === "#home" ? location.pathname : hash);
  });

  // ---------- Hero arch: letters drop into place one by one ----------
  // The arc is laid out by the browser (textPath). Each letter's position and angle are read back and the
  // letters are re-drawn individually so they can animate; without motion the textPath version stays.
  var arch = document.querySelector(".hero-arch svg");
  if (arch && motion) {
    document.fonts.ready.then(function () {
      var NS = "http://www.w3.org/2000/svg";
      var text = arch.querySelector("text");
      try {
        var chars = text.textContent.trim();
        var group = document.createElementNS(NS, "g");
        for (var i = 0; i < chars.length; i++) {
          var p = text.getStartPositionOfChar(i);
          var g = document.createElementNS(NS, "g");
          g.setAttribute("transform", "translate(" + p.x + " " + p.y + ") rotate(" + text.getRotationOfChar(i) + ")");
          var letter = document.createElementNS(NS, "text");
          letter.setAttribute("class", "arch-letter");
          letter.setAttribute("font-size", text.getAttribute("font-size"));
          letter.style.setProperty("--i", i);
          letter.textContent = chars[i];
          g.appendChild(letter);
          group.appendChild(g);
        }
        arch.appendChild(group);
        text.setAttribute("visibility", "hidden");
      } catch (err) {
        text.style.opacity = 1; // browser can't report glyph positions: show the static arc
      }
    });
  }

  // ---------- Scroll reveals ----------
  var reveals = document.querySelectorAll("[data-reveal]");
  if (motion && "IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach(function (el) {
      revealer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  // ---------- Stat counters (the HTML already holds the final values) ----------
  var counters = document.querySelectorAll("[data-count]");
  if (motion && counters.length) {
    var format = function (el, value) {
      var decimals = (el.dataset.count.split(".")[1] || "").length;
      el.textContent = value.toFixed(decimals) + (el.dataset.suffix || "");
    };
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          counterIO.unobserve(entry.target);
          var el = entry.target;
          var end = parseFloat(el.dataset.count);
          var start = performance.now();
          (function tick(now) {
            var k = Math.min(1, (now - start) / 1400);
            format(el, end * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(tick);
          })(start);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach(function (el) {
      format(el, 0);
      counterIO.observe(el);
    });
  }

  // ---------- Copy email (for visitors whose computer has no email app set up) ----------
  var copyBtn = document.querySelector(".copy-email");
  if (copyBtn) {
    var copyNote = document.querySelector(".copy-note");
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.dataset.email;
      var copied = navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject(new Error("no clipboard"));
      copied
        .then(function () {
          copyNote.textContent = "Copied. Paste it into any email app.";
          copyBtn.querySelector("use").setAttribute("href", "#i-check");
        })
        .catch(function () {
          copyNote.textContent = "Copy this address: " + email; // clipboard blocked: show it to copy by hand
        });
    });
  }
})();
