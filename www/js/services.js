angular.module('starter.services', [])

.factory('Shows', function($http, $timeout) {
        var shows = [];
        
        $http({
            method: 'GET',
            url: 'https://gist.githubusercontent.com/kpennell/1d914658005515a3dbc8/raw/936616cdfb368cd650bb071d154952519a7d4333/coachella_data.json'
        }).then(function successCallback(response) {
            data = response.data;
            data.forEach(function(key, value) {
                shows.push(key);
            });


        }, function errorCallback(response) {
            console.log("error");
        });

        return {
            all: function() {
                return shows;
            },
            remove: function(show) {
                shows.splice(shows.indexOf(show), 1);
            },
            get: function(showId) {
                for (var i = 0; i < shows.length; i++) {
                    if (shows[i].id === parseInt(showId)) {
                        return shows[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('StorageService', function($localStorage) {

        $localStorage = $localStorage.$default({
            things: []
        });

        var _getAll = function() {
            //console.log($localStorage.things.indexOf("0"));
            return $localStorage.things;
        };

        var _add = function(thing) {
            $localStorage.things.push(thing);
        }

        var _remove = function(thing) {
            $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
        }

        var _mapThings = function() {

            var thingsWithIndex = $localStorage.things.map(function(el) {
                return el.id;
            });

            return thingsWithIndex;
        };


        return {
            getAll: _getAll,
            add: _add,
            remove: _remove,
            mapThings: _mapThings
        };
    })
    .factory('PlayerService', function(ngAudio) {

    var _play = function(show) {
        if (typeof audioObject === "undefined") {
            audioObject = ngAudio.load(show.track1_preview);
            audioObject.play();
            audioObject.playing = show.id;
            return audioObject;

        } else if (audioObject.paused) {
            audioObject = ngAudio.load(show.track1_preview);
            audioObject.play();
            audioObject.playing = show.id;
            return audioObject;

        } else {
            audioObject.stop();
            audioObject = ngAudio.load(show.track1_preview);
            audioObject.play();
            audioObject.playing = show.id;
            return audioObject;

        }
    }

    var _pause = function(show) {
        audioObject.stop();
        audioObject.playing = '';
    }

    return {
        play: _play,
        pause: _pause
    };
})
.factory('BrowserService', ['$cordovaInAppBrowser', function($cordovaInAppBrowser) {
    return {
        open: openWebsite
    };

    function openWebsite(url) {
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'yes'
        };
        $cordovaInAppBrowser.open(url, '_blank', options);
    }


}]);
