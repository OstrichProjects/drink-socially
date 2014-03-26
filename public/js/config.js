'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all games', {
        url: '/games',
        templateUrl: 'views/games/list.html'
    })
      .state('create game', {
        url: '/games/create',
        templateUrl: 'views/games/create.html'
    })
      .state('edit game', {
        url: '/games/:gameId/edit',
        templateUrl: 'views/games/edit.html'
    })
      .state('game by id', {
        url: '/games/:gameId',
        templateUrl: 'views/games/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    })
      .state('all posts', {
        url: '/posts',
        templateUrl: 'views/posts/list.html'
    })
      .state('post by id', {
        url: '/posts/:postId',
        templateUrl: 'views/posts/view.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
