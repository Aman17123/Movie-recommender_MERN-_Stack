import { useState } from "react";
import Recommendations from "./components/Recommendations";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const res = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input: input }),
    });

    const data = await res.json();
    setMovies(data.recommendations);
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">🎬 Movie Recommendation</h1>
        <p className="subtitle">
          Tell us what you feel like watching and we’ll suggest movies
        </p>

        <div className="input-group">
          <input
            placeholder="e.g. action movies with strong female lead"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={getRecommendations} disabled={loading}>
            {loading ? "Finding..." : "Recommend"}
          </button>
        </div>

        {loading && <div className="loader"></div>}

        <Recommendations movies={movies} />
      </div>
    </div>
  );
}

export default App;
