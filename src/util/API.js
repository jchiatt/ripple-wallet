import { RippleAPI } from 'ripple-lib';
import { SERVER } from './constants';

const API = new RippleAPI({ 
  server: SERVER
});

export default API;