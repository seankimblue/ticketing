import express, { Request, Response } from 'express';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  console.log('GET /api/tickets');

  const tickets = await Ticket.find({
    orderId: undefined,
  });

  // console.log('Sending =', tickets);

  // default status is 200
  res.send(tickets);
});

export { router as indexTicketRouter };
