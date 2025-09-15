import TicketService from '../../src/pairtest/TicketService';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';
import ValidateTicketRequest from '../../src/pairtest/lib/ValidateTicketRequest';

jest.mock('../../src/pairtest/lib/ValidateTicketRequest');

const validate = jest.spyOn(ValidateTicketRequest.prototype, 'validate');

describe('TicketService', () => {
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
});