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
                expect(allFeeds[element].url).toBeDefined();
                expect(allFeeds[element].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have defined name and name is not empty string', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[element].name).toBeDefined();
                expect(allFeeds[element].name.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });



    describe('The menu', function() {

        it('is hidden on load', function() {
            $(document).ready(function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });


        it('appears when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
        });


        it('disappears when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */


    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    //the debug array will allow us to collect content data from all the entries.  WE will sort the array and then see if there are any duplicates


    ajaxlooper1 = function(i) {
        describe('entry ' + i, function() {
            beforeEach(function(done) {
                loadFeed(i, function() {
                    //this annoymous function is the callback for the assync. it looks for done() call in expect and then tells expect
                    //not to run until async has collected data.  
                    done();
                });
            });


            it('feed ' + i + ' has at least one article', function(done) {
                expect($('.feed').children().children('.entry').length).toBeGreaterThan(1);
                done();
            });

        });
    };

    describe('Initial-Entries', function() {
        $('.feed').empty();
        for (var i = 0, len = allFeeds.length; i < len; i++) {
            ajaxlooper1(i);
        }
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    ajaxcallback = function(debugArray) {
        debugArray.push($('.feed').find('h2')[0].textContent);
    };

    //waits until all ajax calls are done then run the tests.  


    describe('New Feed Selection', function() {
        $('.feed').empty();
        var debugArray = [];
        var newarray = [];
        var counter = 0;
        beforeEach(function(done) {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                loadFeed(i, function() {
                    ajaxcallback(debugArray, len);
                    counter++;
                    if (counter == len) {
                        done();
                    }
                });
            }

        });

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

    /* TODO: Write a new test suite named "New Feed Selection"*/




    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
}());