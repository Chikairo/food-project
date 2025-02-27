import {renderOrderSummary} from "./checkout/order.js";
import {renderPaymentSumary} from "./checkout/payment.js";
import { loadProducts } from "../data/products.js";

loadProducts( () => {
    renderOrderSummary();

    renderPaymentSumary();
});

