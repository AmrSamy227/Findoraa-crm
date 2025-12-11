// Function to update the notification counter (based on local storage data)
function updateNotificationCounter() {
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  const unreadCount = notifs.filter((n) => !n.read).length;
  const counter = document.querySelector(".notification-counter");
  if (counter) {
    if (unreadCount > 0) {
      counter.textContent = unreadCount;
      counter.style.display = "inline-block";
    } else {
      counter.style.display = "none";
    }
  }
}

// Navbar scroll effect: Adds 'scrolled' class when scrolling down
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Run counter updates on load and when local storage changes
document.addEventListener("DOMContentLoaded", updateNotificationCounter);
window.addEventListener("storage", updateNotificationCounter);

// Smooth scroll for anchor links (e.g., clicking on #contact)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Only apply smooth scroll if it's not a generic "#" or "#home" (to avoid overriding default home/top behavior)
    if (href !== "#" && href !== "#home") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});