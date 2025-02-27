 import {products, loadProducts} from '../data/products.js';
 import {cart, addToCart} from '../data/cart.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPriceUrl()}
            </div>

            <div class="product-quantity-container">
              <select class="select-quantiy-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
               <div class="extra-info">${product.extraInfoHTML()}</div>
            </div>

           

            <div class="product-spacer"></div>

            <div class="added-to-cart hidden add-message-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`

  });

  document.querySelector(".products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", () => {
          const productId = button.dataset.productId;

          
          addToCart(productId);

          const addedToCart = document.querySelector(`.add-message-${productId}`);

          addedToCart.classList.remove("hidden")
          setTimeout(() => {addedToCart.classList.add("hidden")}, 3000);
          
          updateCartQuantity();
      }); 
  });

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    })

    document.querySelector(".cart-quantity").innerHTML = `${cartQuantity}`
  };

  updateCartQuantity();

}