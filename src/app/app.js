import angular from 'angular';
import uirouter from 'angular-ui-router';
import DashboardController from './js/controllers/Dashboard.js';
import AuthService from './js/services/Auth.js';

var moduleName = "myapp";

if (process.env.BROWSER) {
    require("normalize.css");
}

angular.module('myApp', [uirouter, AuthService])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: require('./tpl/dashboard.html'),
                title: "dashboard",
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            });
        $urlRouterProvider.otherwise("/dashboard");
    })
    .factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
        return {
            request: function (request) {
                //do something with request
                return request;
            },
            response: function (response) {
                //do something with response
                return response;
            },
            responseError: function (rejection) {
                //do something with rejection
                return $q.reject(rejection);
            }
        }
}])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    })
    .run(function ($http, $rootScope, $state) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            //do something when stateChangeStart
        });

        $rootScope.$on("$stateChangeSuccess", function (event, current, previous) {
            //do something when stateChangeSuccess
        });

    })
    .controller('DashboardController', DashboardController);


angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});

export default moduleName;