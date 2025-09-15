import TicketService from '../../src/pairtest/TicketService';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';

describe('TicketService', () => {
  it.each([-1, -10, 0, -999])('throws InvalidPurchaseException if accountId is less than 1 (%s)', (accountId) => {
    expect.assertions(2);
    try{
      new TicketService().purchaseTickets(accountId);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('accountId must be positive integer');
    }
  });

  it.each(['hello', {}, undefined])('throws InvalidPurchaseException if accountId is not an integer', (accountId) => {
    expect.assertions(2);
    try{
      new TicketService().purchaseTickets(accountId);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('accountId must be positive integer');
    }
  });

  it.each([
    [[{}]],
    [[new TicketTypeRequest('ADULT', 2), 'CHILD']],
    [[new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('CHILD', 2), []]]
  ])('Throws an InvalidPurchaseException if passed anything other than accountId and TicketTypeRequests', (ticketTypeRequests) => {
    expect.assertions(2);
    try{
      new TicketService().purchaseTickets(1, ticketTypeRequests);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('All arguments after accountId must be of type TicketTypeRequest');
    }
  });
});