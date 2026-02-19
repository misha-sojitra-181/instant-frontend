document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const fullName = document.querySelector("input[placeholder='full name']");
  const username = document.querySelector("input[placeholder='username']");
  const email = document.querySelector("input[type='email']");
  const mobile = document.querySelector("input[type='tel']");
  const genderInputs = document.querySelectorAll("input[name='gender']");
  const dob = document.querySelector("input[type='date']");
  const password = document.querySelector("input[placeholder='Password']");
  const confirmPassword = document.querySelector("input[placeholder='Confirm Password']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Required fields check
    if (
      !fullName.value.trim() ||
      !username.value.trim() ||
      !email.value.trim() ||
      !mobile.value.trim() ||
      !dob.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Gender check
    let gender = "";
    genderInputs.forEach(radio => {
      if (radio.checked) gender = radio.value;
    });

    if (!gender) {
      alert("Please select gender");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      alert("Please enter a valid email");
      return;
    }

    // Mobile validation
    if (mobile.value.length < 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    // Password match
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }

    // Save data
    const user = {
      fullName: fullName.value.trim(),
      username: username.value.trim(),
      email: email.value.trim(),
      mobile: mobile.value.trim(),
      gender,
      dob: dob.value,
      password: password.value
    };

    sessionStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    // Redirect to login page
    window.location.href = "/login";
  });
});
