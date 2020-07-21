import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@skbtickets/common';

import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('onMessage data=', data);
    const expiration = new Date(data.expiresAt);
    const delay = expiration.getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process=', delay);

    await expirationQueue.add(
      {
        orderId: data.id,
        message: `Expiration of ${data.id} at ${expiration.toLocaleString()}`,
      },
      {
        delay,
      }
    );

    // ack the message
    msg.ack();
  }
}
