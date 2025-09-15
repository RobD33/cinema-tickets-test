import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateId(accountId);
  }

  #validateId(accountId) {
    if (accountId < 1 || !Number.isInteger(accountId)) {
      throw new InvalidPurchaseException('accountId must be positive integer');
    }
  }
}
