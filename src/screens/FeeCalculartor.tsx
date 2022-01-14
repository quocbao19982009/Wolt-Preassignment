import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const FeeCalculartor = () => {
  const today = new Date();

  const [cartValue, setCartValue] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [date, setDate] = useState<Date>(today);

  // Friday  date.getDay() = 5
  //   console.log(date.getDay());
  //   3PM - 7PM
  //   console.log(date.getHours());

  let totalDeliveryFree = 0;

  console.log("BEGIN");

  let surcharge = 0;

  const calculatingMethod = () => {
    //   base Delivery cost = 2
    // Handle Cart Value surcharge
    if (cartValue < 10) {
      surcharge = surcharge + 10 - +cartValue;
    }
    console.log("after Cart Value", surcharge);
    // Handle Delivery Distance
    const extraDistance = (distance - 1000) / 1000;
    console.log("extraDistance km", extraDistance);

    let deliveryCost = 2;
    if (extraDistance > 0) {
      if (extraDistance % 0.5 === 0) {
        deliveryCost = deliveryCost + extraDistance / 0.5;
      } else {
        deliveryCost = deliveryCost + Math.trunc(extraDistance / 0.5) + 1;
      }
      console.log("deliveryCost", deliveryCost);
    }

    surcharge = surcharge + deliveryCost;

    // Handle Order Items
    if (items >= 5) {
      let extraItems = 0.5 * (items - 5);
      surcharge = extraItems + surcharge;
      console.log("Extra Items cost", extraItems);
    }

    // console.log("friday", date.getDay() === 5);
    // console.log("Time", date.getUTCHours());
    // console.log(
    //   "after 3Pm",
    //   +date.toLocaleString("en-US", { hour: "numeric", hour12: false })
    // );
    // console.log(
    //   "before 7Pm",
    //   +date.toLocaleString("en-US", { hour: "numeric", hour12: false }) < 19
    // );

    if (
      date.getDay() === 5 &&
      +date.toLocaleString("en-US", { hour: "numeric", hour12: false }) > 15 &&
      +date.toLocaleString("en-US", { hour: "numeric", hour12: false }) < 19
    ) {
      surcharge = surcharge * 1.1;
    }

    if (surcharge > 15) {
      surcharge = 15;
    }

    if (cartValue >= 100) {
      surcharge = 0;
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    calculatingMethod();
    setDeliveryPrice(surcharge);
  };

  return (
    <Container>
      <Form
        className="mt-5 text-algin-center"
        onSubmit={(e) => submitHandler(e)}
      >
        <Form.Group className="mb-3" controlId="cartValue">
          <Form.Label>Cart Value (€) </Form.Label>

          <Form.Control
            className="text-algin-center"
            type="number"
            placeholder="20"
            onChange={(e) => {
              setCartValue(+e.target.value);
            }}
            step="any"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryDistance">
          <Form.Label>Delivery Distance (m)</Form.Label>
          <Form.Control
            type="number"
            placeholder="900"
            onChange={(e) => {
              setDistance(+e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="items">
          <Form.Label>Amount of Items </Form.Label>
          <Form.Control
            type="number"
            placeholder="1"
            onChange={(e) => {
              setItems(+e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryDistance">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="today"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setDate(date);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Calculate Delivery Price
        </Button>
      </Form>
      <h2>Deliver Price: {deliveryPrice.toFixed(2)}</h2>
    </Container>
  );
};

export default FeeCalculartor;
