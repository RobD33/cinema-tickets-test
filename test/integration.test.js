import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import SeatReservationService from '../src/thirdparty/seatbooking/SeatReservationService';
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService';

const reserveSeat = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');
const makePayment = jest.spyOn(TicketPaymentService.prototype, 'makePayment');

describe('Integration Tests', () => {
  it.each([
    [-1, []],
    [1, [{}]],
    [5, [new TicketTypeRequest('ADULT', 26)]],
    [1234, [new TicketTypeRequest('CHILD', 4)]],
    [1234, [new TicketTypeRequest('ADULT', 4), new TicketTypeRequest('INFANT', 5)]],
  ])('Throws an InvalidPurchaseException for an invalid request', (accountId, ticketTypeRequests) => {
    expect.assertions(1);
    try {
      new TicketService().purchaseTickets(accountId, ...ticketTypeRequests);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
    }
  });

  it('Correctly calls SeatReservationService and TicketPaymentService', () => {
    const accountId = 12345;
    new TicketService().purchaseTickets(
      accountId,
      new TicketTypeRequest('ADULT', 3),
      new TicketTypeRequest('CHILD', 4),
      new TicketTypeRequest('INFANT', 2),
    );
    expect(reserveSeat).toHaveBeenCalledWith(accountId, 7);
    expect(makePayment).toHaveBeenCalledWith(accountId, 135);
  });
});