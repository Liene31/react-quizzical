import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export const GamePlay = () => {
  //State variables
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [newGame, setNewGame] = useState(false);

  //Derived variables
  const correctAnswers = questions.map((answer) => {
    return answer.correctAnswer;
  });
  const userSelection = Object.values(selectedAnswer);
  //Compares user choice with correct answers,
  //if correct, filter creates array with matching cases
  const correctAnswerCount = userSelection.filter((choice) =>
    correctAnswers.includes(choice),
  ).length;

  //Function to shuffle answers
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //Loops through the questions and creates the object with questions and answers
  const questionsObject = (data) =>
    data?.map((question) => {
      const correct = decode(question.correct_answer);
      const answers = shuffle([
        ...question.incorrect_answers.map((answer) => decode(answer)),
        correct,
      ]);

      return {
        id: nanoid(),
        question: decode(question.question),
        correctAnswer: correct,
        answers: answers,
      };
    });

  //Fetch the data from Trivia API
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((res) => {
        setQuestions(questionsObject(res.data.results));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newGame]);

  //Handles the answer selected
  function handleAnswer(e) {
    const answer = e.target.value;
    const answerId = e.target.name;

    setSelectedAnswer((prev) => {
      const answers = {
        ...prev,
        [answerId]: answer,
      };
      return answers;
    });
  }

  //Button - checks if the "Check Answers" is clicked and flips boolean
  function handleSubmit(e) {
    e.preventDefault();
    setCheckAnswers((prev) => (prev ? false : true));
  }

  //Button - restarts the game
  function newGameBtn() {
    setCheckAnswers(false);
    //flips to true and triggers the useEffect() by newGame in dependency to re-run and fetch new questions
    setNewGame((prev) => (prev ? false : true));
    setSelectedAnswer({});
  }

  // RETURN
  return (
    <section className="game-play">
      {questions?.map((question) => {
        return (
          <div key={question.id} className="question-container">
            <h2>{question.question}</h2>
            <form>
              {question.answers.map((answer, index) => {
                const isSelected = selectedAnswer[question?.id] === answer;

                const isCorrect = answer === question.correctAnswer;
                const isWrong =
                  question.correctAnswer !== selectedAnswer[question?.id];

                return (
                  <div key={index} className="answers">
                    <input
                      type="radio"
                      id={question.id + index}
                      name={question.id}
                      value={answer}
                      checked={isSelected}
                      onChange={handleAnswer}
                    />
                    <label
                      htmlFor={question.id + index}
                      className={
                        checkAnswers && isCorrect
                          ? "correct-answers"
                          : checkAnswers && isSelected && isWrong
                            ? "wrong-answers"
                            : isSelected
                              ? "checked"
                              : undefined
                      }
                    >
                      {answer}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        );
      })}

      {checkAnswers ? (
        <div className="game-end">
          <p>
            You scored {correctAnswerCount}/{questions.length} correct answers
          </p>
          <button className="game-end-btn" onClick={newGameBtn}>
            Play again
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={userSelection.length !== questions.length ? true : false}
        >
          Check answers
        </button>
      )}
    </section>
  );
};
