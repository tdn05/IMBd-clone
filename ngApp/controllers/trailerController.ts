namespace imbd.Controllers {
    export class TrailerController {
        public movie;

        constructor(private movieService: imbd.Services.MovieService,
                    public movId,){
                        this.getMovie();
        }
        getMovie(){
            this.movie = this.movieService.getMovie(this.movId)
        }
    }
}
