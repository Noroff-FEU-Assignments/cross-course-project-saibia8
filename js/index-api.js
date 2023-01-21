const threeJacketsContainer = document.querySelector(".grid-row");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");

const url = `https://www.greenbush.online/wp-json/wc/v3/products?consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;

async function getProducts() {
   try {
     const response = await fetch(url);
     const getResults = await response.json();
     createHtml(getResults);
   } catch (error) {
     loader.style.display = "none";
     errorMessage.innerHTML = `<p class="error">An error occurred when loading the page. Try to reload.</p>`;
   }
 }

 getProducts();

 function createHtml(products) {
   loader.style.display = "none";
   products.forEach(function (product) {
      threeJacketsContainer.innerHTML += ` <article class="card--small">
                                             <a>
                                             <img class="drop-shadow border-bottom" src="${product.images[0].src}">
                                             </a>     
                                          </article>`;
   });
 }