import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { deliveryCostCal } from "../ultilities/deliveryCostCal";
import classes from "./FeeCalculartor.module.css";

const FeeCalculartor = () => {
  const today = new Date();
  const [cartValue, setCartValue] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [date, setDate] = useState<Date>(today);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const toltalCost = deliveryCostCal(
      cartValue,
      distance,
      items,
      date
    ).toFixed(2);
    setDeliveryPrice(Number(toltalCost));
  };

  const resetHandler = () => {
    setDeliveryPrice(0);
  };

  const popoverCart = (
    <Popover id="popover-cart">
      <Popover.Body>
        We recommend you buy more then 10e for the lowest deilivery cost. Order
        more then 100e is free delivery.
      </Popover.Body>
    </Popover>
  );
  const popoverDeliveryDistance = (
    <Popover id="popover-distance">
      <Popover.Body>
        Base delivery fee is 2e for the first 1000m, every extra 500m cost 1e.
      </Popover.Body>
    </Popover>
  );
  const popoverItems = (
    <Popover id="popover-items">
      <Popover.Body>
        If you have more than 4 items in your cart, a surcharge will be charged
        0.5e per extra item.
      </Popover.Body>
    </Popover>
  );

  const popoverRushHours = (
    <Popover id="popover-rushHours">
      <Popover.Body>
        On Friday from 3PM - 7PM, the delivery will cost 10% more.
      </Popover.Body>
    </Popover>
  );

  return (
    <Container>
      <header className={classes.header}>
        <h1>WOLT CALCULATOR</h1>
      </header>

      <Form className={classes.form} onSubmit={(e) => submitHandler(e)}>
        <Form.Group className="mb-3" controlId="cartValue">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popoverCart}
          >
            <Form.Label>Cart Value (€) </Form.Label>
          </OverlayTrigger>

          <Form.Control
            className="text-algin-center"
            type="number"
            placeholder="Cart value"
            onChange={(e) => {
              setCartValue(+e.target.value);
            }}
            step="any"
            min="0"
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryDistance">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popoverDeliveryDistance}
          >
            <Form.Label>Delivery Distance (m)</Form.Label>
          </OverlayTrigger>
          <Form.Control
            type="number"
            placeholder="Distance"
            min="0"
            step="any"
            required={true}
            onChange={(e) => {
              setDistance(+e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="items">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popoverItems}
          >
            <Form.Label>Amount of Items </Form.Label>
          </OverlayTrigger>
          <Form.Control
            type="number"
            placeholder="Items"
            onChange={(e) => {
              setItems(+e.target.value);
            }}
            required={true}
            min="1"
            step="1"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="time">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popoverRushHours}
          >
            <Form.Label>Time</Form.Label>
          </OverlayTrigger>
          <Form.Control
            role="time"
            type="datetime-local"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setDate(date);
            }}
            required={true}
          />
        </Form.Group>

        <div className={classes.functions}>
          <h2 className={classes.total}>Deliver Price: {deliveryPrice}€ </h2>
          <div className={classes.buttons}>
            <Button variant="primary" type="submit" className={classes.button}>
              Calculate Delivery Price
            </Button>
            <Button
              onClick={resetHandler}
              variant="primary"
              type="reset"
              className={classes.button}
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default FeeCalculartor;
