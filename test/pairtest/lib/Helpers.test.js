import Helpers from "../../../src/pairtest/lib/Helpers";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest";

describe('Helpers', () => {
  describe('tallyTicketTypes', () => {
    it('returns an object', () => {
      const result = Helpers.tallyTicketTypes([]);
      expect(typeof result).toEqual('object');
    });

    it('tallys for a single ticketTypeRequest', () => {
      const input = [new TicketTypeRequest('ADULT', 4)];
      const result = Helpers.tallyTicketTypes(input);
      expect(result.ADULT).toEqual(4);
      expect(result.CHILD).toEqual(0);
      expect(result.INFANT).toEqual(0);
    });

    it('creates a tally for multiple TicketTypeRequests', () => {
      const input = [
        new TicketTypeRequest('ADULT', 4),
        new TicketTypeRequest('CHILD', 3),
        new TicketTypeRequest('ADULT', 2),
        new TicketTypeRequest('INFANT', 6),
        new TicketTypeRequest('CHILD', 4),
      ];
      const result = Helpers.tallyTicketTypes(input);
      expect(result.ADULT).toEqual(6);
      expect(result.CHILD).toEqual(7);
      expect(result.INFANT).toEqual(6);
    });
  });
});