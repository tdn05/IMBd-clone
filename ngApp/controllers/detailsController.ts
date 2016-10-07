namespace imbd.Controllers {
    export class DetailsController {
        public movie;
        public movId;

        constructor(private movieService: imbd.Services.MovieService,
                    private $stateParams:ng.ui.IStateParamsService){
                        let movId = this.$stateParams['id']
                        this.getMovie(movId);

        }
        getMovie(movId){
            this.movie = this.movieService.getMovie(movId);
        }
    }
}
