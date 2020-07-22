import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@skbtickets/common';

import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // telling express that it is sitting behind ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // does not encrypt the cookie, becauase JWT itself is encrypted
    // secure: process.env.NODE_ENV !== 'test', // require https connection for PROD
    secure: false, // disable HTTPS checking
  })
);

// every request would require the JWT token to be extricated
// and set to currentUser
app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// named export requires {}
export { app };
