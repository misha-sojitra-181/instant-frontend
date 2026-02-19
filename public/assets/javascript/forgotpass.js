const form = document.getElementById("forgotForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const pwd = document.getElementById("pwd").value.trim();

  if (!email || !pwd) {
    showMessage("⚠️ Please fill in all fields.", "error");
    return;
  }

  // Get user from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("user"));

  if (!userData) {
    showMessage("❌ No user data found. Please register first.", "error");
    return;
  }

  // Check email match
  if (userData.email !== email) {
    showMessage("❌ Email not found.", "error");
    return;
  }

  // Update password locally
  userData.password = pwd;

  // Save back to sessionStorage
  sessionStorage.setItem("user", JSON.stringify(userData));

  showMessage("✅ Password changed successfully! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});

function showMessage(msg, type) {
  messageBox.style.display = "block";
  messageBox.textContent = msg;
  messageBox.className = "message " + type;
}
