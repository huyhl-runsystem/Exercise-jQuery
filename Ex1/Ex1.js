$(document).ready(function () {
  const fullNameInput = $("#fullName");
  const emailInput = $("#email");
  const phoneInput = $("#phone");
  const birthdayInput = $("#birthday");
  const passwordInput = $("#password");
  const confirmPasswordInput = $("#confirmPassword");

  const displayFullName = $("#displayFullName");
  const displayEmail = $("#displayEmail");
  const displayPhone = $("#displayPhone");
  const displayBirthday = $("#displayBirthday");

  const fullNameError = $("#fullNameError");
  const emailError = $("#emailError");
  const phoneError = $("#phoneError");
  const birthdayError = $("#birthdayError");
  const passwordError = $("#passwordError");
  const confirmPasswordError = $("#confirmPasswordError");

  const avatarUpload = $("#avatar-upload");
  const imageUpload = $("#image-upload");
  const labelAvatarUpload = $("#label-avatar-upload");
  const avatarPreview = $("#avatar-preview");
  const imagePreview = $("#image-preview");

  const infoForm = $("#infoForm");
  const inputs = $("#infoForm input");
  const addButton = $("#add-button");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const birthdayRegex =
    /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-((19|20)\d\d)$/;
  const phoneRegex = /^0\d{9}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,30}$/;

  var isValid = true;

  function submitForm() {
    displayFullName.text(fullNameInput.val());
    displayEmail.text(emailInput.val());
    displayPhone.text(formatPhoneNumber(phoneInput.val()));
    displayBirthday.text(formatdate(birthdayInput.val()));

    handleImageUpload();
  }

  function formatPhoneNumber(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    const formattedNumber = `${cleanedNumber.substr(
      0,
      3
    )}-${cleanedNumber.substr(3, 3)}-${cleanedNumber.substr(6)}`;
    return formattedNumber;
  }

  function formatdate(dateInput) {
    var date = new Date(dateInput);
    dateInput = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return dateInput;
  }

  function handleImageUpload() {
    if (imageUpload[0].files.length > 0) {
      var file = imageUpload[0].files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        avatarPreview.css("backgroundImage", "url(" + e.target.result + ")");
        imagePreview.css("display", "none");
      };

      reader.readAsDataURL(file);
    } else {
      avatarPreview.css("backgroundImage", "none");
      imagePreview.css("display", "block");
    }
  }

  function showImage(input) {
    var file = input[0].files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      avatarUpload.css("backgroundImage", "url(" + e.target.result + ")");
      labelAvatarUpload.css("display", "none");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      avatarUpload.css("backgroundImage", "none");
      labelAvatarUpload.css("display", "block");
    }
  }

  function clearError(err) {
    err.text("");
  }

  function resetForm() {
    inputs.val("");

    displayFullName.text("");
    displayEmail.text("");
    displayPhone.text("");
    displayBirthday.text("");

    imageUpload.val("");
    labelAvatarUpload.css("display", "block");

    avatarPreview.css("backgroundImage", "none");
    imagePreview.css("display", "block");

    clearErrors();
  }

  function formatLastNameFirstLetter(str) {
    return str.replace(/(?:^|\s)\S/g, function (char) {
      return char.toUpperCase();
    });
  }

  fullNameInput.on("blur", function () {
    this.value = formatLastNameFirstLetter(this.value);
  });

  infoForm.on("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      submitForm();
    }
  });

  addButton.on("click", function (event) {
    if (validateForm()) {
      submitForm();
    }
  });

  imageUpload.on("change", function () {
    showImage(this);
  });

  $(document).on("keydown", function (event) {
    var isShiftKey = event.shiftKey;
    var isDeleteKey = event.key === "Delete";

    if (isShiftKey) {
      if (validateForm()) {
        submitForm();
      }
    }

    if (isDeleteKey) {
      resetForm();
    }
  });

  function validateForm() {
    return isValid;
  }

  function Validate(element, errorElement) {
    var value = element.val().trim();
    isValid = true;
    var formatError = `Invalid ${element.attr("id")} format`;
    const regexLists = {
      email: emailRegex,
      birthday: birthdayRegex,
      phone: phoneRegex,
      password: passwordRegex,
    };

    switch (element.attr("id")) {
      case "fullName":
        if (value === "") {
          errorElement.text(`${element.attr("id")} cannot be empty`);
          isValid = false;
        }
        break;
      case "email":
        formatError = "Invalid email format";
        if (value === "") {
          errorElement.text(`${element.attr("id")} cannot be empty`);
          isValid = false;
        } else if (!regexLists[element.attr("id")].test(value)) {
          errorElement.text(formatError);
          isValid = false;
        }
        break;
      case "phone":
        formatError =
          "Invalid phone format (must have 10 numbers and start with 0)";
        if (value === "") {
          errorElement.text(`${element.attr("id")} cannot be empty`);
          isValid = false;
        } else if (!regexLists[element.attr("id")].test(value)) {
          errorElement.text(formatError);
          isValid = false;
        }
        break;
      case "password":
        formatError =
          "Password must be 8-30 characters, start with a letter, and include at least one digit, one special character, and one uppercase letter.";
        if (value === "") {
          errorElement.text(`${element.attr("id")} cannot be empty`);
          isValid = false;
        } else if (!regexLists[element.attr("id")].test(value)) {
          errorElement.text(formatError);
          isValid = false;
        }
        break;
      case "confirmPassword":
        formatError = "Passwords do not match";
        if (value === "") {
          errorElement.text(`${element.attr("id")} cannot be empty`);
          isValid = false;
        } else if (value !== passwordInput.val()) {
          errorElement.text(formatError);
          isValid = false;
        }
        break;
    }

    if (isValid) {
      errorElement.text("");
    }
  }

  emailInput.on("input", function () {
    Validate(emailInput, emailError);
  });

  fullNameInput.on("input", function () {
    Validate(fullNameInput, fullNameError);
  });

  phoneInput.on("input", function () {
    Validate(phoneInput, phoneError);
  });

  birthdayInput.on("input", function () {
    Validate(birthdayInput, birthdayError);
  });

  passwordInput.on("input", function () {
    Validate(passwordInput, passwordError);
  });

  confirmPasswordInput.on("input", function () {
    Validate(confirmPasswordInput, confirmPasswordError);
  });
});
