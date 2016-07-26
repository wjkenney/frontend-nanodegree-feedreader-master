// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it("should have defined URL and the URL is not an empty string", function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        //this loops through each feed in the allFeeds object and ensures it has a URL defined
        //and that the URL is not empty.

        it('should have defined name and name is not empty string', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });



    describe('The menu', function() {

    // This test ensures the menu element is hidden by default.

        it('is hidden on load', function() {
            $(document).ready(function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });

    //that it appears when clicked
        it('appears when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
        });
     
      
    //and hides when clicked again

    it('disappears when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

//this function loads feed index and then tests to see if it has at least one element.  
// it is separated to ensure that the right index is fed into the loadFeed. 
ajaxLooper = function(i) {
        describe('entry ' + i, function() {
            beforeEach(function(done) {
                loadFeed(i, done);
            });


            it('feed ' + i + ' has at least one article', function(done) {
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            });
        });
    };

    describe('Initial-Entries', function() {
        $('.feed').empty();
        for (var i = 0, len = allFeeds.length; i < len; i++) {
            ajaxLooper(i);
        }
    });


//this is the ajax callback for unique entry testing, it is going to look for the first title of the feed and push it into our sample array.
    ajaxCallback = function(debugArray) {
        debugArray.push($('.feed').find('h2')[0].textContent);
    };
 


    describe('New Feed Selection', function() {
        $('.feed').empty();
        var debugArray = [];
        var newarray = [];
        var counter = 0;
        beforeEach(function(done) {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                loadFeed(i, function() {
                    ajaxCallback(debugArray);
                    counter++;
                    if (counter === len) {
                        done();
                    }
                });
            }
        });

        //here in are spec test we turn each entry into a key in an object. Keys that appear twice will trigger a failed test.  
        //(eg [John, Bob, Patrick, Bob] would be false.)  
        it('is different from the others', function(done) {

            newarray = debugArray
                .map(function(content) {
                    return {
                        count: 1,
                        content: content
                    };
                });
            newarray.reduce(function(a, b, index) {
                a[b.content] = (a[b.content] || 0) + b.count;
                expect(a[b.content]).toBe(1);
                return a;
            }, {});
            done();
        });
    });
}());