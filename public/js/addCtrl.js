// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice){
  // Initialize Variables
  // ==============================================================
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set initial coordinates to the center of Brazil
  $scope.formData.latitude = -16.333333;
  $scope.formData.longitude = -48.966667;

  // Functions
  // ==============================================================
  // Creates a new user based on the form fields
  $scope.createUser = function() {
  var userData = {
      username:     $scope.formData.username,
      gender:       $scope.formData.gender,
      age:          $scope.formData.age,
      favlang:      $scope.formData.favlang,
      location:     [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
  } ;
  // Saves the user data to the db
  $http.post('/users', userData)
       .success(function (data){
         //Once completed, clear the form (except location)
         $scope.formData.username = "";
         $scope.formData.gender = "";
         $scope.formData.age = "";
         $scope.formData.favlang = "";
       })
       .error(function (data){
         console.log('Error: ' + data);
       });
  };

  $scope.createFeira = function() {
  var feiraData = {
      //username:     $scope.formData.username,
      diasemana:       $scope.formData.diasemana,
      horarioinicio:   $scope.formData.horarioinicio,
      horariotermino:  $scope.formData.horariotermino,
      location:        [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified:    $scope.formData.htmlverified
  } ;
  // Saves the user data to the db
  $http.post('/feira', feiraData)
       .success(function (data){
         //Once completed, clear the form (except location)
         $scope.formData.diasemana = "";
         $scope.formData.horarioinicio = "";
         $scope.formData.horariotermino = "";
         //$scope.formData.favlang = "";
       })
       .error(function (data){
         console.log('Error: ' + data);
       });
  };
});
