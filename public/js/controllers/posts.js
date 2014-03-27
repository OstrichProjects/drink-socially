'use strict';

angular.module('mean.posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Global', 'Posts', function ($scope, $stateParams, $location, Global, Posts) {
    $scope.global = Global;

    $scope.hideEdit = function(){

        // When a model is changed, the view will be automatically
        // updated by AngularJS. In this case it will hide the tooltip.

        $scope.editing = false;
    };

    $scope.toggleEdit = function(e){
        e.stopPropagation();
        $scope.editing = !$scope.editing;
    };

    $scope.create = function() {
        var post = new Posts({
            text: this.text
        });
        post.$save(function(response) {
            $location.path('posts');
        });

        this.text
    };

    $scope.remove = function(post) {
        if (post) {
            post.$remove();

            for (var i in $scope.posts) {
                if ($scope.posts[i] === post) {
                    $scope.posts.splice(i, 1);
                }
            }
        }
        else {
            $scope.post.$remove();
            $location.path('posts');
        }
    };

    $scope.update = function() {
        var post = $scope.post;
        if (!post.updated) {
            post.updated = [];
        }
        post.updated.push(new Date().getTime());

        post.$update(function() {
            $location.path('posts');
        });
    };

    $scope.find = function() {
        Posts.query(function(posts) {
            $scope.posts = posts;
        });
    };

    $scope.findOne = function() {
        Posts.get({
            postId: $stateParams.postId
        }, function(post) {
            $scope.post = post;
        });
    };
}]);