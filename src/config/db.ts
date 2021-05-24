import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return ({
    type: process.env.TYPE,
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
});
