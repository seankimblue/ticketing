import express, { Request, Response } from 'express';
import { NotFoundError } from '@skbtickets/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  console.log('GET /api/tickets/:id');

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  // default status is 200
  res.send(ticket);
});

export { router as showTicketRouter };
