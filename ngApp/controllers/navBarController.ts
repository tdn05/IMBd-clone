namespace imbd.Controllers {
    class NavBarController {

        constructor(private loginService: imbd.Services.LoginService,
                    private $state: ng.ui.IStateService){

        }

        getUsername(){
            return this.loginService.getUsername();
        }

        isAdmin(){
            return this.loginService.isAdmin();
        }
        logout(){
            this.loginService.logout();
            this.$state.go('login')
        }
    }
    angular.module('imbd').controller('navBarController', NavBarController);
}
