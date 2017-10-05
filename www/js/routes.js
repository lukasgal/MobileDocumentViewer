angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.pivko', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/pivko.html',
        controller: 'pivkoCtrl'
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
      'tab1': {
		cache: false,
        templateUrl: 'templates/documents.html',
        controller: 'documentsCtrl'
      }
    }
  })

  .state('tabsController.winko', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/winko.html',
        controller: 'winkoCtrl'
      }
    }
  })
  
  .state('documentView', {
      url: '/document/:id',
      templateUrl: 'templates/documentView.html',
      controller: 'documentViewCtrl'
    })


$urlRouterProvider.otherwise('/documents/documents')


});