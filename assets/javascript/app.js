var questionNumber;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var answered; 
var selection; 
var time;
var seconds;
var min_w = 300;
var vid_w_orig;
var vid_h_orig;
var questions = [{		//create array of questions, their possible answers, the index of correct answer
	
	question: "Which artist recorded the current track being played?",
	answers: ["Gucci Mane", "Kanye", "Lil Wayne", "Drake"],
	correctAnswer: 3,
	audioFile: "assets/images/drake.mp3",
	picture: "drake.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Lil Uzi Vert", "Blac Youngsta", "Famous Dex", "Ralo"],
	correctAnswer: 2,
	audioFile: "assets/images/famousdex.mp3",
	picture: "dex.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Swae Lee", "Slim Jimmy", "K Camp", "Bryson Tiller"],
	correctAnswer: 0,
	audioFile: "assets/images/swaelee.mp3",
	picture: "slee.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["ASAP NAST", "Joey Badass", "Young M.A.", "ASAP Rocky"],
	correctAnswer: 3,
	audioFile: "assets/images/rocky.mp3",
	picture: "rocky.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["21 Savage", "Playboi Carti", "Kodak Black", "Wifisfuneral"],
	correctAnswer: 0,
	audioFile: "assets/images/21.mp3",
	picture: "21.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Lil Wayne", "2Chainz", "Jeremih", "Big Sean"],
	correctAnswer: 1,
	audioFile: "assets/images/2chainz.mp3",
	picture: "2chainz.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Young Thug", "Kevin Gates", "Rich Homie Quan", "Jacquees"],
	correctAnswer: 0,
	audioFile: "assets/images/thug.mp3",
	picture: "thug.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Ski Mask da Slump God", "Lil Pump", "XXXTentacion", "Ugly God"],
	correctAnswer: 2,
	audioFile: "assets/images/xxx.mp3",
	picture: "xxx.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Vic Mensa", "Vince Staples", "Brockhampton", "Domo Genesis"],
	correctAnswer: 1,
	audioFile: "assets/images/vstaples.mp3",
	picture: "staples.jpg"
},{
	question: "Which artist recorded the current track being played?",
	answers: ["Bryson Tiller", "Tory Lanez", "Majid Jordan", "The Weeknd"],
	correctAnswer: 3,
	audioFile: "assets/images/weeknd.mp3",
	picture: "weeknd.jpg"
}];

var messages = {
	correct: "Yuh",
	noTime: "No time left!",
	done: "Let's see how well you matched our songs and artists.",
	incorrect: "Wrong bruh bruh"
};

$(document).ready(function(){

	$(function() {
	    vid_w_orig = parseInt($('video').attr('width'));
	    vid_h_orig = parseInt($('video').attr('height'));

	    $(window).resize(function () { fitVideo(); });
	    $(window).trigger('resize');
	});

	function fitVideo() {

	    $('#background-wrap').width($('.fullsize-video-bg').width());
	    $('#background-wrap').height($('.fullsize-video-bg').height());

	    var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
	    var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
	    var scale = scale_h > scale_v ? scale_h : scale_v;

	    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

	    $('video').width(scale * vid_w_orig);
	    $('video').height(scale * vid_h_orig);

	    $('#background-wrap').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
	    $('#background-wrap').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);
	};
});

$('#startBtn').on('click', function(){
	$(this).hide();
	startGame();
});
$('#startOverBtn').on('click', function(){
	$(this).hide();
	startGame();
});


function startGame(){
	$('#endMessage').empty();
	$('#endCorrect').empty();
	$('#endIncorrect').empty();
	$('#endUnanswered').empty();
	questionNumber = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;

	nextQuestion();
};

function nextQuestion(){
	$('#message').empty();
	$('#updateAnswer').empty();
	$('#giphy').empty();
	answered = true;
	//Fill out Questions page section of html 
	$('#questionNumber').html('Question: '+(questionNumber + 1) + '/' + questions.length);
	$('.question').html('<h2>' + questions[questionNumber].question + '</h2>');
	$('.currentSong').html('<audio preload="auto" autoplay="true" loop="loop"><source src="' + questions[questionNumber].audioFile + '" type="audio/mpeg"></audio>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(questions[questionNumber].answers[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerChoices').append(choices);
	}
	countDown();
	//events after you click on an answer regardless if right or wrong
	$('.thisChoice').on('click',function(){
		selection = $(this).data('index');
		clearInterval(time);
		selectionPage();
	});
}

function countDown(){
	seconds = 25;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(seeCountDown, 1000);	//creates visible timer function
}

function seeCountDown(){
	seconds--;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		selectionPage();
	}
}

function selectionPage(){
	$('#questionNumber').empty();
	$('.thisChoice').empty();
	$('.question').empty();
	$('.currentSong').empty();

	var correctMessage = questions[questionNumber].answers[questions[questionNumber].correctAnswer]; //shows text of index number answer
	var correctMessageChoice = questions[questionNumber].correctAnswer; //shows index number
	$('#giphy').html('<img src = "assets/images/'+ questions[questionNumber].picture +'">');
	//check to see if answer is correct not-correct or unanswered
	if((selection == correctMessageChoice) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((selection != correctMessageChoice) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#updateAnswer').html('The OG is: ' + correctMessage);
	} else{
		unanswered++;
		$('#message').html(messages.noTime);
		$('#updateAnswer').html('The OG is: ' + correctMessage);
	}

	if(questionNumber == (questions.length-1)){
		setTimeout(finalScore, 2500)
	} else{
		questionNumber++
		setTimeout(nextQuestion, 2000);
	}
}

function finalScore(){
	$('#timer').empty();
	$('#message').empty();
	$('#updateAnswer').empty();
	$('#giphy').empty();

	$('#endMessage').html(messages.done);
	$('#endCorrect').html("Correct Answers: " + correctAnswer);
	$('#endIncorrect').html("Incorrect Answers: " + incorrectAnswer);
	$('#endUnanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset')
	$('#startOverBtn').show();
	$('#startOverBtn').html('Restart');
}

