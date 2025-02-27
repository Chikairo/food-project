import { formatCurrency } from "../script/utility/price.js";

export function getProductId(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceInNaira;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceInNaira = productDetails.priceInNaira;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPriceUrl() {
    return `₦${formatCurrency(this.priceInNaira)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

class Drinks extends Product {
  keywords;

  constructor(productDetails) {
    super(productDetails);
    this.keywords = productDetails.keywords;
  }

  extraInfoHTML() {
    return `
     <select class="select-size-${this.id}">
      <option selected value="1">50cl</option>
      <option value="2">35cl</option>
      <option value="3">75cl</option>
      <option value="4">1litre</option>
      <option value="5">1.5litre</option>
    </select>
    `;
  }
}

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "drinks") {
        return new Drinks(productDetails);
      }
      return new Product(productDetails);
    });
    fun();
  });

  xhr.open("GET", "/backend/products.json");
  xhr.send();
}
