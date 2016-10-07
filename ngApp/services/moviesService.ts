namespace imbd.Services {
    export class MovieService {
        public movieResource

        constructor ($resource: ng.resource.IResourceService){
            this.movieResource = $resource('/api/movies/:id')
        }

        getMovies(){
            return this.movieResource.query();
        }

        getMovie(id){
            return this.movieResource.get({id:id})
        }

    }
    angular.module('imbd').service('movieService', MovieService)
}
