export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceInNaira: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceInNaira: 30299,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceInNaira: 50000,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
