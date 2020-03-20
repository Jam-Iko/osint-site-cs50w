const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;
const mostRecentScore = JSON.parse(localStorage.getItem("mostRecentScore"));


let maxScore = MAX_QUESTIONS * CORRECT_BONUS;

console.log(mostRecentScore);

if (mostRecentScore <= (maxScore * 0.4)) {
	document.getElementById("unprotected").style.display="block";
}
else if ((mostRecentScore > (maxScore * 0.4)) && (mostRecentScore <= (maxScore * 0.8))){
	document.getElementById("couldDoBetter").style.display="block";
}
else {
		document.getElementById("protected").style.display="block";
};