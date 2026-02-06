import axios from "axios";
import { useEffect, useState } from "react";

export const GamePlay = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="game-play">
      <div className="question-container">
        <h2>How Many Hearts Does An Octopus Have?</h2>
        <form>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label htmlFor="one">One</label>
          </div>
        </form>
      </div>
      <button>Check answers</button>
    </section>
  );
};
