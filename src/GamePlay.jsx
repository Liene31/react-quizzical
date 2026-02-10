import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export const GamePlay = () => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState();

  //Fetch the data from Trivia API
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((res) => {
        setQuestions(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Loops through the questions and creates the object with questions and answers
  const questionsObject = questions?.map((question) => {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    return {
      id: nanoid(),
      question: decode(question.question),
      answers: answers,
    };
  });

  //Handles the answer selected
  function handleAnswer(e) {
    setSelectedAnswer(e.target.value);
  }

  //Button to check answers
  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedAnswer);
  }

  console.log(selectedAnswer);

  // RETURN
  return (
    <section className="game-play">
      {questionsObject?.map((question) => {
        return (
          <div key={question.id} className="question-container">
            <h2>{question.question}</h2>
            <form>
              {question.answers.map((answer, index) => {
                return (
                  <div key={index} className="answers">
                    <input
                      type="radio"
                      id="one"
                      name="answer"
                      value={decode(answer)}
                      checked={selectedAnswer === decode(answer)}
                      onChange={handleAnswer}
                    />
                    <label htmlFor="one">{decode(answer)}</label>
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
