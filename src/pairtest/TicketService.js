import ValidateTicketRequest from './lib/ValidateTicketRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';
import Helpers from './lib/Helpers.js';

export default class TicketService {
  #seatReservationService = new SeatReservationService();

  purchaseTickets(accountId, ...ticketTypeRequests) {
    new ValidateTicketRequest(accountId, ticketTypeRequests).validate();
    const numberOfSeats = this.#calculateNumberOfSeats(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, numberOfSeats);
  }

  #calculateNumberOfSeats(ticketTypeRequests) {
    const { ADULT, CHILD } = Helpers.tallyTicketTypes(ticketTypeRequests);
    return ADULT + CHILD;
  }
}
