var test = require('tape')
var webdriverio = require('webdriverio')

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
}

webdriverio
  .remote(options)
  .init()
  .url('http://localhost:3000/home')
  .getText(".twelve columns").then(testUnconventional)
  .end()

function testUnconventional (text) {
  test('the homepage is welcoming', function (t) {
    t.equals(text, 'How unconventional are your tastes?')
    t.end()
  })
}
