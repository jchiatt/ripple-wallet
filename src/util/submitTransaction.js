import API from './API';

export function submitTransaction(lastClosedLedgerVersion, prepared, secret) {
  const signedData = API.sign(prepared.txJSON, secret);
  return API.submit(signedData.signedTransaction).then(data => {
    console.log("Tentative Result: ", data.resultCode);
    console.log("Tentative Message: ", data.resultMessage);
    /* The tentative result should be ignored. Transactions that succeed here can ultimately fail,
       and transactions that fail here can ultimately succeed. */

    /* Begin validation workflow */
    const options = {
      minLedgerVersion: lastClosedLedgerVersion,
      maxLedgerVersion: prepared.instructions.maxLedgerVersion
    };
    return new Promise((resolve, reject) => {
      setTimeout(
        () => verifyTransaction(signedData.id, options).then(resolve, reject),
        1000
      );
    });
  });
}

export function verifyTransaction(hash, options) {
  console.log("Verifying Transaction");
  return API.getTransaction(hash, options)
    .then(data => {
      console.log("Final Result: ", data.outcome.result);
      console.log("Validated in Ledger: ", data.outcome.ledgerVersion);
      console.log("Sequence: ", data.sequence);
      return data.outcome.result === "tesSUCCESS";
    })
    .catch(error => {
      /* If transaction not in latest validated ledger,
       try again until max ledger hit */
      if (error instanceof API.errors.PendingLedgerVersionError) {
        return new Promise((resolve, reject) => {
          setTimeout(
            () => verifyTransaction(hash, options).then(resolve, reject),
            1000
          );
        });
      }
      return error;
    });
}
