module.exports = {
    testEnvironment: 'node',  // Use 'node' environment for server-side tests
    setupFilesAfterEnv: ['./jest.setup.js'],  // Path to jest.setup.js directly in the server directory
    verbose: true,  // Provides detailed test output
  };
  