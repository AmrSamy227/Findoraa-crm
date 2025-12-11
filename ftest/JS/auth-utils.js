const ROLE_PERMISSIONS = {
  admin: { allow: ["*"], deny: [] },

  hr: {
    allow: [
      "hr-dashboard.html",
      "reports.html",
      "calendar.html",
      "notifications.html",
    ],
    deny: [],
  },

  agent: {
    allow: ["*"],
    deny: [
      "dashbord.html",
      "hr-dashboard.html",
      "reports.html",
      "notifications.html",
    ],
  },
};

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

function normalizePage(pathname) {
  return pathname.split("/").pop().toLowerCase();
}

function hasAccess(role, page) {
  const rule = ROLE_PERMISSIONS[role];
  if (!rule) return false;

  page = page.toLowerCase();
  if (rule.deny.map((p) => p.toLowerCase()).includes(page)) return false;
  if (rule.allow.includes("*")) return true;
  return rule.allow.map((p) => p.toLowerCase()).includes(page);
}

function guardPage() {
  const logged = localStorage.getItem("isLoggedIn") === "true";
  const user = getCurrentUser();
  if (!logged || !user?.role) {
    location.href = "login.html";
    return;
  }

  const currentPage = normalizePage(location.pathname);
  if (!hasAccess(user.role, currentPage)) {
    alert("You don't have access to this page.");
    if (user.role === "hr") location.href = "hr-dashboard.html";
    else if (user.role === "admin") location.href = "dashbord.html";
    else location.href = "properities.html";
  }
}

function applyRoleBasedNav() {
  const user = getCurrentUser();
  if (!user?.role) return;

  document.querySelectorAll("[data-page]").forEach((a) => {
    const page = a.getAttribute("data-page");
    if (!hasAccess(user.role, page)) {
      const li = a.closest("li");
      if (li) li.remove();
      else a.remove();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  guardPage();
  applyRoleBasedNav();
});
