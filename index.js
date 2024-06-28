function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;

  this.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
  };

  this.loadQuestions = function () {
    if (this.questionIndex == this.questions.length) {
      this.showScores();
    } else {
      let questionElement = document.getElementById("question");
      questionElement.innerText = this.getQuestionByIndex().text;

      let choices = this.getQuestionByIndex().choices;
      for (let i = 0; i < choices.length; i++) {
        let element = document.getElementById("btn" + i);
        element.innerText = choices[i];
        this.handleOptionBtn("btn" + i);
      }
      this.handleRestartBtn("btn_rest", false);
      this.showProgress();
    }
  };
  this.showScores = function () {
    let h1 = document.querySelector("h1");
    h1.innerText = "Result";
    let quizDetails = document.querySelector(".quiz-details");
    quizDetails.innerHTML = `<h2> Your score is : ${
      this.score
    } and percentage is : ${(this.score / this.questions.length) * 100}</h2>
    <div style="text-align:center">
        <button id="btn_rest" >Restart</button>
    </div>
    `;
    this.handleRestartBtn("btn_rest", true);
  };
  this.showProgress = function () {
    let progress = document.getElementById("progress");
    progress.innerHTML = `Question ${this.questionIndex + 1} of ${
      this.questions.length
    }`;
  };

  this.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().answer == answer) {
      this.score++;
    }
  };

  this.restart = function (end) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    if (end) {
      let quizDetails = document.querySelector(".quiz-details");
      quizDetails.innerHTML = `
        <p id="question"></p>
        <div class="buttons">
            <button id="btn0"></button>
            <button id="btn1"></button>
            <button id="btn2"></button>
            <button id="btn3"></button>
        </div>
        <div style="text-align:center">
            <button id="btn_rest">Restart</button>
        </div>
        <hr>
        <p id="progress">Question x of y</p>
        `;
    }

    this.loadQuestions();
  };

  this.handleOptionBtn = function (btnId) {
    let btn = document.getElementById(btnId);
    let self = this;

    btn.onclick = function () {
      self.checkOptionWithAnswer(btn.innerText);
      self.questionIndex++;
      self.loadQuestions();
    };
  };

  this.handleRestartBtn = function (btnId, end) {
    let btn = document.getElementById(btnId);
    let self = this;

    btn.onclick = function (end) {
      self.restart(end);
    };
  };
}

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

const question1 = new Question(
  "JavaScript supports",
  ["Functions", "XHTML", "CSS", "HTML"],
  "Functions"
);
const question2 = new Question(
  "Which language is used for styling web pages?",
  ["HTML", "JQuery", "CSS", "XML"],
  "CSS"
);
const question3 = new Question(
  "Which is not a JavaScript Framework?",
  ["Python Script", "JQuery", "Django", "NodeJS"],
  "Django"
);
const question4 = new Question(
  "Which is used for Connect To Database?",
  ["PHP", "HTML", "JS", "All"],
  "PHP"
);
const question5 = new Question(
  "JavaScript is a",
  ["Language", "Programming Language", "Development", "All"],
  "Programming Language"
);

let questions = [question1, question2, question3, question4, question5];
let quiz = new Quiz(questions);

quiz.loadQuestions();
