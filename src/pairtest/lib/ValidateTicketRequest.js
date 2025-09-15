import InvalidPurchaseException from "./InvalidPurchaseException";
import TicketTypeRequest from "./TicketTypeRequest";

export default class ValidateTicketRequest {
  #accountId;

  #ticketTypeRequests;

  constructor(accountId, ticketTypeRequests) {
    this.#accountId = accountId;
    this.#ticketTypeRequests = ticketTypeRequests;
  }

  validate() {
    this.#validateId();
    this.#validateTypes();
    this.#validateMinAdults();
  }

  #validateId() {
    if (this.#accountId < 1 || !Number.isInteger(this.#accountId)) {
      throw new InvalidPurchaseException('accountId must be positive integer');
    };
  }

  #validateTypes() {
    if (!this.#ticketTypeRequests.every((ticketTypeRequest) => ticketTypeRequest instanceof TicketTypeRequest)) {
      throw new InvalidPurchaseException('All arguments after accountId must be of type TicketTypeRequest');
    }
  }

  #validateMinAdults() {
    if(!this.#ticketTypeRequests.some((ticketTypeRequest) => ticketTypeRequest.getTicketType() === 'ADULT' && ticketTypeRequest.getNoOfTickets() > 0)) {
      throw new InvalidPurchaseException('Ticket requests require at least one adult ticket');
    }
  }
}