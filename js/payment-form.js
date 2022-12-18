const form = document.querySelector("#paymentForm");

const card = document.querySelector("#cards");
const cardError = document.querySelector("#cardError");

const personName = document.querySelector("#name");
const personNameError = document.querySelector("#nameError");

const cardNumber = document.querySelector("#cardNumber");
const cardNumberError = document.querySelector("#cardNumberError");

const cardExpireMonth = document.querySelector("#expireMonth");
const cardExpireMonthError = document.querySelector("#expireMonthError");

const cardExpireYear = document.querySelector("#expireYear");
const cardExpireYearError = document.querySelector("#expireYearError");

const ccvNumber = document.querySelector("#ccvNumber");
const ccvNumberError = document.querySelector("#ccvNumberError");


function validateForm(event) {
   
   event.preventDefault();

   if(checkCardNumberCount(card.value, 01, 03) === true) {
      cardError.style.display = "none";
   } else {
      cardError.style.display = "block";
   }

   if(checkLength(personName.value, 0) === true) {
       personNameError.style.display = "none";
   } else {
       personNameError.style.display = "block";
   }
  
   if(checkCardNumberCount(cardNumber.value, 13, 19) === true) {
      cardNumberError.style.display = "none";
   } else {
      cardNumberError.style.display = "block";
   }

   if(checkCardNumberCount(cardExpireMonth.value, 01, 12) === true) {
      console.log(cardExpireMonth.value);
      cardExpireMonthError.style.display = "none";
   } else {
      cardExpireMonthError.style.display = "block";
   }

   if(checkCardNumberCount(cardExpireYear.value, 01, 33) === true) {
      console.log(cardExpireYear.value);
      cardExpireYearError.style.display = "none";
   } else {
      cardExpireYearError.style.display = "block";
   }

   if(checkLength(ccvNumber.value, 2) === true) {
      ccvNumberError.style.display = "none";
   } else {
      ccvNumberError.style.display = "block";
   } 

   if ((checkCardNumberCount(card.value, 01, 03)) === true && (checkLength(personName.value, 0)) === true && (checkCardNumberCount(cardNumber.value, 13, 19)) === true && (checkCardNumberCount(cardExpireMonth.value, 01, 12)) === true && (checkLength(ccvNumber.value, 2)) === true) {
      window.location.href = "shipping.html";
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

function checkCardNumberCount(value, minimumLength, maxLength) {
   if((value.trim().length >= minimumLength) && (value.trim().length <= maxLength)) {
       return true;
   } else {
       return false;
   }
}




      





 





