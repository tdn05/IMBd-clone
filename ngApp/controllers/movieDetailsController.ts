namespace imbd.Controllers {
    export class MovieDetailsController {
    public movies;

    constructor(private movieService:imbd.Services.MovieService,
                private $uibModal:ng.ui.bootstrap.IModalService){
        this.getMovies();
    }

    getMovies(){
        this.movies = this.movieService.getMovies();
    }

    getMovieDetails(id){
        this.$uibModal.open({
            templateUrl:'ngApp/views/trailerDetail.html',
            controller: imbd.Controllers.TrailerController,
            controllerAs:'vm',
            resolve: {
                movId: ()=>id,
            },
            size: 'lg'
        })
    }
    }


}
