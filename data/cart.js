export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
            
    let matchingItem = "";
    const selectedQuantity = document.querySelector(`.select-quantiy-${productId}`);
   // const selectedSize = document.querySelector(`.select-size-${productId}`);

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += Number(selectedQuantity.value);
    } else {
            cart.push({
            productId: productId,
            quantity: Number(selectedQuantity.value),
            deliveryOptionId: "1"
        });
    };

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((item) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = "";

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}