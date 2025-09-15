import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateId(accountId);
    if (!ticketTypeRequests.every((ticketTypeRequest) => ticketTypeRequest instanceof TicketTypeRequest)) {
      throw new InvalidPurchaseException('All arguments after accountId must be of type TicketTypeRequest');
    }
  }

  #validateId(accountId) {
    if (accountId < 1 || !Number.isInteger(accountId)) {
      throw new InvalidPurchaseException('accountId must be positive integer');
    }
  }
}
