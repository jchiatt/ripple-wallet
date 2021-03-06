# Ripple Wallet

A proof-of-concept wallet for XRP. Uses a pre-determined TestNet address. **This is not currently ready for production. Use only for educational purposes.**

## Setup (for development)

1. Install dependencies (`yarn`)
2. `yarn start` will start the development server

## Useful Commands

To run the tests:

```
yarn test
```

To format the codebase with Prettier:

```
yarn format
```

## Project Structure

```bash

├── public // static assets
├── src // where all the magic happens
│   ├── components // UI components
│   ├── pages // top-level screens of the app
│   └── util // utility functions
```

## Usage

To fork and use yourself, you'll need to create a test wallet.

Be sure to set up the following environment variables:

```
REACT_APP_TESTNET_URL // the TestNet server
REACT_APP_TEST_ADDRESS // the wallet address you generate
REACT_APP_TEST_SECRET // the wallet secret you generate
REACT_APP_TEST_DESTINATION_ADDRESS // another test address to send payments to
```
