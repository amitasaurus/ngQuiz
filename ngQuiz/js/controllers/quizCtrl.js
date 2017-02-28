(function(){
	angular.module('quiz')
		   .controller('quizCtrl',function($scope, quizMetrics, dataService){

		   	$scope.quizMetrics = quizMetrics;
		   	var TotalQuestions = 0;
		   	dataService.getQuestions().success(function(response){
		   		$scope.questions = response;
		   		TotalQuestions = response.length;
		   	});

		   	$scope.alert = false;
		   	$scope.activeQuestion = 0;
		   	var TotalQuestionsAnswered = 0;
		   	$scope.finalize = false;

		   	$scope.setActiveQuestion = function(index){
		   		if(index === undefined){
		   		var breakout = false;
		   		var quizLength = TotalQuestions - 1;

		   		//this will keep on looping until it finds an unanswered question
		   		while(!breakout){
		   		$scope.activeQuestion = $scope.activeQuestion < quizLength ? $scope.activeQuestion+1 : 0; //activeQuestion is now updated
		   		if($scope.activeQuestion === 0){
		   			$scope.alert = true;
		   		}
		   		if($scope.questions[$scope.activeQuestion].selected === null){
		   			breakout = true;
		   		}
		   	 }
		   }
		   else $scope.activeQuestion = index;
		}

		   	$scope.questionAnswered = function(){

		   		for(var x = 0; x < TotalQuestions; x++){
		   		//if current question has been answered
		   		if($scope.questions[$scope.activeQuestion].selected !== null){
		   			TotalQuestionsAnswered++;
		   			if(TotalQuestionsAnswered >= TotalQuestions){
		   				// a final check to see if all questions has been ansrd
		   				for(var i = 0; i < TotalQuestions; i++) {
		   					if($scope.questions[i].selected === null){
		   						$scope.setActiveQuestion(i);
		   						return;
		   					}
		   				} 
		   			  $scope.alert = false;
		   			  $scope.finalize = true;
		   			  return;
		   			}
		   		}
		   	  }
		   		$scope.setActiveQuestion();//go to next question
		   	}

		   	$scope.selectAnswer = function(index){
		   		$scope.questions[$scope.activeQuestion].selected = index;
		  }


		  $scope.finalizeAnswers = function(){
		  	$scope.finalize = false;
		  	TotalQuestionsAnswered = 0;
		  	$scope.activeQuestion = 0;
		  	quizMetrics.markQuiz();
		  	quizMetrics.changeState(true);
		  	$scope.quizMetrics.quizActive = false;
		  }



	});
})();


//github.com/HungryTurtleCode/TurtleFactQuiz/blob/master/js/controllers/quiz.js