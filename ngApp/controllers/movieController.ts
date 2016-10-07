namespace imbd.Controllers {
    export class MovieController {
        public movies;

        constructor(private movieService:imbd.Services.MovieService,
                    private $stateParams: ng.ui.IStateParamsService,
                    private $uibModal: ng.ui.bootstrap.IModalService,
                    private $state:ng.ui.IStateService){
                        this.getMovies();
        }

        getMovies(){
            this.movies = this.movieService.getMovies();
        }

        getMovieDetails(id){
            this.$state.go('movieDetails', {id: id})
        }
    }
}
