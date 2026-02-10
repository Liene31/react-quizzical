import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export const GamePlay = () => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});

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
      const answers = [...question.incorrect_answers, question.correct_answer];
      console.log(question.correct_answer);
      return {
        id: nanoid(),
        question: decode(question.question),
        correctAnswer: decode(question.correct_answer),
        answers: shuffle(answers),
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
  }, []);

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

  //Button to check answers
  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedAnswer);
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
                const isSelected =
                  selectedAnswer[question?.id] === decode(answer);
                return (
                  <div key={index} className="answers">
                    <input
                      type="radio"
                      id={question.id + index}
                      name={question.id}
                      value={decode(answer)}
                      checked={isSelected}
                      onChange={handleAnswer}
                    />
                    <label
                      htmlFor={question.id + index}
                      className={isSelected ? "checked" : undefined}
                    >
                      {decode(answer)}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        );
      })}

      <button onClick={handleSubmit}>Check answers</button>
    </section>
  );
};
