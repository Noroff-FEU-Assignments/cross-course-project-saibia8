let allCarts = document.querySelectorAll(".add-cart");

let products = [   
   {
      name: "Men's rain jacket",
      tag: "mensrainjacket",
      price: 44,
      inCart: 0
   },
   {
      name: "Regatta jacket",
      tag: "regattajacket",
      price: 32,
      inCart: 0
   },
   {
      name: "Orange jacket",
      tag: "orangejacket",
      price: 26,
      inCart: 0
   }
]

for (let i = 0; i < allCarts.length; i++) {
   allCarts[i].addEventListener("click", () => {
      cartItemsCount(products[i]);
      totalSum(products[i]);
   });
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
                                             <img src="../images/${item.tag}.png" class="drop-shadow cart-item-image">
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