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


        /* Test that makes sure that all feeds have a non-empty url defined */
        it('have an url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Test that makes sure that all feed have a non-empty name defined */
        it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Test suite that describes the menu button */
    describe('The menu', function() {
        /* Test that makes sure the menu button is hidden by default */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that makes sure the menu button toggles the visibility of the menu */
        it('changes visibility when icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
        

    /* Test suite that describes the initial entries are loaded */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Test that ensures there is a .entry element in the .feed container after loading*/
        it('contains at least one element when loaded', function() {
            expect(('.feed .entry').length).not.toBe(0);
        });       
    });


    /* Test Suite that describes the feed selection*/
    describe('New Feed Selection', function() {
        var prevContent, curContent;

        beforeEach(function(done) {
            // Loads first feed
            loadFeed(0, function() {
                prevContent = $('.feed').html();
                // Loads a new feed
                loadFeed(1, function() {
                    curContent = $('.feed').html();
                    done();
                });
            });
            
        });

        /* Test that ensures that the content has changed */
        it('changes the content', function() {
            expect(prevContent).not.toEqual(curContent);
        });
    });
}());
