const baseUrl = `https://www.greenbush.online/wp-json/wc/v3/products?consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;

const productContainer = document.querySelector(".grid-column");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error-message");
const perPage = document.querySelector(".per-page-items");

async function getProducts(url) {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createHtml(getResults);
  } catch (error) {
    loader.style.display = "none";
    errorMessage.innerHTML = `<p class="error">An error occurred when loading the page. Try to reload.</p>`;
  }
}

getProducts(baseUrl);

function createHtml(products) {
  loader.style.display = "none";
  products.forEach(function (product) {
       productContainer.innerHTML += `<div class="card">
                                       <a href="/html/jacket.html?id=${product.id}">
                                          <i class="fa-solid fa-heart heart float-right"></i>
                                          <div class="card-flex">
                                             <img class="drop-shadow" src="${product.images[0].src}" alt="${product.images[0].alt}">
                                             <h2 class="fw-bold fs-500 text-primary-400 text-center">${product.name}</h2>
                                             <p class="fw-bold fs-400 margin-bottom text-primary-400 text-center">${product.price} kr</p>
                                             <a class="button button-secondary margin-bottom" href="/html/jacket.html?id=${product.id}">More info</a>
                                             <a class="button button-main add-cart" href="#">Add to cart</a>
                                          </div>
                                       </a>
                                    </div>`;
  });
}

perPage.onchange = function(event) {
   const newUrl = `https://www.greenbush.online/wp-json/wc/v3/products?per_page=${event.target.value}&consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;
   productContainer.innerHTML = "";
   getProducts(newUrl);
}

