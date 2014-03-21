'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', function ($scope, $stateParams, $location, Global, Games) {
    $scope.global = Global;

    $scope.create = function() {
        var game = new Games({
            title: this.title,
            description: this.description,
            rules: this.rules
        });
        game.$save(function(response) {
            $location.path('games/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.rules = '';
    };

    $scope.remove = function(game) {
        if (game) {
            game.$remove();

            for (var i in $scope.games) {
                if ($scope.games[i] === game) {
                    $scope.games.splice(i, 1);
                }
            }
        }
        else {
            $scope.game.$remove();
            $location.path('games');
        }
    };

    $scope.update = function() {
        var game = $scope.game;
        if (!game.updated) {
            game.updated = [];
        }
        game.updated.push(new Date().getTime());

        game.$update(function() {
            $location.path('games/' + game._id);
        });
    };

    $scope.find = function() {
        Games.query(function(games) {
            $scope.games = games;
        });
    };

    $scope.findOne = function() {
        Games.get({
            gameId: $stateParams.gameId
        }, function(game) {
            $scope.game = game;
        });
    };
}]);