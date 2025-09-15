import ValidateTicketRequest from './lib/ValidateTicketRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService';
import Helpers from './lib/Helpers.js';
import Rules from './lib/Rules.js';

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
    const tally = Helpers.tallyTicketTypes(ticketTypeRequests);
    const types = Rules.getTypes();
    return tally[types.ADULT] + tally[types.CHILD];
  }

  #calculateTotalPrice(ticketTypeRequests) {
    const tally = Helpers.tallyTicketTypes(ticketTypeRequests);
    const prices = Rules.getPrices();
    let totalPrice = 0;
    for(let type in tally) {
      totalPrice += tally[type] * prices[type];
    }
    return totalPrice;
  }
}
