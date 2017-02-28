(function(){
	angular.module('quiz')
		   .factory('dataService', function($http){
		   	var dataObj = {};

		   	dataObj.getHeroesData = function(){
		   		return $http.get('js/model/heroes.json');
		   	};
		   	dataObj.getQuestions = function(){
		   		return $http.get('js/model/questions.json');
		   	}
		   	dataObj.getAnswers = function(){
		   		return $http.get('js/model/correctAnswers.json');
		   	}
		  return dataObj;
	 });
})();

//https://ciphertrick.com/2014/12/21/serving-processed-http-response-from-factoriesin-angularjs/