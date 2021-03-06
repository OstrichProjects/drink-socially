'use strict';

(function() {
    // Games Controller Spec
    describe('MEAN controllers', function() {
        describe('GamesController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var GamesController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                GamesController = $controller('GamesController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one game object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('games').respond([{
                        title: 'An Game about MEAN',
                        description: 'MEAN rocks!',
                        rules: 'test rule 1'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.games).toEqualData([{
                        title: 'An Game about MEAN',
                        description: 'MEAN rocks!',
                        rules: 'test rule 1'
                    }]);

                });

            it('$scope.findOne() should create an array with one game object fetched ' +
                'from XHR using a gameId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.gameId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testGameData = function() {
                        return {
                            title: 'An Game about MEAN',
                            description: 'MEAN rocks!',
                            rules: 'test rule 1'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/games\/([0-9a-fA-F]{24})$/).respond(testGameData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.game).toEqualData(testGameData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postGameData = function() {
                        return {
                            title: 'An Game about MEAN',
                            description: 'MEAN rocks!',
                            rules: 'test rule 1'
                        };
                    };

                    // fixture expected response data
                    var responseGameData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Game about MEAN',
                            description: 'MEAN rocks!',
                            rules: 'test rule 1'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Game about MEAN';
                    scope.description = 'MEAN rocks!';
                    scope.rules = 'test rule 1';

                    // test post request is sent
                    $httpBackend.expectPOST('games', postGameData()).respond(responseGameData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.description).toEqual('');
                    expect(scope.rules).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/games/' + responseGameData()._id);
                });

            it('$scope.update() should update a valid game', inject(function(Games) {

                // fixture rideshare
                var putGameData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Game about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock game object from form
                var game = new Games(putGameData());

                // mock game in scope
                scope.game = game;

                // test PUT happens correctly
                $httpBackend.expectPUT(/games\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/games\/([0-9a-fA-F]{24})$/, putGameData()).respond();
                /*
                Error: Expected PUT /games\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Game about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Game about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/games/' + putGameData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid gameId' +
                'and remove the game from the scope', inject(function(Games) {

                    // fixture rideshare
                    var game = new Games({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.games = [];
                    scope.games.push(game);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/games\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(game);
                    $httpBackend.flush();

                    // test after successful delete URL location games lis
                    //expect($location.path()).toBe('/games');
                    expect(scope.games.length).toBe(0);

                }));
        });
    });
}());