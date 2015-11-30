var moduleName = "Auth.service";

export default class AuthService {
    constructor($q, $http) {
        this.$http = $http;
        this.$q = $q;
        this._authenticated = false;
    }

    isAuthenticated() {
        //do something
    }

    authenticate(idfa) {
        //do something
    }

    logout() {
        //do something
    }
}

AuthService.$inject = ['$q', '$http'];

export default angular.module(moduleName, []).service('AuthService', AuthService).name;