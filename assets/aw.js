/* adwali. behavior layer v2 */
(function () {
  "use strict";
  var d = document, w = window;
  var fine = w.matchMedia && w.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced = w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: mega menus ---------- */
  var header = d.querySelector(".awx-header");
  if (header) {
    var groups = header.querySelectorAll("[data-menu]");
    var closeTimer = null;
    function closeAll(except) {
      groups.forEach(function (g) {
        if (g === except) return;
        var b = g.querySelector(".awx-navbtn"), p = g.querySelector(".awx-panelwrap");
        if (b) b.setAttribute("aria-expanded", "false");
        if (p) p.hidden = true;
      });
    }
    groups.forEach(function (g) {
      var btn = g.querySelector(".awx-navbtn"), panel = g.querySelector(".awx-panelwrap");
      if (!btn || !panel) return;
      function open() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        closeAll(g); btn.setAttribute("aria-expanded", "true"); panel.hidden = false;
      }
      function delayClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () { btn.setAttribute("aria-expanded", "false"); panel.hidden = true; }, 160);
      }
      if (fine) {
        g.addEventListener("mouseenter", open);
        g.addEventListener("mouseleave", delayClose);
        btn.addEventListener("click", function () { w.location.href = btn.getAttribute("data-href"); });
      } else {
        btn.addEventListener("click", function () {
          var isOpen = btn.getAttribute("aria-expanded") === "true";
          closeAll(null);
          if (!isOpen) { btn.setAttribute("aria-expanded", "true"); panel.hidden = false; }
        });
      }
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); open(); var f = panel.querySelector("a"); if (f) f.focus(); }
      });
    });
    d.addEventListener("click", function (e) { if (!header.contains(e.target)) closeAll(null); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(null); closeSheet(); } });

    /* ---------- Mobile sheet ---------- */
    var burger = header.querySelector(".awx-burger");
    var sheet = header.querySelector(".awx-sheet");
    function closeSheet() {
      if (!sheet || sheet.hidden) return;
      sheet.hidden = true; burger.setAttribute("aria-expanded", "false"); d.body.classList.remove("awx-lock");
    }
    if (burger && sheet) {
      burger.addEventListener("click", function () {
        var open = sheet.hidden;
        sheet.hidden = !open;
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        d.body.classList.toggle("awx-lock", open);
      });
      sheet.querySelectorAll(".awx-acc").forEach(function (acc) {
        acc.addEventListener("click", function () {
          var body = acc.nextElementSibling, open = body.hidden;
          sheet.querySelectorAll(".awx-accbody").forEach(function (b) { b.hidden = true; });
          sheet.querySelectorAll(".awx-acc").forEach(function (a) { a.setAttribute("aria-expanded", "false"); });
          body.hidden = !open;
          acc.setAttribute("aria-expanded", open ? "true" : "false");
        });
      });
      sheet.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeSheet); });
    }

    /* header shadow */
    var lastShadow = false;
    w.addEventListener("scroll", function () {
      var s = w.scrollY > 8;
      if (s !== lastShadow) { header.classList.toggle("is-scrolled", s); lastShadow = s; }
    }, { passive: true });
  }

  /* ---------- Scroll progress + back to top ---------- */
  var prog = d.createElement("div"); prog.className = "awx-progress"; d.body.appendChild(prog);
  var top = d.createElement("button"); top.className = "awx-top"; top.setAttribute("aria-label", "Back to top");
  top.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  d.body.appendChild(top);
  top.addEventListener("click", function () { w.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
  var ticking = false;
  w.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var h = d.documentElement, max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (w.scrollY / max) * 100 : 0) + "%";
      top.classList.toggle("show", w.scrollY > 700);
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Reveal engine (sections + stagger groups) ---------- */
  if (!reduced && "IntersectionObserver" in w) {
    var secs = Array.prototype.slice.call(d.querySelectorAll("main section, body > section")).slice(1);
    secs.forEach(function (s) { s.classList.add("awx-reveal"); });
    /* stagger obvious card grids inside sections */
    d.querySelectorAll("section").forEach(function (s) {
      var grids = s.querySelectorAll("[class*='grid'],[class*='cards'],[class*='cols']");
      grids.forEach(function (g) {
        var kids = g.children;
        if (kids.length >= 3 && kids.length <= 24 && g.querySelectorAll("img,iframe").length === 0) {
          g.classList.add("awx-stagger");
          for (var i = 0; i < kids.length; i++) kids[i].style.setProperty("--awx-d", (Math.min(i, 11) * 0.07) + "s");
        }
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("awx-on"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    secs.forEach(function (s) { io.observe(s); });
    d.querySelectorAll(".awx-stagger").forEach(function (g) { io.observe(g); });
    /* first-section marks sweep on load */
    d.querySelectorAll("section:first-of-type mark, .aw-hero mark").forEach(function (m) { m.classList.add("awx-swept"); });
    /* hero entrance: choreograph the first section's direct blocks */
    var hero = d.querySelector("section");
    if (hero) {
      var inner = hero.querySelector(":scope > div") || hero;
      if (inner.children.length && inner.children.length <= 8) {
        inner.classList.add("awx-hero-seq");
        for (var j = 0; j < inner.children.length; j++) inner.children[j].style.setProperty("--awx-i", j);
      }
    }
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    var raw = el.getAttribute("data-awx-count"), suffix = el.getAttribute("data-awx-suffix") || "";
    var target = parseFloat(raw), dec = (raw.split(".")[1] || "").length;
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counterEls = [];
  d.querySelectorAll(".aw-stats strong, .aw-stats [class*='num'], [data-count]").forEach(function (el) {
    var m = (el.textContent || "").trim().match(/^([0-9]+(?:\.[0-9]+)?)([A-Za-z%+]{0,3})$/);
    if (m) {
      var suf = (el.textContent.trim().slice(m[1].length)) || "";
      el.setAttribute("data-awx-count", m[1]); el.setAttribute("data-awx-suffix", suf);
      counterEls.push(el);
    }
  });
  if (counterEls.length && !reduced && "IntersectionObserver" in w) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counterEls.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Marquee (auto-build from logo/badge strips) ---------- */
  d.querySelectorAll("[data-awx-marquee]").forEach(function (row) {
    if (row.closest(".awx-marquee")) return;
    var wrap = d.createElement("div"); wrap.className = "awx-marquee";
    var track = d.createElement("div"); track.className = "awx-marquee-track";
    row.parentNode.insertBefore(wrap, row);
    track.appendChild(row);
    var clone = row.cloneNode(true); clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
    wrap.appendChild(track);
    row.style.display = clone.style.display = "flex";
    row.style.gap = clone.style.gap = row.style.gap || "2.5rem";
    track.style.setProperty("--awx-marq", Math.max(18, row.children.length * 4) + "s");
  });

  /* ---------- Magnetic CTAs + tilt cards (fine pointers only) ---------- */
  if (fine && !reduced) {
    d.querySelectorAll(".awx-cta, .aw-btn, [class*='btn-primary'], .aw-form-submit").forEach(function (b) {
      b.classList.add("awx-magnet");
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.transform = "translate(" + (x * 6).toFixed(1) + "px," + (y * 5).toFixed(1) + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
    d.querySelectorAll(".aw-card, .aw-svc-card").forEach(function (c) {
      c.classList.add("awx-tilt");
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        c.classList.add("awx-tilting");
        c.style.transform = "perspective(800px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      });
      c.addEventListener("mouseleave", function () { c.classList.remove("awx-tilting"); c.style.transform = ""; });
    });
  }

  /* ---------- Lead form: real submission ---------- */
  w.awFormSubmit = function (e) {
    e.preventDefault();
    var form = e.target && e.target.tagName === "FORM" ? e.target : d.getElementById("awModalForm");
    if (!form) return false;
    var btn = form.querySelector('[type="submit"]');
    var fd = new FormData(form);
    fd.append("page", w.location.pathname);
    if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending..."; }
    fetch("/api/lead.php", { method: "POST", body: fd })
      .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
      .then(function (res) {
        if (res && res.ok) {
          try { w.gtag && gtag("event", "generate_lead", { page_path: w.location.pathname }); } catch (_) {}
          form.style.display = "none";
          var s = d.getElementById("awModalSuccess"); if (s) s.classList.add("show");
          setTimeout(function () { w.location.href = "/thank-you/"; }, 900);
        } else { throw new Error("send failed"); }
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t || "Book a Free Consultation"; }
        var note = form.querySelector(".aw-form-note");
        if (note) note.textContent = "Could not send just now. Email us at hello@adwali.com or call +91 80058 68694.";
      });
    return false;
  };
})();
