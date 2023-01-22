const baseUrl = `https://www.greenbush.online/wp-json/wc/v3/products?consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;

const productContainer = document.querySelector(".grid-column");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error-message");
const perPage = document.querySelector(".per-page-items");
const selection = document.querySelector(".selection");

let allCarts = [];
let products = [];

async function getProducts(url) {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createObject(getResults);
    createHtml(getResults);
  } catch (error) {
    loader.style.display = "none";
    errorMessage.innerHTML = `<p class="error">An error occurred when loading the page. Try to reload.</p>`;
  }
}

getProducts(baseUrl);

function createHtml(objects) {
  loader.style.display = "none";
  selection.style.display = "block";
  objects.forEach(function (product) {
     console.log(product);
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

  allCarts = document.querySelectorAll(".add-cart");
  for (let i = 0; i < allCarts.length; i++) {
    allCarts[i].addEventListener("click", () => {
       cartItemsCount(products[i]);
       totalSum(products[i]);
    });
  }
}

function createObject(objects) {
  loader.style.display = "none";
  objects.forEach(function (product) {
    let price = parseInt(product.price);
    let object = {
      image: product.images[0].src,
      name: product.name,
      tag: product.tags[0].name,
      price: price,
      inCart: 0
    };
    products.push(object);
  });
}

perPage.onchange = function(event) {
   const newUrl = `https://www.greenbush.online/wp-json/wc/v3/products?per_page=${event.target.value}&consumer_key=ck_df1f7aacd0c8ed95135db309334e7e636e7c337c&consumer_secret=cs_3351be988dccae5df25609f0cfb23be0454dd554`;
   productContainer.innerHTML = "";
   getProducts(newUrl);
}

function loadingCartCount() {
  let itemNumber = localStorage.getItem("cartItemsCount");
  if (itemNumber) {
     document.querySelector(".navigation-icons span").textContent = itemNumber;
  }
}

function cartItemsCount(product) {
  let itemNumber = localStorage.getItem("cartItemsCount");
  itemNumber = parseInt(itemNumber);

  if (itemNumber) {
     localStorage.setItem("cartItemsCount", itemNumber + 1);
     document.querySelector(".navigation-icons span").textContent = itemNumber + 1;
  } else {
     localStorage.setItem("cartItemsCount", 1);
     document.querySelector(".navigation-icons span").textContent = 1;
    }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("itemNumber");
  cartItems = JSON.parse(cartItems);

  if (cartItems !=null) {
     if (cartItems[product.tag] == undefined) {
        cartItems = {
           ...cartItems,
           [product.tag]: product
        }
     }
     cartItems[product.tag].inCart += 1;
  } else {
     product.inCart = 1;
     cartItems = {
        [product.tag]: product
     }
  }
  localStorage.setItem("itemNumber", JSON.stringify(cartItems));
}

function totalSum(product) {
let cartSum = localStorage.getItem("totalSum");

if (cartSum !== null) {
  cartSum = parseInt(cartSum);
  localStorage.setItem("totalSum", cartSum + product.price);
} else {
  localStorage.setItem("totalSum", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("itemNumber");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartSum = localStorage.getItem("totalSum");
 
  if (cartItems && productContainer) {
     productContainer.innerHTML = '';
     Object.values(cartItems).map(item => {
        productContainer.innerHTML += `<div class="product border-bottom">
                                            <i class="fa-solid fa-circle-xmark"></i>
                                            <img src="${item.image}" class="drop-shadow cart-item-image">
                                            <span>${item.name}</span>
                                         </div>
                                         
                                         <div class="product-price border-bottom">${item.price},00 &#8364;</div>
                                         
                                         <div class="product-quantity border-bottom">
                                            <i class="fa-solid fa-square-minus"></i>
                                            <span>${item.inCart}</span>
                                             <i class="fa-solid fa-square-plus"></i>
                                         </div>
                                         
                                         <div class="product-total-price border-bottom">
                                            ${item.inCart * item.price},00 &#8364;
                                         </div>`;
     });

     productContainer.innerHTML += `<div class="basket-total-container">
                                      <h3 class="basket-total-title">Cart total:</h3>
                                      <h4 class="basket-total margin-bottom">${cartSum},00 &#8364;</h4>
                                   </div>
                                   <a class="button-main basket-button fw-bold margin-bottom" href="../html/payment.html">To pay</a>`;
  }
}

loadingCartCount();
displayCart();
