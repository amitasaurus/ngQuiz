(function(){
	angular
		.module('quiz')
		.controller('listCtrl', function($scope, $http, quizMetrics, dataService){
			
			$scope.selectedHero = {};
			$scope.currentHero = function(hero){
				$scope.selectedHero = hero;
			};
			
			
			//getting heroes data from data service
			dataService.getHeroesData().success(function(response){
				$scope.heroes = response;
			});
			

			$scope.quizMetrics = quizMetrics;		
			$scope.activateQuiz = function(){
			 	quizMetrics.quizActive = !quizMetrics.quizActive;
			};
		});
})();

//using comicvine : http://comicvine.gamespot.com/api/characters/?api_key=82077fbf4a0ee55254ef81734d62a2abd9c42176&name=batman&format=json