import InvalidPurchaseException from "./InvalidPurchaseException";
import TicketTypeRequest from "./TicketTypeRequest";
import Helpers from "./Helpers";

export default class ValidateTicketRequest {
  #maximumtickets = 25;
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
    const { ADULT, INFANT } = Helpers.tallyTicketTypes(this.#ticketTypeRequests);
    if (INFANT > ADULT) {
      throw new InvalidPurchaseException('Ticket requests must contain at least one adult ticket per infant ticket');
    }
  }

  #validateTotalTicketCount() {
    const totalTickets = this.#ticketTypeRequests.reduce((acc, ticketTypeRequest) => {
      return acc + ticketTypeRequest.getNoOfTickets();
    }, 0);
    if(totalTickets > this.#maximumtickets) {
      throw new InvalidPurchaseException(`Maximum of ${this.#maximumtickets} tickets per request`);
    }
  }
}