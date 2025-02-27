import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";

import { products, getProductId } from "../../data/products.js";

import { formatCurrency } from "../utility/price.js";

import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryoption.js";

import { renderPaymentSumary } from "./payment.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((item) => {
    const productId = item.productId;

    const matchingProduct = getProductId(productId);

    const deliveryOptionId = item.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd MMMM D");


    cartSummaryHTML += `
        <div class="cart-item-container js-container-checkout-${
          matchingProduct.id
        }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${matchingProduct.getPriceUrl()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label-${
                      matchingProduct.id
                    }">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary" data-product-id="${
                      matchingProduct.id
                    }">
                    Update
                    </span>
                    <input type="number" class="input-quantity input-${
                      matchingProduct.id
                    }">
                    <span class="save-inputed-quantity link-primary" data-product-id="${
                      matchingProduct.id
                    }">Save</span>
                    <span class="delete-quantity-link link-primary" data-product-id="${
                      matchingProduct.id
                    }">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(matchingProduct, item)}
                </div>
            </div>
        </div>
        `;
  });

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  const clearOrder = document.querySelectorAll(".delete-quantity-link");

  clearOrder.forEach((order) => {
    order.addEventListener("click", () => {
      const productId = order.dataset.productId;

      removeFromCart(productId);

      const checkOutContainer = document.querySelector(
        `.js-container-checkout-${productId}`
      );
      checkOutContainer.remove();

      updateCartQuantity();

      renderPaymentSumary();
    });
  });

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(
      ".return-to-home-link"
    ).innerHTML = `${cartQuantity}`;
  }

  updateCartQuantity();

  document.querySelectorAll(".update-quantity-link").forEach((update) => {
    update.addEventListener("click", () => {
      const productId = update.dataset.productId;

      const updateQuantity = document.querySelector(
        `.js-container-checkout-${productId}`
      );

      updateQuantity.classList.add("edited-quantity");
    });
  });

  document.querySelectorAll(".save-inputed-quantity").forEach((save) => {
    save.addEventListener("click", () => {
      const productId = save.dataset.productId;

      const saveUpdate = document.querySelector(
        `.js-container-checkout-${productId}`
      );

      saveUpdate.classList.remove("edited-quantity");

      const input = document.querySelector(`.input-${productId}`);

      const newQuantity = Number(input.value);

      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.quantity-label-${productId}`
      );

      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();

      renderPaymentSumary();
    });
  });

  function deliveryOptionsHTML(matchingProduct, item) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd MMMM D");

      const priceString =
        deliveryOption.priceInNaira === 0
          ? "FREE"
          : `₦${formatCurrency(deliveryOption.priceInNaira)} -`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;

      html += `
                <div class="delivery-option" data.product-id="${
                  matchingProduct.id
                }" data.delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                    </div>
                </div>
                `;
    });
    return html;
  }

  document.querySelectorAll(".delivery-option-input").forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      const {productId, deliveryOptionId} = optionElement.dataset;

      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSumary();
    });
  });
}
