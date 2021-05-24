import { registerAs } from '@nestjs/config';

export default registerAs('cryptocompare', () => {
  return ({
    key: process.env.CRYPTO_COMPARE_KEY,
    url: 'https://min-api.cryptocompare.com'
  });
});
