// Created based on additional online-course covered
// Source https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  	{
	    question: "When I need to set up a password I...",
	    choice1: "Re-use the same one I had since the dawn of computers",
	    choice2: "Use sequences such as 123456 or qwwerty",
	    choice3: "Create a password containing letters, number and special characters",
	    choice4: "Do I need to set up passwords?",
	    answer: 3
  	},
  	{
	    question: "What are your privacy settings?",
	    choice1: "Disabled location tracking, voice-controled assistants",
	    choice2: "Blocked e-mail tracking and switched to DuckDuckGo",
	    choice3: "All of the above",
	    choice4: "Why do I need privacy settings?",
	    answer: 3
  	},
  	{
	    question: "I share on my social media my...",
	    choice1: "Name, age, city, photos, family members",
	    choice2: "Name, age, city, photos, family members, trips",
	    choice3: "Name, age, city, photos, family members, trips, current location",
	    choice4: "I try to avoid ovesharing",
	    answer: 4
  	},
  	{
	    question: "When son of the deposed king of Nigeria emails you directly, asking for help, you...",
	    choice1: "Help",
	    choice2: "Report phishing",
	    choice3: "Ignore",
	    choice4: "I have only dealt with daughter of the deposed king of Kenia",
	    answer: 2
  	},
  	{
	    question: "Do you have accounts that you do not use?",
	    choice1: "No, I close them up and unsubscribe",
	    choice2: "Sure, I keep them for future generations",
	    choice3: "I can neither confirm nor deny it",
	    choice4: "I sign up for everything, should I also use it?",
	    answer: 1
  	},
  	{
	    question: "Free public Wi-Fi network is...",
	    choice1: "Something that I use constantly",
	    choice2: "Last resort and only for non-sensitive information",
	    choice3: "Forever stored in my device's memory",
	    choice4: "Free Internet for free people",
	    answer: 2
  	}
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem("mostRecentScore", JSON.stringify(score));
		return window.location.assign("result.html");
	}
	
	questionCounter++;

	questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;
	
	choices.forEach( choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener("click", e => {
		if (!acceptingAnswers) return;
		
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		
		if (classToApply === "correct") {
			incrementScore(CORRECT_BONUS);
		};

		selectedChoice.parentElement.classList.add(classToApply);
		
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = num => {
	score += num;
	scoreText.innerText = score;
};

startGame();