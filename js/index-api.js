const threeJacketsContainer = document.querySelector(".grid-row");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");

const url = `https://www.greenbush.online/wp-json/wc/v3/products?consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;

async function getProducts() {
  try {
    const response = await fetch(url);
    const jackets = await response.json();

    console.log(jackets);
    threeJacketsContainer.innerHTML = "";

    for (let i = 0; i < jackets.length; i++) {
      loader.style.display = "none";
      threeJacketsContainer.innerHTML = `<article class="card--small">
                                             <a href="/html/jacket.html?id=${jackets[7].id}">
                                                <img class="drop-shadow border-bottom" src="${jackets[7].images[0].src}" alt="${jackets[7].images[0].alt}">
                                                <a class="float-right" href="#"><i class="fa-regular fa-heart"></i></a>
                                                <div class="flex-left">
                                                   <p class="fw-bold fs-400">${jackets[7].name}</p>
                                                   <p class="fw-bold fs-400">${jackets[7].price} kr</p>
                                                </div>
                                                <a href="/html/jacket.html?id=${jackets[7].id}" class="button button-secondary margin-bottom full-width">More info</a>
                                             </a>
                                          </article>

                                          <article class="card--small">
                                             <a href="/html/jacket.html?id=${jackets[6].id}">
                                                <img class="drop-shadow border-bottom" src="${jackets[6].images[0].src}" alt="${jackets[6].images[0].alt}">
                                                <a class="float-right" href="#"><i class="fa-regular fa-heart"></i></a>
                                                <div class="flex-left">
                                                   <p class="fw-bold fs-400">${jackets[6].name}</p>
                                                   <p class="fw-bold fs-400">${jackets[6].price} kr</p>
                                                </div>
                                                <a href="/html/jacket.html?id=${jackets[6].id}" class="button button-secondary margin-bottom full-width">More info</a>
                                             </a>
                                          </article>

                                          <article class="card--small">
                                             <a href="/html/jacket.html?id=${jackets[5].id}">
                                                <img class="drop-shadow border-bottom" src="${jackets[5].images[0].src}" alt="${jackets[5].images[0].alt}">
                                                <a class="float-right" href="#"><i class="fa-regular fa-heart"></i></a>
                                                <div class="flex-left">
                                                   <p class="fw-bold fs-400">${jackets[5].name}</p>
                                                   <p class="fw-bold fs-400">${jackets[5].price} kr</p>
                                                </div>
                                                <a href="/html/jacket.html?id=${jackets[5].id}" class="button button-secondary margin-bottom full-width">More info</a>
                                             </a>
                                          </article>`;
    }
  } catch (error) {
    loader.style.display = "none";
    errorMessage.innerHTML = `<p class="error">An error occurred when loading the page. Try to reload.</p>`;
  }
}

getProducts();
