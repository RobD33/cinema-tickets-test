import ValidateTicketRequest from './lib/ValidateTicketRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';

export default class TicketService {
  #seatReservationService = new SeatReservationService();

  purchaseTickets(accountId, ...ticketTypeRequests) {
    new ValidateTicketRequest(accountId, ticketTypeRequests).validate();
    const numberOfSeats = this.#calculateNumberOfSeats(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, numberOfSeats);
  }

  #calculateNumberOfSeats(ticketTypeRequests) {
    const tally = {
      ADULT: 0,
      CHILD: 0,
      INFANT: 0,
    }
    ticketTypeRequests.forEach(ticketTypeRequest => {
      tally[ticketTypeRequest.getTicketType()] += ticketTypeRequest.getNoOfTickets()
    });
    return tally.ADULT + tally.CHILD;
  }
}
