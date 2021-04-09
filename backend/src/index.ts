require('dotenv').config();

import { AddressInfo } from 'net';
import app from './app';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  let address: string = (server.address() as AddressInfo).address;
  const IPv6FillerAddress: string = '::';
  address = address === IPv6FillerAddress ? 'localhost' : address;
  console.log(`Listening at: http://${address}:${PORT}`);
});