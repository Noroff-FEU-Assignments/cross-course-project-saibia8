const jacketContainer = document.querySelector(".grid-column1");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
// const sizeSelect = document.querySelector(".size-select");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


const url = `https://www.greenbush.online/wp-json/wc/v3/products/${id}?consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;

async function fetchJacket() {
   try {
      const response = await fetch(url);
      const details = await response.json();

      createHtml(details);
   }
   catch(error) {
      loader.style.display = "none";
      errorMessage.innerHTML = `<p class="error">An error occurred when loading the page. Try to reload.</p>`;
   }
}

fetchJacket();

function createHtml(details) {
   loader.style.display = "none";
   jacketContainer.innerHTML = `<div class="jacket-position">
                                    <i class="fa-solid fa-heart heart float-right"></i>
                                    <img class="drop-shadow single-image" 
                                    src="${details.images[0].src}" 
                                    alt="${details.images[0].alt}">
                                 </div>
                                 
                                 <div class="jacket-info">
                                    <h1 class="tt-uppercase fw-bold fs-600 inline-block">${details.name}</h1>
                                    <p class="fw-bold fs-400 margin-bottom">${details.price} kr</p>
                                 
                                    <div class="jacket-info__web">
                                    <p class="margin-bottom">${details.short_description}</p>
                                    </div>

                                    <div class="jacket-button"><a class="button button-main add-cart" href="/html/cart.html">Add to cart</a>
                                    </div>
                                 </div>`;
}

// sizeSelect.onchange() = function(event) {
//    const newUrl = url + `?attributes[0].options=${event.target.value}`;
//    console.log(newUrl);
//    jacketContainer.innerHTML = "";
//    fetchJacket(newUrl);
// }


