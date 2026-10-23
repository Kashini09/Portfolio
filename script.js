// 1. Select the HTML elements used by JavaScript.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector("#themeToggle");
const backToTop = document.querySelector("#backToTop");
const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");

// 2. Automatically display the current year in the footer.
document.querySelector("#year").textContent = new Date().getFullYear();

// 3. Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
  const menuIsOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
  menuToggle.setAttribute(
    "aria-label",
    menuIsOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuToggle.textContent = menuIsOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is clicked.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// 4. Switch between light and dark themes.
themeToggle.addEventListener("click", () => {
  const darkModeIsOn = document.body.classList.toggle("dark");

  themeToggle.textContent = darkModeIsOn ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    darkModeIsOn ? "Switch to light theme" : "Switch to dark theme"
  );
});

// 5. Filter projects by category.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.filter;

    projectCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !shouldShow;
    });
  });
});

// 6. Show or hide extra details for each project.
document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    const detailsAreOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!detailsAreOpen));
    details.hidden = detailsAreOpen;
    button.querySelector("span").textContent = detailsAreOpen ? "＋" : "−";
  });
});

// 7. Check the contact form fields.
// This demo does not send emails or save messages.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formFeedback.textContent = "Please enter valid details in every field.";
    return;
  }

  const visitorName = document.querySelector("#visitorName").value.trim();

  formFeedback.textContent =
    `Thank you, ${visitorName}! Your form is valid. ` +
    "This demo has not sent your message.";

  contactForm.reset();
});

// 8. Show the back-to-top button after scrolling down.
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

// Scroll smoothly to the top when the button is clicked.
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
