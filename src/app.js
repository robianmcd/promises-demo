var app = angular.module('myApp', []);


var MainCtrl = function ($http, $scope) {
    this.$http = $http;
    this.$scope = $scope;
};

app.controller('mainCtrl', MainCtrl);


MainCtrl.prototype.tellAJoke = function () {
    var ctrl = this;

    ctrl.$http.post('/api/login', {username: 'rob', password: '1234'})
        .then(function (response) {
            return ctrl.$http.get('/api/user')
        })
        .then(function (response) {
            var user = response.data;
            return ctrl.$http.get('/api/tellAJoke?category=' + user.preferences.favouriteTypeOfJoke)
        })
        .then(function (response) {
            ctrl.joke = response.data;
        })
        .catch(function (err) {
            console.error(err);
        });
};