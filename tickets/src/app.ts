import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@skbtickets/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // telling express that it is sitting behind ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // does not encrypt the cookie, becauase JWT itself is encrypted
    secure: process.env.NODE_ENV !== 'test', // require https connection for PROD
  })
);

// every request would require the JWT token to be extricated
// and set to currentUser
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// named export requires {}
export { app };
