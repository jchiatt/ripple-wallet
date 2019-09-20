import React from 'react';
import styled from 'styled-components';
import CenteredContainer from "../components/CenteredContainer";
import Heading from "../components/Heading";

const Form = styled.form`
  width: 100%;
`;

const Fieldset = styled.fieldset`
  display: flex;
  width: 100%;
  border: none;
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  padding-left: 1rem;
`;

const Button = styled.button`
  margin: 2rem auto;
  padding: 1rem 2rem;
  box-shadow: 4px 4px 0px 0px var(--darkBlue);
  color: var(--darkBlue);
  background: white;
  font-size: 1rem;
  font-weight: bold;
`;

export default function Send() {
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [destination, setDestination] = React.useState("");

  function handleChange(e) {
    const { name, type, value } = e.target;
    if (name === "amount") {
      setAmount(value);
    }
    if (name === "destination") {
      setDestination(value);
    }
  }

  return (
    <CenteredContainer>
      <Heading>Send Funds</Heading>
      <Form>
        <Fieldset disabled={loading}>
          <label htmlFor="amount">
            <Input
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              required
              onChange={handleChange}
              value={amount}
            />
          </label>
          <label htmlFor="destination">
            <Input
              type="text"
              name="destination"
              id="destination"
              placeholder="Destination Address"
              required
              onChange={handleChange}
              value={destination}
            />
          </label>
          <Button type="submit">Send Funds</Button>
        </Fieldset>
      </Form>
    </CenteredContainer>
  );
}