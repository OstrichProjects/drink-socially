'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Games',
        'link': 'games'
    }, {
        'title': 'Add New Game',
        'link': 'games/create'
    }];
    
    $scope.isCollapsed = false;
}]);