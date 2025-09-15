import TicketService from '../../src/pairtest/TicketService';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';

describe('TicketService', () => {
  it('throws InvalidPurchaseException if accountId is less than 0', () => {
    expect.assertions(2);
    try{
      new TicketService().purchaseTickets(-1)
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('accountId must be positive integer');
    }
  })
})