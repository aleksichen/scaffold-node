export default class DashboardController {
    constructor($scope, $http) {
        this.$scope = $scope;
        this.init();
    }

    init() {
        this.$scope.message = "hello world";
    }

}

DashboardController.$inject = ['$scope', '$http'];