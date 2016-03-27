// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngAudio', 'ngStorage', 'ngCordova'])

// .run(function() {
//     setTimeout(function() {
//         $cordovaSplashscreen.hide();
//     }, 1000)
// })

.run(function($ionicPlatform, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

            $cordovaSplashscreen.hide()

    });
})


.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('app', {
        url: '/app',
        //abstract: true,
        templateUrl: 'templates/menu.html',
        controller: "ShowsCtrl"
    })

    // Each tab has its own nav history stack:

    .state('app.favorites', {
            url: '/favorites',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favorites.html',
                    controller: 'FavoritesCtrl'
                }
            }
        })
        .state('app.poweredby', {
            url: '/poweredby',
            views: {
                'menuContent': {
                    templateUrl: 'templates/poweredby.html'
                }
            }
        })

    .state('app.shows', {
            url: '/shows',
            views: {
                'menuContent': {
                    templateUrl: 'templates/shows.html',
                    controller: 'ShowsCtrl'
                }
            }
        })
        .state('app.show-detail', {
            url: '/show-detail/:showId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/show-detail.html',
                    controller: 'ShowDetailsCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/shows');

});