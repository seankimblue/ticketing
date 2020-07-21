import express from 'express';

import { currentUser } from '@skbtickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  console.log('GET /api/users/currentuser');

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
