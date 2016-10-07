namespace imbd {

    angular.module('imbd', ['ui.router', 'ngResource', 'ui.bootstrap', 'youtube-embed']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: imbd.Controllers.HomeController,
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: imbd.Controllers.AboutController,
                controllerAs: 'vm'
            })
            .state('movies', {
                url: '/movies',
                templateUrl: '/ngApp/views/movies.html',
                controller: imbd.Controllers.MovieController,
                controllerAs: 'vm'
            })
            .state('trailers', {
                url: '/trailers',
                templateUrl: '/ngApp/views/trailers.html',
                controller: imbd.Controllers.MovieDetailsController,
                controllerAs: 'vm'
            })
            .state('movieDetails', {
                url: '/movies/:id',
                templateUrl: '/ngApp/views/movieDetails.html',
                controller: imbd.Controllers.DetailsController,
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: imbd.Controllers.LoginController,
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: imbd.Controllers.RegisterController,
                controllerAs: 'vm'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    angular.module('imbd').factory('BearerAuthInterceptor',
    ($window:ng.IWindowService, $q:ng.IQService)=>{
        return {
            request: function(config){
                config.headers = config.headers || {};

                if($window.localStorage.getItem('token')){
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
                }
                return config || $q.when(config);
            },
            response: function(response){
                if(response.status === 401) {

                }
                return response || $q.when(response);
            }
        }
    });

}
