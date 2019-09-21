import { MY_ADDRESS } from "./constants";
import API from "./API";

export function getAccountInfo(setBalance) {
  API.connect()
    .then(() => {
      console.log(`Getting account info for ${MY_ADDRESS}`);
      return API.getAccountInfo(MY_ADDRESS);
    })
    .then(info => {
      console.info({ info });
      setBalance(info.xrpBalance);
    })
    .catch(console.error);

  return () => {
    API.disconnect();
  };
}
