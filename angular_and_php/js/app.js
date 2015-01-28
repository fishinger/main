var restApp = angular.module( 'restApp', [] )


/************************************************************
 * Main controller of whole app
 */
.factory('menuFactory', ['$http', '$q', function($http, $q){
	var item = null;
	return{
		setPhones: function(){
			var deferred = $q.defer();
			$.post('main.php', {}, function(data){
				item = JSON.parse(data);
				deferred.resolve(item);
			}).error(function(data, status){
				deferred.reject('Error!!!!!');
				console.log(data);
				console.log(status);
			})
			return deferred.promise;
		}
	}
}])

.controller( 'mainCtrl', [ 'menuFactory', '$scope', '$rootScope', function( menuFactory, $scope, $rootScope ){
	$scope.open = function(){
		menuFactory.setPhones().then(function(menuObj){
			$scope.phones = menuObj;
		});
	}
}])
