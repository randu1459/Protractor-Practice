// Using browser.driver for non-angular pages
var GoogleObject = function() {
    browser.driver.get('http://www.google.com');
    browser.driver.manage().window().maximize();
    const EC = protractor.ExpectedConditions;

    this.Reset = function() {
        browser.driver.get('http://www.google.com')
        browser.ignoreSynchronization = true;
        return this;
    }
    
    this.EnterSearchText = function(searchText) {
        browser.driver.wait(function() {
            return browser.driver.findElement(by.id('lst-ib'))
                .then(function(elem) {
                    elem.sendKeys(searchText);
                    //browser.sleep(2000) // Useful for watching what's happening.
                    return true;
                });
        }, 5000);
    return this;
    };

    this.Go = function() {
        browser.driver.wait(function() {
        return browser.driver.findElement(by.name('btnK'))
            .then(function(elem) {
            elem.sendKeys(protractor.Key.SPACE);
            return true;
            });
        }, 5000);
    return this;
    };

    this.WasSearchCompleted = function() {
        return browser.driver.wait(EC.urlContains('&q=Automation+Testing+is+fun%21'), 3000)
    };

    this.ResultsToContain = function(textToCheck) {
        return browser.driver.wait(EC.textToBePresentInElement($('#search'), textToCheck), 3000)
    };

    this.UseFeelingLucky = function() {
        browser.driver.wait(function() {
            return browser.driver.findElement(by.css('[name=btnI]'))
                    .then(function(elem) {
                        browser.actions()
                            .mouseMove(elem)
                            .click()
                            .perform();
                        return true;
                        })
            }, 5000);
        return this;
    };

    this.FeelingLuckyResult = function() {
        //return browser.driver.wait(EC.urlContains('www.espn.com'), 3000)
        return browser.driver.getCurrentUrl()
        }
};

module.exports = GoogleObject;