namespace imbd.Controllers {
    export class RegisterController {
        public user;

        constructor(private registerService: imbd.Services.RegisterService,
                    private $state: ng.ui.IStateService,
                    private loginService: imbd.Services.LoginService){

                    }
        saveUser(){
            this.registerService.saveUser(this.user)
            .then(()=>{
                this.$state.go('home');
                this.loginService.getUsername();
            })
            .catch(()=>{
                console.log('something went wrong')
            })
        }
    }
}
