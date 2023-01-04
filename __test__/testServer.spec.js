const request = require('supertest');

// Describe the overall purpose of this test suite
describe('Server testing', () => {
  // Test the response of the root route '/'
  test('Root route responds with 200 status code', async () => {
    // Send a GET request to the root route
    const response = await request('http://localhost:8081').get('/');
    // Assert that the response has a status code of 200
    expect(response.statusCode).toBe(200);
  });
});