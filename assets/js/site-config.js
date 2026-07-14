/* Essential Living Chiropractic — single source of truth for business data.
   The footer NAP, contact page NAP, and JSON-LD schema all render from this
   object so the address can never go stale in one spot and not another.
   Edit here, and every page updates. */

window.SITE_CONFIG = {
  name: "Essential Living Chiropractic",
  doctor: "Dr. Josh Nannen",
  tagline: "Pursue Health \u2022 Live Life Aligned",

  /* CONFIRM before launch: Google Business Profile says "Oak Hill Blvd"
     (singular). The old site said "Oak Hills Blvd". Verify exact spelling
     against USPS, then make this, Google, and everything else match. */
  address: {
    street: "6649 Oak Hill Blvd",
    city: "Tyler",
    state: "TX",
    zip: "75703"
  },

  phoneDisplay: "(903) 630-5327",
  phoneHref: "tel:+19036305327",

  /* CONFIRM: old city pages used info@essentiallivingchiro.com.
     Which inbox is real? */
  email: "office@essentiallivingchiro.com",

  /* Jane intake forms ONLY, for patients who ALREADY have an appointment.
     Never a booking or lead path. Rendered on the New Patients page only,
     via the .js-intake button. Requesting an appointment goes through the
     lead form (/book/ and /contact/), not Jane. */
  janeIntakeUrl: "https://essentiallivingchiro.janeapp.com/",

  geo: { lat: 32.2766529, lng: -95.3405281 },

  /* Display hours, taken from the old site.
     CONFIRM Tuesday: old site said 8am-2pm, Google says 9am-1pm.
     One is wrong. Fix here AND on Google so they match. */
  hoursDisplay: [
    ["Monday", "8am\u201312pm / 2pm\u20136pm"],
    ["Tuesday", "8am\u20132pm"],
    ["Wednesday", "7am\u201310am / 12pm\u20134pm"],
    ["Thursday", "8am\u201312pm / 2pm\u20136pm"],
    ["Friday", "7am\u201311am"],
    ["Saturday", "Closed"],
    ["Sunday", "Closed"]
  ],

  /* Structured hours for schema.org. Keep in sync with hoursDisplay. */
  hoursSchema: [
    { days: ["Monday"], opens: "08:00", closes: "12:00" },
    { days: ["Monday"], opens: "14:00", closes: "18:00" },
    { days: ["Tuesday"], opens: "08:00", closes: "14:00" },
    { days: ["Wednesday"], opens: "07:00", closes: "10:00" },
    { days: ["Wednesday"], opens: "12:00", closes: "16:00" },
    { days: ["Thursday"], opens: "08:00", closes: "12:00" },
    { days: ["Thursday"], opens: "14:00", closes: "18:00" },
    { days: ["Friday"], opens: "07:00", closes: "11:00" }
  ],

  social: {
    facebook: "https://www.facebook.com/Essentiallivingchiro/",
    instagram: "https://www.instagram.com/essentiallivingchiro/"
  },

  /* Final domain. Used for schema only until DNS cutover. */
  siteUrl: "https://essentiallivingchiro.com",

  /* TODO phase 2: create a leads table + Resend notify Edge Function,
     then paste keys here. Until both values are set, the contact form
     shows a friendly "call us" message instead of submitting. */
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  LEADS_TABLE: "elc_leads"
};
