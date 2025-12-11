// This file is currently empty.
// Add your JavaScript logic here (e.g., form validation, AJAX submission, etc.)
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // TODO: Add client-side validation logic here
            
            // Example:
            // const fullName = this.querySelector('input[type="text"]').value.trim();
            // console.log("Attempting sign up for:", fullName);
            
            // window.location.href = "login.html"; 
        });
    }
});