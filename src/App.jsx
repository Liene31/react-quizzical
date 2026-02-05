import { useState } from "react";

//If btn is clicked, the boolean switch to true,
//The start page closed and game page opens

function App() {
  return (
    <main>
      <section className="start-page">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button>Start quiz</button>
      </section>
      <section className="quiz-page">
        <h2>Question</h2>
        <p>Question description</p>
        <button>Check answers</button>
      </section>
    </main>
  );
}

export default App;
