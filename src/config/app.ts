import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return ({
    topProductLimit: 5,
    defaultQuoteProduct: 'USD',
    quoteProducts: ['USD', 'CAD', 'EUR', 'GBP'],
  });
});
