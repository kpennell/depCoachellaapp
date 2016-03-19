angular.module('starter.controllers', [])

.controller('ShowsCtrl', function($scope, $rootScope, Shows, ngAudio, StorageService, PlayerService, $ionicScrollDelegate, BrowserService, $ionicLoading, $cordovaNativeAudio) {

        $scope.shows = Shows.all();

        $scope.things = StorageService.getAll(); // StorageService
        $rootScope.numberOfFavorites = $scope.things.length; // Favorites Length for header

        $scope.thingswithIndexfromService = StorageService.mapThings();

        // Makes sure the heart ng-class is ready before entered
        $scope.$on('$ionicView.beforeEnter', function(viewInfo, state) {
            $scope.thingswithIndexfromService = StorageService.mapThings();
        });

        $scope.toggleFavorite = function(show) {

            if ($scope.thingswithIndexfromService.indexOf(show.id) === -1) {
                StorageService.add(show);

                //remap for favorites number
                $scope.thingswithIndexfromService = StorageService.mapThings();
                $rootScope.numberOfFavorites = $scope.thingswithIndexfromService.length;

            } else {
                StorageService.remove(show);

                //remap for favorites number
                $scope.thingswithIndexfromService = StorageService.mapThings();
                $rootScope.numberOfFavorites = $scope.thingswithIndexfromService.length;

            }
        }
            $scope.audio = new Audio();
        $scope.playStream = function(show) {
            PlayerService.play(show);

            $scope.audioObject = audioObject; // this allow for styling the play/pause icons
        }

        $scope.pauseStream = function(show) {
            PlayerService.pause(show);
            $scope.audioObject = audioObject; // this allow for styling the play/pause icons

            //console.log($scope.audioObject);

        }

        $scope.togglePlayPause = function(show) {
            if (!$scope.audioObject || $scope.audioObject.paused) {
                $scope.playStream(show);
            } else if (show.track1_preview !== $scope.audioObject.id) {
                $scope.playStream(show);
            } else {
                $scope.pauseStream(show);
            }
        }


        // this set of functions creates an hex values based off the tag string
        function hashCode(str) {
            //console.log(str);

            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        }

        function intToRGB(i) {
            var c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
            return "00000".substring(0, 6 - c.length) + c;
        }

        $scope.getTagColor1 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag1)))

            console.log(show.lastfm_tag1 + (intToRGB(hashCode(show.lastfm_tag1))))

        };

        $scope.getTagColor2 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag2)))

        };

        $scope.getTagColor3 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag3)))

        };
        $scope.getTagColor4 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag4)))

        };


        $scope.clearSearch = function() {
            console.log('fired');
            $scope.searchQuery = '';
            $ionicScrollDelegate.scrollTop();
        }



        // filters at the top
        $scope.sortField = "lastfm_plays";
        $scope.reverse = true;


        $scope.setFilterOption = function(option) {
            console.log(option);

            if ($scope.sortField === option) {
                //console.log("$scope.sortField === option")
                $scope.reverse = !$scope.reverse;
                $ionicScrollDelegate.scrollTop();
            } else {
                //console.log("else")
                $scope.sortField = option;
                $scope.reverse = false;
                $ionicScrollDelegate.scrollTop();
            }


        };

        $scope.isSortUp = function(option) {
            return $scope.sortField === option && !$scope.reverse;
        };

        $scope.isSortDown = function(option) {
            return $scope.sortField === option && $scope.reverse;
        };

        $scope.openWebsite = BrowserService.open;






    }) //ShowsCtrl



.controller('FavoritesCtrl', function($scope, $rootScope, Shows, ngAudio, StorageService, PlayerService) {
        $scope.favorites = StorageService.getAll();

        $scope.favoriteswithIndex = StorageService.mapThings();
        $rootScope.numberOfFavorites = $scope.favoriteswithIndex.length; // Favorites for Header

        // Makes sure the heart ng-class is ready before entered
        $scope.$on('$ionicView.beforeEnter', function(viewInfo, state) {
            $scope.favoriteswithIndex = StorageService.mapThings();
        });

        $scope.playStream = function(show) {
            PlayerService.play(show);
            console.log(PlayerService);

            $scope.audioObject = audioObject; // this allow for styling the play/pause icons



            this.playing = true;

        }

        $scope.pauseStream = function(show) {
            PlayerService.pause(show);

            $scope.audioObject = audioObject; // this allow for styling the play/pause icons



            this.playing = false;

        }



        $scope.toggleFavorite = function(favorite) {

            console.log("fired $scope.toggleFavorite");

            if ($scope.favoriteswithIndex.indexOf(favorite.id) === -1) {
                StorageService.add(favorite);

                $scope.favoriteswithIndex = StorageService.mapThings();

                $rootScope.numberOfFavorites = $scope.favoriteswithIndex.length;

            } else {
                StorageService.remove(favorite);

                $scope.favoriteswithIndex = StorageService.mapThings();
                $rootScope.numberOfFavorites = $scope.favoriteswithIndex.length;
            }

        }

        // coloring tags, refactor into service
        function hashCode(str) {
            //console.log(str);

            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        }

        function intToRGB(i) {
            var c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
            return "00000".substring(0, 6 - c.length) + c;
        }

        $scope.getTagColor1 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag1)))

            console.log(show.lastfm_tag1 + (intToRGB(hashCode(show.lastfm_tag1))))

        };

        $scope.getTagColor2 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag3)))

        };
        $scope.getTagColor3 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag3)))

        };
        $scope.getTagColor4 = function(show) {

            return '#' + (intToRGB(hashCode(show.lastfm_tag4)))

        };


    })
    .controller('ShowDetailsCtrl', function($scope, $stateParams, Shows, PlayerService) {
        $scope.show = Shows.get($stateParams.showId);




    });
