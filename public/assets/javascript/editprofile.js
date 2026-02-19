document.addEventListener("DOMContentLoaded", () => {
  const defaultPhoto = "/images/person.jpg";

  // Get user object from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("user"));

  // If user not logged in
  if (!userData) {
    document.getElementById("error").textContent = "You are not logged in.";
    document.getElementById("loading").style.display = "none";
    return;
  }

  /* ===== LEFT SECTION ===== */
  document.getElementById("profileImage").src =
    userData.Photo || userData.photo || defaultPhoto;

  document.getElementById("uname").textContent = userData.uname || "";
  document.getElementById("email").textContent = userData.email || "";

  /* ===== PROFILE DETAILS ===== */
  document.getElementById("fnameVal").textContent = userData.fname || "";
  document.getElementById("unameVal").textContent = userData.uname || "";
  document.getElementById("emailVal").textContent = userData.email || "";
  document.getElementById("mobileVal").textContent = userData.mobile || "";
  document.getElementById("genderVal").textContent =
    userData.gender
      ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)
      : "";
  document.getElementById("dobVal").textContent = userData.dob || "";

  /* ===== SHOW CONTENT ===== */
  document.getElementById("loading").style.display = "none";
  document.getElementById("profileContent").style.display = "block";
});
