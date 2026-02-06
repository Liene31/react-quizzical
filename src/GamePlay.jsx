export const GamePlay = () => {
  return (
    <section className="game-play">
      <div className="question-container">
        <h2>How Many Hearts Does An Octopus Have?</h2>
        <form>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label for="one">One</label>
          </div>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label for="one">One</label>
          </div>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label for="one">One</label>
          </div>
          <div className="answers">
            <input type="radio" id="one" name="one" value="one" checked />
            <label for="one">One</label>
          </div>
        </form>
      </div>
      <button>Check answers</button>
    </section>
  );
};
