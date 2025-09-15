import TicketService from '../../src/pairtest/TicketService';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';

describe('TicketService', () => {
  it.each([-1, -10, 0, -999])('throws InvalidPurchaseException if accountId is less than 1 (%s)', (accountId) => {
    expect.assertions(2);
    try{
      new TicketService().purchaseTickets(accountId)
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('accountId must be positive integer');
    }
  })
})