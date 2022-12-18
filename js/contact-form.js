const successfulMessage = document.querySelector(".successful-form");
const form = document.querySelector("#contactForm");

const personName = document.querySelector("#name");
const personNameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");


function validateForm(event) {
    
   event.preventDefault();

   if(checkLength(personName.value, 0) === true) {
       personNameError.style.display = "none";
   } else {
       personNameError.style.display = "block";
   }
  
   if(validateEmail(email.value) === true) {
       emailError.style.display = "none";
   } else {
       emailError.style.display = "block";
   }

   if(checkLength(message.value, 9) === true) {
       messageError.style.display = "none";
   } else {
       messageError.style.display = "block";
   }
   
   if ((personName.value) && (message.value.length > 9) && (email.value)) {
       successfulMessage.innerHTML += `<p>Your message has been sent.</p>`;
       successfulMessage.style.display = "block";
   }
   
   form.reset();
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

