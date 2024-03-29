let rightQuestions = 0;
let currentQuestion = 0;


let audioSuccess = new Audio('../audio/success.mp3');
let audioWrong = new Audio('../audio/wrong.mp3');


function init() {
    document.getElementById('allQuestions').innerHTML = `${questions.length}`; // show the amount of all questions on questionscreen
    showQuestion();
}


function startGame() {
    document.getElementById('welcome').classList.add('d-none');             // remove welcome screen
    document.getElementById('questionScreen').classList.remove('d-none');   // show question screen
    document.getElementById('progressBars').classList.remove('d-none');     // show progress bar
    document.getElementById('nav').classList.add('title-res');           // hide nav-bar responsive
    document.getElementById('progressBar').style = `width: 0%;`; 
}


function showQuestion() {
    if (gameOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();
        enableAnswer();
    }
}


function gameOver() {
    return currentQuestion >= questions.length; // wenn ich die letze Frage beantworte  
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;                 // percent = die nr von der jeweiligen Frage durch die länge von JSON (in diesem Fall 7)
    percent = Math.round(percent * 100);                                    // Matherechung damit die summe nicht mit 0 davor gezeit wird. Math.round() zum aufrunden
    document.getElementById('progressBar').innerHTML = `${percent}%`;       // zeigt an bei wie viel Prozent ich grade bin
    document.getElementById('progressBar').style = `width: ${percent}%;`;   // ändert die breite von der Progressbar und somit auch die Farbe bzw Fülle
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];                                       // die stelle 0 von der JSON Array
    document.getElementById('presentQuestion').innerHTML = `${currentQuestion + 1}`; // show the number of the question (die Stelle 0 +1 jedes mal)
    document.getElementById('question').innerHTML = `${question['question']}`;       // show the content
    document.getElementById('answer_1').innerHTML = `<div class="bg-answer"><b>A</b></div> ${question['answer_1']}`;       // show the content
    document.getElementById('answer_2').innerHTML = `<div class="bg-answer"><b>B</b></div> ${question['answer_2']}`;       // show the content
    document.getElementById('answer_3').innerHTML = `<div class="bg-answer"><b>C</b></div> ${question['answer_3']}`;       // show the content
    document.getElementById('answer_4').innerHTML = `<div class="bg-answer"><b>D</b></div> ${question['answer_4']}`;       // show the content
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';                            //remove display none from endscreen
    document.getElementById('questionScreen').style = 'display: none;';         // add d-none to questionscreen
    document.getElementById('quizz-pic').src = '../img/result.png';             // change quiz image to trophy img 
    document.getElementById('quizz-pic').classList.add('end-screen-pic');       // add new style to the trophy img
    document.getElementById('allQuestionsResult').innerHTML = questions.length; // show how many questions i have on the result (endscreen)
    document.getElementById('rightQuestions').innerHTML = rightQuestions;       // show how many queestion i answered right
}


function answer(selection) {                                    //selection ist die id von der jeweiligen Antwort
    let question = questions[currentQuestion];                  //  die stelle 0 von der JSON Array
    let selectedQuestionNumber = selection.slice(-1);           // hole das letze Buchstaben von der id heraus (um den richtigen Antwort zu finden)
    let idOfRightAnswer = `answer_${question['right_answer']}`; // der richtige Antwort

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        heightlightTheRightAnswer(selection);
        disableAnswer();
        updateProgressBar();
    } else {
        highlightWrongAnswer(selection, idOfRightAnswer);
        disableAnswer();
        updateProgressBar();
    }
    document.getElementById('nextButton').disabled = false;  // jedes mal wenn man auf eine Antwort klickt, wird der Button enabled
}


function disableAnswer() {
    document.getElementById('answer_1').classList.add('disable');           // mach das Antwortfeld unclickbar wenn eine antwort ausgewählt wurde
    document.getElementById('answer_2').classList.add('disable');           // mach das Antwortfeld unclickbar wenn eine antwort ausgewählt wurde
    document.getElementById('answer_3').classList.add('disable');           // mach das Antwortfeld unclickbar wenn eine antwort ausgewählt wurde
    document.getElementById('answer_4').classList.add('disable');           // mach das Antwortfeld unclickbar wenn eine antwort ausgewählt wurde
}


function enableAnswer() {
    document.getElementById('answer_1').classList.remove('disable');        //mach die nächste Antwort wieder clickbar
    document.getElementById('answer_2').classList.remove('disable');        //mach die nächste Antwort wieder clickbar
    document.getElementById('answer_3').classList.remove('disable');        //mach die nächste Antwort wieder clickbar
    document.getElementById('answer_4').classList.remove('disable');        //mach die nächste Antwort wieder clickbar
}

function heightlightTheRightAnswer(selection) {
    document.getElementById(selection).classList.add('bg-success'); // style die richtige antwort grün
    audioSuccess.play();                                            // play success audio 
    rightQuestions++;                                               // rightQuestions wird um eins erhöht jedes mal wenn ich eine richtige Antwort gebe
}


function highlightWrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).classList.add('bg-danger');         // style die falsche antwort rot 
    document.getElementById(idOfRightAnswer).classList.add('bg-success'); // zeige gleichzeitig auch die Richtige Antwort
    audioWrong.play();
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']; // wenn das letze Buchstabe von dem Antworts id die gleiche nr wie die right-answer hat
}


function nextQuestion() {
    currentQuestion++;
    resetAnswerFields();
    showQuestion();
}


function resetAnswerFields() {                                          // wenn die nächste Frage angezeigt wird
    document.getElementById('nextButton').disabled = true;              // der Button wird disabled 
    document.getElementById('answer_1').classList.remove('bg-danger');  // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_1').classList.remove('bg-success'); // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_2').classList.remove('bg-danger');  // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_2').classList.remove('bg-success'); // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_3').classList.remove('bg-danger');  // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_3').classList.remove('bg-success'); // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_4').classList.remove('bg-danger');  // lösche alle styles ( farben) aus allen feldern
    document.getElementById('answer_4').classList.remove('bg-success'); // lösche alle styles ( farben) aus allen feldern
}


function restartGame() {
    document.getElementById('nav').classList.remove('title-res');               // show nav-bar responsive
    document.getElementById('welcome').classList.remove('d-none');              // show welcome screen
    document.getElementById('questionScreen').classList.add('d-none');          // hide questionscreen
    document.getElementById('progressBars').classList.add('d-none');            // hide progressbar 
    document.getElementById('quizz-pic').src = '../img/quiz.png';               // changequiz picture
    document.getElementById('questionScreen').style = '';                       // zeige den questionScreen wieder an 
    document.getElementById('endScreen').style = 'display: none;';              // blende den EndScreen aus
    document.getElementById('quizz-pic').classList.remove('end-screen-pic');    // remove the height style from the quizz img
    rightQuestions = 0;                                                         // setze die variablen wieder auf 0 zurück
    currentQuestion = 0;                                                        // setze die variablen wieder auf 0 zurück
    init();
}