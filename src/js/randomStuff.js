.factory ('FavoritesService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    things: []
  });

  var _toggleFavorites = function () {
  $scope.toggleFavorite = function(show) {

            //console.log($scope.thingswithIndex.indexOf(show.id))

            if ($scope.thingswithIndex.indexOf(show.id) === -1) {
                StorageService.add(show);
                console.log('not in, will add now');
                console.log($scope.things);

                $scope.thingswithIndex = $scope.things.map(function(el) {
                return el.id;
                });

            } 
            else {
                StorageService.remove(show);
                //console.log($scope.things);
                console.log('already in, dont do anything');
                console.log($scope.things);

                $scope.thingswithIndex = $scope.things.map(function(el) {
                return el.id;
                });
            }

        }     




  };


  var _mapThings = function () {
    
    var thingsWithIndex = $localStorage.things.map(function(el) {
            return el.id;
        });
 
    return thingsWithIndex;
  };


  return {
    toggleFavorites: _toggleFavorites,
    mapThings: _mapThings
  };
});


/* Refactor into playerService
        $scope.playStream = function(show) {
            // if no object at all, play this one
            if (!$scope.audioObject) {
                $scope.audioObject = ngAudio.load(show.track1_preview);
                $scope.audioObject.play();

                this.playing = true;
            }

            // if paused, play again
            else if ($scope.audioObject.paused) {
                $scope.audioObject = ngAudio.load(show.track1_preview);
                $scope.audioObject.play();
                this.playing = true;

            } else {
                $scope.audioObject.stop();
                $scope.audioObject = ngAudio.load(show.track1_preview);
                $scope.audioObject.play();
                this.playing = true;
            }
        }

        $scope.pauseStream = function(show) {
                $scope.audioObject.stop();
                this.playing = false;
            }
     end of playerService */