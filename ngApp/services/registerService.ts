namespace imbd.Services {
    export class RegisterService {
        private userResource;

        constructor(private $resource: ng.resource.IResourceService,
                    private $http: ng.IHttpService,
                    private $q: ng.IQService,
                    private $window: ng.IWindowService){
        }
        // saveUser(user){
        //     console.log(user);
        //     return this.userResource.save(user).$promise;
        //
        // }
        saveUser(user){
            return this.$q((resolve,reject)=>{
                this.$http.post('/api/users/register', user)
                .then((data:any)=>{
                    console.log(data);
                    let token = data.data.token;
                    let admin = data.data.admin;
                    let username = data.data.username;

                    this.$window.localStorage.setItem('token', token);
                    this.$window.localStorage.setItem('username', username);
                    this.$window.localStorage.setItem('admin', admin);

                    resolve()
                })
                .catch((err)=>{
                    reject(err)
                })
            })
        }
    }
    angular.module('imbd').service('registerService', RegisterService);
}
