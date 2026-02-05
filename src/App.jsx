import { useState } from "react";
import { GamePlay } from "./GamePlay";

//If btn is clicked, the boolean switch to true,
//The start page closed and game page opens

function App() {
  // State variables
  const [switchPage, setSwitchPage] = useState(false);

  //Button - navigates to gamePlay and closes the start page
  function startGame() {
    setSwitchPage(true);
  }
  return (
    <main>
      {!switchPage && (
        <section className="start-page">
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button onClick={startGame}>Start quiz</button>
        </section>
      )}
      {switchPage && <GamePlay />}
    </main>
  );
}

export default App;
