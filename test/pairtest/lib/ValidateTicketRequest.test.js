import ValidateTicketRequest from '../../../src/pairtest/lib/ValidateTicketRequest';
import InvalidPurchaseException from '../../../src/pairtest/lib/InvalidPurchaseException';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest';

describe('TicketService', () => {
  it.each([-1, -10, 0, -999])('throws InvalidPurchaseException if accountId is less than 1 (%s)', (accountId) => {
    expect.assertions(2);
    try{
      new ValidateTicketRequest(accountId).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('accountId must be positive integer');
    }
  });

  it.each(['hello', {}, undefined])('throws InvalidPurchaseException if accountId is not an integer', (accountId) => {
    expect.assertions(2);
    try{
      new ValidateTicketRequest(accountId).validate();
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
      new ValidateTicketRequest(1, ticketTypeRequests).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('All arguments after accountId must be of type TicketTypeRequest');
    }
  });

  it.each([
    [[new TicketTypeRequest('CHILD', 1)]],
    [[new TicketTypeRequest('INFANT', 2)]],
    [[new TicketTypeRequest('CHILD', 3), new TicketTypeRequest('INFANT', 2)]],
    [[new TicketTypeRequest('ADULT', 0)]],
  ])('Throws an InvalidPurchaseException if there is not at least one adult ticket', (ticketTypeRequests) => {
    expect.assertions(2);
    try {
      new ValidateTicketRequest(1, ticketTypeRequests).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('Ticket requests require at least one adult ticket');
    }
  });

  it.each([
    [[new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('INFANT', 3)]],
    [[new TicketTypeRequest('ADULT', 6), new TicketTypeRequest('CHILD', 3), new TicketTypeRequest('INFANT', 7)]],
  ])('Throws an InvalidPurchaseException if there are more infant tickets than adult tickets', (ticketTypeRequests) => {
    expect.assertions(2);
    try {
      new ValidateTicketRequest(1, ticketTypeRequests).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('Ticket requests must contain at least one adult ticket per infant ticket');
    }
  });

  it.each([
    [[new TicketTypeRequest('ADULT', 26)]],
    [[new TicketTypeRequest('ADULT', 10), new TicketTypeRequest('CHILD', 16)]],
    [[new TicketTypeRequest('ADULT', 15), new TicketTypeRequest('INFANT', 15)]],
    [[new TicketTypeRequest('ADULT', 8), new TicketTypeRequest('CHILD', 10), new TicketTypeRequest('INFANT', 8)]],
    [[
      new TicketTypeRequest('ADULT', 3),
      new TicketTypeRequest('CHILD', 5),
      new TicketTypeRequest('INFANT', 6),
      new TicketTypeRequest('ADULT', 8),
      new TicketTypeRequest('CHILD', 6),
      new TicketTypeRequest('INFANT', 2),
    ]],
  ])('Throws an InvalidPurchaseException if there are more than 25 tickets total requested', (ticketTypeRequests) => {
    expect.assertions(2);
    try {
      new ValidateTicketRequest(1, ticketTypeRequests).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPurchaseException);
      expect(e.message).toEqual('Maximum of 25 tickets per request');
    }
  });
});