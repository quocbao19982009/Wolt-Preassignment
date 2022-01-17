import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import App from "./App";

describe("testing correct calculation", () => {
  test("Example calculation (20e, 2235m, 4 items, Sunday)", () => {
    render(<App />);
    // get Input
    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "20");
    userEvent.type(deliveryDistanceInput, "2235");
    userEvent.type(itemsInput, "4");
    fireEvent.change(timeInput, { target: { value: "2022-01-23T16:29" } });

    // Press calulcate button
    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 5€");
  });
  test("Cart Value over 100e, delivery cost free (101e, 2235m, 4 items, Sunday)", () => {
    render(<App />);
    // get Input
    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "101");
    userEvent.type(deliveryDistanceInput, "2235");
    userEvent.type(itemsInput, "4");
    userEvent.type(timeInput, "2022-01-23T16:29");

    // Press calulcate button
    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 0€");
  });
  test("Cart Value under 10e, (8.9e, 2235m, 4 items, Sunday)", () => {
    render(<App />);
    // get Input
    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "8.9");
    userEvent.type(deliveryDistanceInput, "2235");
    userEvent.type(itemsInput, "4");
    userEvent.type(timeInput, "2022-01-23T16:29");

    // Press calulcate button
    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 6.1€");
  });
  test("On Friday Rush Hour, (20e, 2235m, 4 items, Friday (16:00))", () => {
    render(<App />);
    // get Input
    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "20");
    userEvent.type(deliveryDistanceInput, "2235");
    userEvent.type(itemsInput, "4");
    fireEvent.change(timeInput, { target: { value: "2022-01-14T16:29" } });

    // Press calulcate button

    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 5.5€");
  });
  test("6 Extra items, (20e, 2235m, 6 items, Sunday)", () => {
    render(<App />);

    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "20");
    userEvent.type(deliveryDistanceInput, "2235");
    userEvent.type(itemsInput, "6");
    fireEvent.change(timeInput, { target: { value: "2022-01-23T16:29" } });

    // Press calulcate button

    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 6€");
  });
  test("Combine many conditions (8.9e, 2000m, 7 items, Friday rush hours)", () => {
    render(<App />);

    const cartValueInput = screen.getByRole("spinbutton", {
      name: "Cart Value (€)",
    });
    const deliveryDistanceInput = screen.getByRole("spinbutton", {
      name: "Delivery Distance (m)",
    });
    const itemsInput = screen.getByRole("spinbutton", {
      name: "Amount of Items",
    });
    const timeInput = screen.getByLabelText("Time");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate Delivery Price",
    });
    const deliveryPriceDisplay = screen.getByText("Deliver Price:", {
      exact: false,
    });

    // clear all Input before type
    userEvent.clear(cartValueInput);
    userEvent.clear(deliveryDistanceInput);
    userEvent.clear(itemsInput);
    userEvent.clear(timeInput);

    // Type data into input
    userEvent.type(cartValueInput, "8.9");
    userEvent.type(deliveryDistanceInput, "2000");
    userEvent.type(itemsInput, "7");
    fireEvent.change(timeInput, { target: { value: "2022-01-14T18:04" } });

    // Press calulcate button

    userEvent.click(calculateButton);

    // expactation
    expect(deliveryPriceDisplay).toHaveTextContent("Deliver Price: 7.26€");
  });
});
