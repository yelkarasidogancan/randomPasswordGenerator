const lengthSlider = document.querySelector(".pass-length input");
const lengthSpan = document.querySelector(".pass-length span");
const generateBtn = document.querySelector(".generate-btn");
options = document.querySelectorAll(".option input");
passwordInput = document.querySelector(".input-box input");
passIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%|[]{}:;.,*+-#@<>",
};

const generatePassword = () => {
  let staticPassword = "";
  passLength = lengthSlider.value;
  randomPassword = "";
  excludeDuplicate = false;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `   ${staticPassword}   `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};
const updateSlider = () => {
  //   console.log(lengthSlider.value);
  lengthSpan.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1500);
};
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
