import { Subjects } from './subjests';

// Creates a tight couple between the subject and data
export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
