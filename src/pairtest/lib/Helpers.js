import Rules from "./Rules";

export default class Helpers {
  static tallyTicketTypes(ticketTypeRequests) {
    const tally = {};
    Rules.getTypesAsArray().forEach((type) => {
      tally[type] = 0;
    });
    ticketTypeRequests.forEach(ticket => {
      tally[ticket.getTicketType()] += ticket.getNoOfTickets();
    });
    return tally;
  }
}