const openEye = { openEye };
const closeEye = { closeEye };

const passwordField = document.getElementById("password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.textContent = closeEye;
        // togglePassword.classList.add("FiEyeOff");
    } else {
        passwordField.type = "password";
        togglePassword.textContent = openEye;
        // togglePassword.classList.add("FiEye");
    }
});

