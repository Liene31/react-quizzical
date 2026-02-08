import axios from "axios";
import { useEffect, useState } from "react";

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

  if (!questions) {
    console.log("loading");
  } else {
  }

  const question = questions?.map((question) => {
    return <h2>{question.question}</h2>;
  });
  // console.log(question);

  // RETURN
  return (
    <section className="game-play">
      <div className="question-container">
        <h2>"Question"</h2>
        <form>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label htmlFor="one">answer</label>
          </div>
        </form>
      </div>

      <div className="question-container">
        <h2>"Question"</h2>
        <form>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label htmlFor="one">answer</label>
          </div>
        </form>
      </div>

      <button>Check answers</button>
    </section>
  );
};
