enum FridayRushHour {
  Friday = 5,
  Start3PM = 15,
  End7Pm = 19,
}

export const deliveryCostCal = (
  cartValue: number,
  distance: number,
  items: number,
  date: Date
): number => {
  let totalDeliveryCost = 0;
  const minimumCartValue = 10;
  const defaultDeliveryFee = 2;
  const addtionalDeliveryCost = 1 / 500;
  const maximumFreeItemsNumber = 4;
  const additionItemsNumberCost = 0.5;
  const maximumSurcharge = 15;
  const maximumCartValue = 100;
  const rushHourCost = 1.1;

  // CartValue > maximumCartValue (100e)
  if (cartValue >= maximumCartValue) {
    totalDeliveryCost = 0;
    return totalDeliveryCost;
  }

  // if Cart Value < minimumCartValue (10e)
  if (cartValue < minimumCartValue) {
    totalDeliveryCost = totalDeliveryCost + minimumCartValue - cartValue;
  }

  // Delivery Fee Cost
  let deliveryFeeCost: number = defaultDeliveryFee;

  const extraDistance = distance - 1000;
  if (extraDistance > 0) {
    if (extraDistance % (1 / addtionalDeliveryCost) === 0) {
      deliveryFeeCost =
        defaultDeliveryFee + extraDistance * addtionalDeliveryCost;
    } else {
      deliveryFeeCost =
        defaultDeliveryFee +
        Math.trunc(extraDistance * addtionalDeliveryCost + 1);
    }
  }
  totalDeliveryCost = totalDeliveryCost + deliveryFeeCost;

  // Surchage for Items Number
  let surchageItemsNumber: number;

  if (items > maximumFreeItemsNumber) {
    surchageItemsNumber =
      additionItemsNumberCost * (items - maximumFreeItemsNumber);
    totalDeliveryCost = totalDeliveryCost + surchageItemsNumber;
  }

  // Friday Rush Hours
  const selectedTime = +date.toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
  });

  if (
    date.getDay() === FridayRushHour.Friday &&
    selectedTime >= FridayRushHour.Start3PM &&
    selectedTime <= FridayRushHour.End7Pm
  ) {
    totalDeliveryCost = totalDeliveryCost * rushHourCost;
  }

  // Special Case
  // Delivery Cost > 15
  if (totalDeliveryCost > maximumSurcharge) {
    totalDeliveryCost = maximumSurcharge;
  }

  return totalDeliveryCost;
};

// const calculatingMethod = () => {
//   //   base Delivery cost = 2
//   // Handle Cart Value surcharge
//   if (cartValue < 10) {
//     surcharge = surcharge + 10 - +cartValue;
//   }
//   console.log("after Cart Value", surcharge);
//   // Handle Delivery Distance
//   const extraDistance = (distance - 1000) / 1000;
//   console.log("extraDistance km", extraDistance);

//   let deliveryCost = 2;
//   if (extraDistance > 0) {
//     if (extraDistance % 0.5 === 0) {
//       deliveryCost = deliveryCost + extraDistance / 0.5;
//     } else {
//       deliveryCost = deliveryCost + Math.trunc(extraDistance / 0.5) + 1;
//     }
//     console.log("deliveryCost", deliveryCost);
//   }

//   surcharge = surcharge + deliveryCost;

//   // Handle Order Items
//   if (items >= 5) {
//     let extraItems = 0.5 * (items - 5);
//     surcharge = extraItems + surcharge;
//     console.log("Extra Items cost", extraItems);
//   }

//   if (
//     date.getDay() === 5 &&
//     +date.toLocaleString("en-US", { hour: "numeric", hour12: false }) > 15 &&
//     +date.toLocaleString("en-US", { hour: "numeric", hour12: false }) < 19
//   ) {
//     surcharge = surcharge * 1.1;
//   }

//   if (surcharge > 15) {
//     surcharge = 15;
//   }

//   if (cartValue >= 100) {
//     surcharge = 0;
//   }
// };
