const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const appointmentForm = document.querySelector("#appointment-form");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navigation.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".section-heading, .service-card, .device-card, .info-grid article, .detail-grid article, .steps li, .contact-hero-panel, .contact-step-strip article, .contact-card, .appointment-form, .form-aside, .sales-strip div, .home-cta-section"
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  document.body.classList.add("has-reveal");

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 55, 275)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

if (appointmentForm instanceof HTMLFormElement) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const recipient = appointmentForm.dataset.recipient || "m_agzannay@gmail.com";
    const devices = formData.getAll("apparaten").join(", ") || "Niet ingevuld";
    const subject = "Nieuwe afspraakaanvraag voor ICT-hulp";
    const body = [
      "Nieuwe afspraakaanvraag via de website",
      "",
      `Naam: ${formData.get("naam") || ""}`,
      `E-mail: ${formData.get("email") || ""}`,
      `Telefoon: ${formData.get("telefoon") || ""}`,
      `Plaats/regio: ${formData.get("regio") || ""}`,
      `Onderwerp: ${formData.get("hulpsoort") || ""}`,
      `Gewenste dag/tijd: ${formData.get("moment") || ""}`,
      `Apparaten: ${devices}`,
      "",
      "Beschrijving:",
      `${formData.get("bericht") || ""}`,
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
