import { cart } from "../../data/cart.js";
import { getProductId } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoption.js";
import { formatCurrency } from "../utility/price.js";

export function renderPaymentSumary() {
  let productpriceInNaira = 0;

  let shipppingpriceInNaira = 0;


   

  cart.forEach((item) => {
    const product = getProductId(item.productId);
    productpriceInNaira += product.priceInNaira * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);

    shipppingpriceInNaira = deliveryOption.priceInNaira;
  });

  const totalBeforeTaxInCents = productpriceInNaira + shipppingpriceInNaira;
  const taxInCents = totalBeforeTaxInCents * 0.05;

  const totalInCents = totalBeforeTaxInCents + taxInCents;

  const paymentHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<span class="payment-quantity"></span>):</div>
            <div class="payment-summary-money">₦${formatCurrency(
              productpriceInNaira
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₦${formatCurrency(
              shipppingpriceInNaira
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₦${formatCurrency(
              totalBeforeTaxInCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (5%):</div>
            <div class="payment-summary-money">${formatCurrency(
              taxInCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₦${formatCurrency(
              totalInCents
            )}</div>
          </div>

          <a href="orders.html"><button class="place-order-button button-primary">
            Place your order
          </button></a> `;

  document.querySelector(".payment-summary").innerHTML = paymentHTML;

  let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

  document.querySelector(".payment-quantity").innerHTML = `${cartQuantity}`;
}
