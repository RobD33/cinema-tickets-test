import TicketService from '../../src/pairtest/TicketService';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';
import ValidateTicketRequest from '../../src/pairtest/lib/ValidateTicketRequest';
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService';

jest.mock('../../src/pairtest/lib/ValidateTicketRequest');
jest.mock('../../src/thirdparty/seatbooking/SeatReservationService');
jest.mock('../../src/thirdparty/paymentgateway/TicketPaymentService');

const validate = jest.spyOn(ValidateTicketRequest.prototype, 'validate');
const reserveSeat = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');
const makePayment = jest.spyOn(TicketPaymentService.prototype, 'makePayment');

describe('TicketService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Creates ValidateTicketRequest with accountId and ticketTypeRequests, and calls validate()', () => {
    const accountId = 12345678;
    const ticketTypeRequests = [
      new TicketTypeRequest('ADULT', 4),
      new TicketTypeRequest('CHILD', 3),
    ];
    new TicketService().purchaseTickets(accountId, ...ticketTypeRequests);
    expect(ValidateTicketRequest).toHaveBeenCalledWith(accountId, ticketTypeRequests);
    expect(validate).toHaveBeenCalledTimes(1);
  });

  it.each([
    [[new TicketTypeRequest('ADULT', 4)], 4],
    [[new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 3)], 5],
    [[new TicketTypeRequest('ADULT', 4), new TicketTypeRequest('CHILD', 4), new TicketTypeRequest('INFANT', 4)], 8],
    [[
      new TicketTypeRequest('ADULT', 4),
      new TicketTypeRequest('CHILD', 4),
      new TicketTypeRequest('ADULT', 4),
      new TicketTypeRequest('CHILD', 4),
      new TicketTypeRequest('CHILD', 0),
      new TicketTypeRequest('INFANT', 6),
    ], 16],
  ])('Calls SeatReservationService.reserveSeat once with accountId and correct number of seats', (ticketTypeRequests, seats) => {
    const accountId = 123456;
    new TicketService().purchaseTickets(accountId, ...ticketTypeRequests);
    expect(reserveSeat).toHaveBeenCalledWith(accountId, seats);
    expect(reserveSeat).toHaveBeenCalledTimes(1);
  });

  it('Calls TicketPaymentService.makePayment once with accountId and correct totalAmountToPay', () => {
    const accountId = 12345678;
    const ticketTypeRequests = [
      new TicketTypeRequest('ADULT', 4),
      new TicketTypeRequest('CHILD', 3),
    ];
    new TicketService().purchaseTickets(accountId, ...ticketTypeRequests);
    expect(makePayment).toHaveBeenCalledTimes(1);
    expect(makePayment).toHaveBeenCalledWith(accountId, 145);
  });
});