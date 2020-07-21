import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@skbtickets/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    console.log('onMessage data=', data);

    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Orrder not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
