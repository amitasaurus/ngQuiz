(function(){
	angular.module('quiz')
		   .controller('resultsCtrl', function($scope, quizMetrics){
		   	$scope.quizMetrics = quizMetrics;
	})
})()