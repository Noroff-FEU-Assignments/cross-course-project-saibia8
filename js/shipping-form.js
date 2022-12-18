const form = document.querySelector("#shippingForm");

const personName = document.querySelector("#name");
const personNameError = document.querySelector("#nameError");

const shippingAddress = document.querySelector("#address");
const shippingAddressError = document.querySelector("#shippingAddressError");

const country = document.querySelector("#country");
const countryError = document.querySelector("#countryError");

const countryCode = document.querySelector("#countryCode");
const countryCodeError = document.querySelector("#countryCodeError");

const phoneNumber = document.querySelector("#phoneNumber");
const phoneNumberError = document.querySelector("#phoneNumberError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");


function validateForm(event) {
    
   event.preventDefault();

   if(checkLength(personName.value, 0) === true) {
       personNameError.style.display = "none";
   } else {
       personNameError.style.display = "block";
   }

   if(checkLength(shippingAddress.value, 2) === true) {
      shippingAddressError.style.display = "none";
   } else {
      shippingAddressError.style.display = "block";
   }
  
   if(checkLength(country.value, 0) === true) {
      countryError.style.display = "none";
   } else {
      countryError.style.display = "block";
   }

   if(checkLength(countryCode.value, 3) === true) {
      countryCodeError.style.display = "none";
   } else {
      countryCodeError.style.display = "block";
   }

   if(checkLength(phoneNumber.value, 7) === true) {
      phoneNumberError.style.display = "none";
   } else {
      phoneNumberError.style.display = "block";
   }

   if(validateEmail(email.value) === true) {
      emailError.style.display = "none";
   } else {
      emailError.style.display = "block";
   }

   if ((checkLength(personName.value, 0)) === true && (checkLength(shippingAddress.value, 2)) === true && (checkLength(country.value, 0)) === true && (checkLength(countryCode.value, 3)) === true && (checkLength(phoneNumber.value, 7)) === true && (validateEmail(email.value)) === true) {
      window.location.href = "completed.html";
   }
}

form.addEventListener("submit", validateForm);

function checkLength(value, minimumLength) {
   if(value.trim().length > minimumLength) {
       return true;
   } else {
       return false;
   }
}

function validateEmail(email) {
   const regEx = /\S+@\S+\.\S+/;
   const patternMatches = regEx.test(email);
   return patternMatches;
}




