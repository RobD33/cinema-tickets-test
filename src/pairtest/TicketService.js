import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import ValidateTicketRequest from './lib/ValidateTicketRequest.js';

export default class TicketService {

  purchaseTickets(accountId, ...ticketTypeRequests) {
    new ValidateTicketRequest(accountId, ticketTypeRequests).validate();
  }
}
