let questions = [

    {
        'question': 'Welche Vögel legen niemals Eier? ',
        'answer_1': 'Kanarien',
        'answer_2': 'Männliche Vögel',
        'answer_3': 'Tauben',
        'answer_4': 'Rotkehlchen',
        'right_answer': 2

    },

    {
        'question': 'Wie lange dauert der 30-jährige Krieg?',
        'answer_1': '30 Jahre',
        'answer_2': 'Für Immer',
        'answer_3': '30 Tage',
        'answer_4': '3 Stunden',
        'right_answer': 1

    },
    {
        'question': 'Einige Monate haben 30, einige 31 Tage. Wie viele haben 28 Tage?',
        'answer_1': '5',
        'answer_2': '3',
        'answer_3': '8',
        'answer_4': 'Alle – jeder Monat hat mindestens 28 Tage.',
        'right_answer': 4
    },
    {
        'question': 'Wie heißt ein Bumerang, der nach dem Werfen nicht zurückkommt?',
        'answer_1': 'Nomerang',
        'answer_2': 'Humerang',
        'answer_3': 'Blumerang',
        'answer_4': 'Holzstock',
        'right_answer': 4
    },
    {
        'question': 'Wie heißt ein Kölner Gott mit einem Buchstaben?',
        'answer_1': 'Frigg',
        'answer_2': 'J (Jott)',
        'answer_3': 'Balder',
        'answer_4': 'Fulla',
        'right_answer': 2
    }
];


let currentQuestion = 0;


function init() {
    document.getElementById('allQuestions').innerHTML = `${questions.length}`;
    showQuestion();
}

function showQuestion() {

    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').style = '';
        document.getElementById('endScreen').classList.add('show-result');
        document.getElementById('questionScreen').style = 'display: none;';
        document.getElementById('quizz-pic').src = 'img/trophy.png';
    } else {
        let question = questions[currentQuestion];

        document.getElementById('presentQuestion').innerHTML = `${currentQuestion + 1}`;
        document.getElementById('question').innerHTML = `${question['question']}`;
        document.getElementById('answer_1').innerHTML = `${question['answer_1']}`;
        document.getElementById('answer_2').innerHTML = `${question['answer_2']}`;
        document.getElementById('answer_3').innerHTML = `${question['answer_3']}`;
        document.getElementById('answer_4').innerHTML = `${question['answer_4']}`;
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-success');
    } else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
    }
    document.getElementById('nextButton').disabled = false;
}


function nextQuestion(selection) {
    currentQuestion++;
    resetAnswerFields();
    showQuestion();

}


function resetAnswerFields() {
    document.getElementById('nextButton').disabled = true;
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
}