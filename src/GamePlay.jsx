import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export const GamePlay = () => {
  const [questions, setQuestions] = useState(null);

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

  const questionsObject = questions?.map((question) => {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    return {
      id: nanoid(),
      question: decode(question.question),
      answers: answers,
    };
  });

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
                      name="one"
                      value="one"
                      checked
                    />
                    <label htmlFor="one">{decode(answer)}</label>
                  </div>
                );
              })}
            </form>
          </div>
        );
      })}

      <button>Check answers</button>
    </section>
  );
};
