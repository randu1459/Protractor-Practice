// Using browser.driver for non-angular pages

/* ==============================================================
An example of a complex test suite due to a lack of abstraction.
This works, but requires some technical knowledge to maintain the tests or even understand
what's going on. 
============================================================== */
var webpage = browser.driver;
webpage.ignoreSynchronization = true;
webpage.manage().window().maximize();

 describe('Complex Google Search Test Suite with no Abstraction', function() { 
  it ('Page Title should be "Google"', function() {
    webpage.get('http://google.com/');
    expect(webpage.getTitle()).toEqual('Google');
  });

  it('Search button should perform search', function() {
    webpage.get('http://google.com/');

    webpage.wait(function() {
     return webpage.findElement(by.id('lst-ib'))
              .then(function(elem) {
                elem.sendKeys('Automation Testing is fun!');
                return true;
              });
    }, 10000);

    webpage.wait(function() {
      return webpage.findElement(by.css('[name=btnK'))
        .then(function(elem) {
          elem.sendKeys(protractor.Key.SPACE);
          return true;
        });
    }, 10000);

    var currentUrl = webpage.getCurrentUrl();

    expect(currentUrl).toContain('&q=Automation+Testing+is+fun%21')
  })
})
