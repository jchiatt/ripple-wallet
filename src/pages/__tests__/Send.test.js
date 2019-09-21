import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Send from "../Send";
import { render, fireEvent, wait } from "@testing-library/react";
import { TEST_DESTINATION } from "../../util/constants";

test('renders a number input with a label "Amount"', () => {
  const { getByTestId } = render(<Send />);
  const input = getByTestId("amount-input");
  expect(input).toHaveAttribute("type", "number");
});

test('renders a text input with a label "Destination"', () => {
  const { getByTestId } = render(<Send />);
  const input = getByTestId("destination-input");
  expect(input).toHaveAttribute("type", "text");
});

test("allows you to enter an amount and an address", () => {
  const { getByTestId } = render(<Send />);
  const amountInput = getByTestId("amount-input");
  const destinationInput = getByTestId("destination-input");
  fireEvent.change(amountInput, {
    target: {
      name: "amount",
      value: "0.001"
    }
  });
  fireEvent.change(destinationInput, {
    target: {
      name: "destination",
      value: TEST_DESTINATION
    }
  });
  expect(amountInput.value).toBe("0.001");
  expect(destinationInput.value).toBe(TEST_DESTINATION);
});

jest.setTimeout(10000);
test("successfully submits a payment", async () => {
  const { getByTestId } = render(<Send />);
  const amountInput = getByTestId("amount-input");
  const destinationInput = getByTestId("destination-input");
  const submitBtn = getByTestId("send-funds-button");

  fireEvent.change(amountInput, {
    target: {
      name: "amount",
      value: "0.001"
    }
  });
  fireEvent.change(destinationInput, {
    target: {
      name: "destination",
      value: TEST_DESTINATION
    }
  });

  expect(amountInput.value).toBe("0.001");
  expect(destinationInput.value).toBe(TEST_DESTINATION);

  fireEvent.click(submitBtn);
  await wait(async () => {
    const paymentStatus = getByTestId("payment-status");
    expect(paymentStatus).toHaveTextContent(/submitting/i);

    await wait(() => {
      const paymentStatus = getByTestId("payment-status");
      expect(paymentStatus).toHaveTextContent(/submitted/i);
    });
  });
});
