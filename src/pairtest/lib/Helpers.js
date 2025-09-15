export default class Helpers {
  static tallyTicketTypes(ticketTypeRequests) {
    const tally = {
      ADULT: 0,
      CHILD: 0,
      INFANT: 0,
    };
    ticketTypeRequests.forEach(ticket => {
      tally[ticket.getTicketType()] += ticket.getNoOfTickets();
    });
    return tally;
  }
}