module.exports = {
    timeout: 30000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: './mochawesome-report',
      reportFilename: 'report',
      quiet: false,
      overwrite: true,
      html: true,
      json: true,
      inlineAssets: true
    },
    spec: ['test/**/*.test.js'],
  };
  