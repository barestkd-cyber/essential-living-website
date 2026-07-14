/* Essential Living Chiropractic — page runtime.
   Everything here reads from window.SITE_CONFIG (site-config.js). */

(function () {
  var C = window.SITE_CONFIG;
  if (!C) return;

  /* ---------- Footer / contact NAP blocks ---------- */
  function napHtml(full) {
    var a = C.address;
    var html =
      "<p><strong>" + C.name + "</strong><br>" +
      a.street + "<br>" + a.city + ", " + a.state + " " + a.zip + "</p>" +
      '<p><a href="' + C.phoneHref + '">' + C.phoneDisplay + "</a><br>" +
      '<a href="mailto:' + C.email + '">' + C.email + "</a></p>";
    if (full) {
      html += '<table class="hours-table"><tbody>';
      C.hoursDisplay.forEach(function (row) {
        html += "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td></tr>";
      });
      html += "</tbody></table>";
    }
    return html;
  }

  document.querySelectorAll("[data-nap]").forEach(function (el) {
    el.innerHTML = napHtml(el.hasAttribute("data-nap-full"));
  });

  /* ---------- Intake-forms link (scheduled patients only) ----------
     Sets the New Patients intake button to the Jane intake URL. This is
     NOT a booking or lead path — it only appears on new-patients. */
  document.querySelectorAll(".js-intake").forEach(function (el) {
    el.setAttribute("href", C.janeIntakeUrl);
  });

  /* ---------- JSON-LD Chiropractor schema ---------- */
  var schema = {
    "@context": "https://schema.org",
    "@type": "Chiropractor",
    "name": C.name,
    "url": C.siteUrl,
    "telephone": C.phoneDisplay,
    "email": C.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": C.address.street,
      "addressLocality": C.address.city,
      "addressRegion": C.address.state,
      "postalCode": C.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": C.geo.lat,
      "longitude": C.geo.lng
    },
    "openingHoursSpecification": C.hoursSchema.map(function (h) {
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": h.days,
        "opens": h.opens,
        "closes": h.closes
      };
    }),
    "sameAs": [C.social.facebook, C.social.instagram],
    "employee": [
      { "@type": "Person", "name": "Dr. Josh Nannen", "jobTitle": "Chiropractor", "hasCredential": [{ "@type": "EducationalOccupationalCredential", "name": "Webster Technique Certification", "recognizedBy": { "@type": "Organization", "name": "International Chiropractic Pediatric Association" } }] },
      { "@type": "Person", "name": "Dr. Danielle Lewis", "jobTitle": "Chiropractor", "hasCredential": [{ "@type": "EducationalOccupationalCredential", "name": "Webster Technique Certification", "recognizedBy": { "@type": "Organization", "name": "International Chiropractic Pediatric Association" } }] }
    ]
  };
  var tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.textContent = JSON.stringify(schema);
  document.head.appendChild(tag);

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Contact form ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = document.querySelector("#form-status");
    function show(kind, msg) {
      status.className = "form-status show " + kind;
      status.textContent = msg;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) {
        show(
          "warn",
          "Our online form isn't connected yet. Call " + C.phoneDisplay +
            " and we'll take care of you."
        );
        return;
      }

      var data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        best_time: form.best_time ? form.best_time.value.trim() : "",
        doctor_pref: form.doctor_pref ? form.doctor_pref.value : "",
        interest: form.interest ? form.interest.value : "",
        message: form.message.value.trim(),
        source: "website-contact"
      };

      fetch(C.SUPABASE_URL + "/rest/v1/" + C.LEADS_TABLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: C.SUPABASE_ANON_KEY,
          Authorization: "Bearer " + C.SUPABASE_ANON_KEY,
          Prefer: "return=minimal"
        },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status " + res.status);
          form.reset();
          show("ok", "Got it. We'll reach out shortly. Need us sooner? Call " + C.phoneDisplay + ".");
        })
        .catch(function () {
          show("warn", "Something went wrong sending the form. Call " + C.phoneDisplay + " and we'll help right away.");
        });
    });
  }
})();
