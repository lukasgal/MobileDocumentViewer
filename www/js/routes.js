angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab1': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/documents',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.documents', {
    url: '/documents',
    views: {
      'tab2': {
		cache: false,
        templateUrl: 'templates/documents.html',
        controller: 'documentsCtrl'
      }
    }
  })
  
  .state('documentView', {
      url: '/document/:url',
      templateUrl: 'templates/documentView.html',
      controller: 'documentViewCtrl'
    })


$urlRouterProvider.otherwise('/documents/settings')


});