(function(){
	angular.module('quiz')
		   .factory('quizMetrics',function(dataService){
		   	var quizObj = {
		   	  quizActive : false,
		   	  resultsActive : false,
		   	  changeState : changeState,
		   	  correctAnswers : [],
		   	  markQuiz : markQuiz,
		   	  numCorrect : 0
	   };
	   return quizObj;

	   function changeState(state){
	   		quizObj.resultsActive =  state;
	   }

	   var questions = [];
	   var answers = [];
	   var quizLen = 0;
	   dataService.getQuestions().success(function(response){
				questions =  response;
				quizLen = questions.length;
			});


	   function markQuiz(){
	   	dataService.getAnswers().success(function(response){
				quizObj.correctAnswers =  response;
				answers = response;
			});

	   	for(var i = 0; i < quizLen; i++){
	   		if(questions[i].selected === answers[i]){
	   			questions[i].correct = true;
	   			quizObj.numCorrect++;
	   		}else{
	   			questions[i].correct = false;
	   		}
	   	}
	   }
	});
})();