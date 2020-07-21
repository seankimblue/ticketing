import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjests';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(
      `onMessage: Received event #${msg.getSequence()}, with data: ${data}`
    );

    console.log('id=', data.id);
    console.log('title=', data.title);
    console.log('price=', data.price);

    // only when message processing is fnished, ACK message
    // otherwise, allow messaging to time out to retransmit message

    msg.ack();
  }
}
