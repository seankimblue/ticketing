//lowercase n to indicate instance
import { natsWrapper } from './nats-wrapper';

import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { expirationQueue } from './queues/expiration-queue';

// depending on the version of node
// all await function needs to be wrapped inside of a function
// the latest version of Node can allow await at the top level,
// outside of function
const start = async () => {
  console.log('Starting...');

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    console.log('process.env.REDIS_HOST=', process.env.REDIS_HOST);

    await expirationQueue.add({
      orderId: '',
      message: 'Bull/Redis Initialization Test',
    });

    new OrderCreatedListener(natsWrapper.client).listen();

    console.log('Expirations Service is up!!!!!!');
  } catch (err) {
    console.error(err);
  }
};

start();
