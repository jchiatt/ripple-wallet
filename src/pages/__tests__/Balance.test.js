import { toHaveTextContent } from "@testing-library/jest-dom";
import React from "react";
import Balance from "../Balance";
import { render } from "@testing-library/react";

expect.extend({ toHaveTextContent });

test("renders a loading state on initial render", () => {
  const { container } = render(<Balance />);

  expect(container.querySelector("p")).toHaveTextContent(/loading.../i);
});

test("fetches account info", () => {
  const mockGetAccountInfo = jest.fn(setBalance => {
    setBalance("300");
  });

  const { getByTestId } = render(<Balance getInfo={mockGetAccountInfo} />);

  expect(getByTestId("balance-amount")).toHaveTextContent("300");
  expect(getByTestId("balance-currency")).toHaveTextContent(/xrp/i);
});
