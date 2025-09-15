export default {
  mutate: [
    './src/pairtest/TicketService.js',
    './src/pairtest/lib/Helpers.js',
    './src/pairtest/lib/ValidateTicketRequest.js',
  ],
  packageManager: 'npm',
  reporters: ['html'],
  testRunner: 'jest',
};