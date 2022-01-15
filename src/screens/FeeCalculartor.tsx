import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
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

  console.log("Begin");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const toltalCost = deliveryCostCal(
      cartValue,
      distance,
      items,
      date
    ).toFixed(2);
    setDeliveryPrice(Number(toltalCost));
    console.log("calculate");
  };

  const resetHandler = () => {
    setCartValue(0);
    setDistance(0);
    setItems(0);
    setDeliveryPrice(0);
    setDate(today);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Cart Value</Popover.Header>
      <Popover.Body>
        We recommend you buy more then 10e for the lowest deilivery cost. Order
        more then 100e is free delivery
      </Popover.Body>
    </Popover>
  );

  const Example = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="success">Click me to see</Button>
    </OverlayTrigger>
  );

  return (
    <Container>
      <header className={classes.header}>
        <h1>WOLT CALCULATOR</h1>
      </header>

      <Form className={classes.form} onSubmit={(e) => submitHandler(e)}>
        <Form.Group className="mb-3" controlId="cartValue">
          <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
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
            value={cartValue}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryDistance">
          <Form.Label>Delivery Distance (m)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Distance"
            min="0"
            required={true}
            onChange={(e) => {
              setDistance(+e.target.value);
            }}
            value={distance}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="items">
          <Form.Label>Amount of Items </Form.Label>
          <Form.Control
            type="number"
            placeholder="Items"
            onChange={(e) => {
              setItems(+e.target.value);
            }}
            required={true}
            min="0"
            step="1"
            value={items}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryDistance">
          <Form.Label>Time</Form.Label>
          <Form.Control
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
            <Button variant="primary" type="reset" className={classes.button}>
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default FeeCalculartor;
