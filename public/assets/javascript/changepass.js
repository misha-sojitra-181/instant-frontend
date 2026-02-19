const form = document.getElementById("changeForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const oldPwd = document.getElementById("oldPwd").value.trim();
  const newPwd = document.getElementById("newPwd").value.trim();

  if (!email || !oldPwd || !newPwd) {
    showMessage("⚠️ Please fill in all fields.", "error");
    return;
  }

  // Get stored user
  const userData = JSON.parse(sessionStorage.getItem("user"));

  if (!userData) {
    showMessage("❌ You are not logged in.", "error");
    return;
  }

  // Check email
  if (userData.email !== email) {
    showMessage("❌ Email not found.", "error");
    return;
  }

  // Check old password
  if (userData.password !== oldPwd) {
    showMessage("❌ Old password is incorrect.", "error");
    return;
  }

  // Update password
  userData.password = newPwd;

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
