document.addEventListener("DOMContentLoaded", function () {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailMsg = document.getElementById("emailMsg");
  const messageBox = document.getElementById("messageBox");
  const loginForm = document.getElementById("loginForm");

  if (!emailInput || !passwordInput || !loginForm) {
    console.error("Login elements not found in DOM");
    return;
  }

  /* STATIC USER (Demo) */
  const STATIC_USER = {
    email: "user@gmail.com",
    password: "123456"
  };

  function validateEmail(value) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(value)) {
      emailMsg.textContent = "Valid email";
      emailMsg.style.color = "green";
    } else {
      emailMsg.textContent = "Please enter a valid email";
      emailMsg.style.color = "red";
    }
  }

  emailInput.addEventListener("input", function () {
    validateEmail(emailInput.value);
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage("⚠️ Please fill in all fields.", "error");
      return;
    }

    if (email === STATIC_USER.email && password === STATIC_USER.password) {
      sessionStorage.setItem("userEmail", email);
      showMessage("✅ Login successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "/userprofile.html";
      }, 1200);
    } else {
      showMessage("❌ Invalid email or password.", "error");
    }
  });

  function showMessage(msg, type) {
    messageBox.style.display = "block";
    messageBox.textContent = msg;
    messageBox.className = "message " + type;
  }

});
