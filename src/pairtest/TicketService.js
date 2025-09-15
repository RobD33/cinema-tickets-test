import ValidateTicketRequest from './lib/ValidateTicketRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService';
import Helpers from './lib/Helpers.js';

export default class TicketService {
  #seatReservationService = new SeatReservationService();
  #ticketPaymentService = new TicketPaymentService();

  purchaseTickets(accountId, ...ticketTypeRequests) {
    new ValidateTicketRequest(accountId, ticketTypeRequests).validate();

    const numberOfSeats = this.#calculateNumberOfSeats(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, numberOfSeats);

    const totalPrice = this.#calculateTotalPrice(ticketTypeRequests); 
    this.#ticketPaymentService.makePayment(accountId, totalPrice);
  }

  #calculateNumberOfSeats(ticketTypeRequests) {
    const { ADULT, CHILD } = Helpers.tallyTicketTypes(ticketTypeRequests);
    return ADULT + CHILD;
  }

  #calculateTotalPrice(ticketTypeRequests) {
    const tally = Helpers.tallyTicketTypes(ticketTypeRequests);
    const prices = {
      ADULT: 25,
      CHILD: 15,
      INFANT: 0,
    };
    let totalPrice = 0;
    for(let type in tally) {
      totalPrice += tally[type] * prices[type];
    }
    return totalPrice;
  }
}
