/* ============================================================== 
I'm using the "page object model" pattern to lower
the complexity, but perform tests similar to those 
found in google.complex.spec.js. This is practice
with abstraction and Protractor. This is the first
go around while learning.
============================================================== */

// All of the more complex bits are stored in a different file.
var GoogleObject = require('./google.page-object.js');

describe('Randy\'s Google Testing Framework:', function() {
  var Google;

 beforeAll(function() { // This runs before all of the individual spec or "it" statements.
      // Fills the Goole variable with the abstracted methods and does some basic setup.
      Google = new GoogleObject(); 
  })

  beforeEach(function(){ // This runs before each individual spec or "it" statement.
      Google.Reset(); // This resets browser before each spec.
  })

  it('Searching Google for "Automation Testing is fun!" completes a search', function() {
    // Method chaining is a nice feature of JavaScript:
    expect(Google.EnterSearchText('Automation Testing is fun!').Go().WasSearchCompleted()).toBe(true);
  })

  it('Example: First spec without method chaining', function() {
    // Check out the same code without method chaining:
    Google.EnterSearchText('Automation Testing is fun!');
    Google.Go();
    var results = expect(Google.WasSearchCompleted())
    results.toBe(true);
  })

  it('Searching for "Automation Testing is fun!" should return a specific website: https://devblast.com/b/automated-testing-fun', function() {
    //Google.EnterSearchText('Automation Testing is fun!').Go()
    expect(
      Google.EnterSearchText('Automation Testing is fun!')
      .Go()
      .ResultsToContain('https://devblast.com/b/automated-testing-fun'))
      .toBe(true);
  })

  // Example of a test that is passing but is not actually working
  it('Searching for "espn.com" and clicking the "I\'m Feeling Lucky" button should open espn.com', function() {
    Google.EnterSearchText('espn.com').UseFeelingLucky();
    expect(Google.WasFeelingLuckyCompleted()).toContain('www.espn.com');
  })
})