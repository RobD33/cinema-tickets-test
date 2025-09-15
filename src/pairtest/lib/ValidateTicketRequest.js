import InvalidPurchaseException from "./InvalidPurchaseException";
import TicketTypeRequest from "./TicketTypeRequest";
import Helpers from "./Helpers";
import Rules from "./Rules";

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
    this.#validateInfantSeat();
    this.#validateTotalTicketCount();
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

  #validateInfantSeat() {
    const tally = Helpers.tallyTicketTypes(this.#ticketTypeRequests);
    const ADULT = tally[Rules.getTypes().ADULT];
    const INFANT = tally[Rules.getTypes().INFANT];
    if (INFANT > ADULT) {
      throw new InvalidPurchaseException('Ticket requests must contain at least one adult ticket per infant ticket');
    }
  }

  #validateTotalTicketCount() {
    const max = Rules.getMaximumTickets();
    const totalTickets = this.#ticketTypeRequests.reduce((acc, ticketTypeRequest) => {
      return acc + ticketTypeRequest.getNoOfTickets();
    }, 0);
    if(totalTickets > max) {
      throw new InvalidPurchaseException(`Maximum of ${max} tickets per request`);
    }
  }
}