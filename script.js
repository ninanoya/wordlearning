var dictionary = {};
var quizResults = [];
var currentQuestion, correctAnswer;
var totalQuestions = 5; // 총 문제 수를 설정합니다.

// 단어 입력 필드에 'Enter' 키 이벤트 리스너를 추가합니다.
document.getElementById('wordInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addWord();
    }
});

// 뜻 입력 필드에 'Enter' 키 이벤트 리스너를 추가합니다.
document.getElementById('meaningInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addWord();
        // 단어 입력 필드로 포커스를 이동합니다.
        document.getElementById('wordInput').focus();
    }
});

// 단어를 사전에 추가하는 함수입니다.
function addWord() {
    var word = document.getElementById('wordInput').value;
    var meaning = document.getElementById('meaningInput').value;
    if (word && meaning) {
        dictionary[word] = meaning;
        updateStatus(word + " has been added to the dictionary.");
        document.getElementById('wordInput').value = '';
        document.getElementById('meaningInput').value = '';
        document.getElementById('wordInput').focus(); // 입력 후 단어 입력 필드로 포커스를 이동합니다.
    } else {
        updateStatus("Please enter both word and meaning.");
    }
}

// 퀴즈를 시작하는 함수입니다.
function startQuiz() {
    if (Object.keys(dictionary).length < 1) {
        updateStatus("No words in the dictionary. Please add words first.");
        return;
    }

    quizResults = [];
    document.getElementById('quizSection').style.display = 'block';
    nextQuestion();
}

// 다음 퀴즈 질문으로 넘어가는 함수입니다.
function nextQuestion() {
    if(quizResults.length < totalQuestions) {
        var words = Object.keys(dictionary);
        var randomWord = words[Math.floor(Math.random() * words.length)];
        currentQuestion = randomWord;
        correctAnswer = dictionary[randomWord];
        document.getElementById('question').innerText = "What is the meaning of " + currentQuestion + "?";
        document.getElementById('answerInput').value = '';
        document.getElementById('answerInput').focus();
    } else {
        finishQuiz();
    }
}

// 답변 입력 필드에 'Enter' 키 이벤트 리스너를 추가합니다.
document.getElementById('answerInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// 사용자의 답변을 확인하는 함수입니다.
function checkAnswer() {
    var userAnswer = document.getElementById('answerInput').value;
    var isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    quizResults.push({ question: currentQuestion, userAnswer: userAnswer, isCorrect: isCorrect });

    if (isCorrect) {
        updateStatus("Correct!");
    } else {
        updateStatus("Wrong. The correct answer is " + correctAnswer + ".");
    }

    // 다음 문제로 넘어가기 전에 잠시 기다립니다.
    setTimeout(nextQuestion, 1000);
}

// 퀴즈가 끝나고 결과를 표시하는 함수입니다.
function finishQuiz() {
    document.getElementById('quizSection').style.display = 'none';
    var score = quizResults.filter(result => result.isCorrect).length;
    updateStatus("Quiz Completed. Score: " + score + " / " + totalQuestions + "\n\nQuiz Results:\n" + quizResults.map(result => 
        "Question: " + result.question + "\nYour Answer: " + result.userAnswer + " - " + 
        (result.isCorrect ? "Correct" : "Wrong")).join("\n\n"));
}

// 상태 메시지를 업데이트하는 함수입니다.
function updateStatus(message) {
    var statusDiv = document.getElementById('status');
    statusDiv.innerText = message;
    statusDiv.style.display = 'block'; // 결과 메시지가 사용자에게 보이도록 설정합니다.
}
