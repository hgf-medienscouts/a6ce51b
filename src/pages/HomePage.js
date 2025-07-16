import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { makeid, cyb3r, generateQuizCode } from "../utils/quizUtils";
import "../styles/style.css";

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [seed, setSeed] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = "med";

    const url = window.location.href;
    if (url.includes("?ns=")) {
      const seedFromURL = url.slice(url.indexOf("?ns=") + 4).split("&")[0];
      if (seedFromURL) {
        setSeed(seedFromURL);
      }
    }

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    const quizSeed = seed || makeid(10);
    const quizCode = generateQuizCode(cyb3r(quizSeed));
    navigate(`/quiz?s=${quizCode}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {showContent ? (
        <div
          className="centered ms-font light-gray middle"
          style={{ position: "static", transform: "none", textAlign: "center" }}
        >
          <h1 className="three-em">
            Willkommen zum Medienscouts-Quiz
            <br />
            am Hardenbergtag!
          </h1>

          <form onSubmit={handleStartQuiz}>
            <input
              type="submit"
              className="button special middle submit"
              value="Starte das Quiz"
            />
          </form>
        </div>
      ) : (
        <div
          className="centered"
          style={{ position: "static", transform: "none" }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default HomePage;
