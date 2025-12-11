// ✅ Static accounts with roles
const staticAccounts = [
  { email: "findoraagent@gmail.com", password: "agent123", role: "agent" },
  { email: "findorahr@gmail.com",    password: "hr123",    role: "hr" },
  { email: "findoraadmin@gmail.com", password: "admin123", role: "admin" },
];

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Use 'this' to refer to the form or directly query the form element
      const emailInput = this.querySelector('input[type="email"]');
      const passwordInput = this.querySelector('input[type="password"]');

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      const found = staticAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (!found) {
        alert("Invalid email or password.");
        return;
      }

      // Successful login logic
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: found.email, role: found.role })
      );

      // Redirection based on role
      if (found.role === "hr") {
        window.location.href = "hr-dashboard.html";
      } else if (found.role === "admin") {
        window.location.href = "dashbord.html";
      } else {
        // Default for agent or any other role
        window.location.href = "properities.html";
      }
    });
  } else {
      console.error("Login form not found. Check the ID in login.html.");
  }
});
