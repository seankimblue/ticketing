import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const clientID = randomBytes(4).toString('hex');
const channel = 'ticket:created';
const queueGroup = 'orders-service-queue-group';

// stan is a client
const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log(clientID, 'Listener connected to NATS: ');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
