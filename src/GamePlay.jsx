import { da } from "@faker-js/faker";
import axios from "axios";
import { useEffect, useState } from "react";

export const GamePlay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (data) {
    console.log(data[0].incorrect_answers);
  }

  // RETURN
  return (
    <section className="game-play">
      {data?.map((item) => {
        return (
          <div className="question-container">
            <h2>{item?.question}</h2>
            <form>
              {/*  */}
              <div className="answers">
                <input type="radio" id="one" name="one" value="one" checked />
                <label htmlFor="one">{item?.incorrect_answers[0]}</label>
              </div>
              {/*  */}
            </form>
          </div>
        );
      })}

      <button>Check answers</button>
    </section>
  );
};
