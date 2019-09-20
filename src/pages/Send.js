import styled, { keyframes } from 'styled-components';
import React from 'react';
import CenteredContainer from "../components/CenteredContainer";
import Heading from "../components/Heading";
import API from '../util/API';
import { CURRENCY, MY_ADDRESS, MY_SECRET } from '../util/constants';
import { submitTransaction } from '../util/submitTransaction';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-top: 1rem;
`;

const Fieldset = styled.fieldset`
  display: flex;
  width: 100%;
  border: 0;
  padding: 0;

  &[disabled] {
    opacity: 0.5;
  }
  &::before {
    height: 10px;
    content: "";
    display: none;
    background-image: linear-gradient(
      to right,
      var(--lightBlue) 0%,
      var(--blue) 50%,
      var(--darkBlue) 100%
    );
  }
  &[aria-busy="true"]::before {
    display: block;
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }
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

const order = {
  source: {
    address: MY_ADDRESS,
    maxAmount: {
      currency: CURRENCY,
    }
  },
  destination: {
    amount: {
      currency: CURRENCY,
    }
  }
}

const ledgerOffset = 5;
const myInstructions = { maxLedgerVersionOffset: ledgerOffset };

export default function Send() {
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState(null);
  const [orderSuccessful, setOrderSuccessful] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    order.source.maxAmount.value = amount;
    order.destination.address = destination;
    order.destination.amount.value = amount;

    API.connect()
      .then(() => {
        setPaymentStatus("Preparing transaction...")
        return API.preparePayment(MY_ADDRESS, order, myInstructions);
      })
      .then(prepared => {
        setPaymentStatus("Transaction prepared...");
        return API.getLedger().then(ledger => {
          console.log("Current Ledger", ledger.ledgerVersion);
          setPaymentStatus("Submitting transaction...")
          return submitTransaction(ledger.ledgerVersion, prepared, MY_SECRET);
        })
      })
      .then(() => {
        setPaymentStatus("Transaction submitted and verified!");
        setOrderSuccessful(true);
        setAmount("");
        setDestination("");
        API.disconnect().then(() => {
          console.log("Disconnected");
        });
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.error(e);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
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
      <Form onSubmit={handleSubmit}>
        {(loading || orderSuccessful) && <p>{paymentStatus}</p>}
        <Fieldset disabled={loading} aria-busy={loading}>
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