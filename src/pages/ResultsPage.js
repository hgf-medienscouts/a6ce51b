```javascript
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import quizData from "../utils/quizData";
import { parseURLParams, calculateResults, cyb3r } from "../utils/quizUtils";
import "../styles/style.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [quizResults, setQuizResults] = React.useState(null);
  const [quizCode, setQuizCode] = React.useState("");
  const [questionOrder, setQuestionOrder] = React.useState([]);
  const [givenAnswers, setGivenAnswers] = React.useState([]);
  const [timeTaken, setTimeTaken] = React.useState(0);

  const svgRef = React.useRef(null);

  React.useEffect(
    function () {
      document.documentElement.className = "med";

      // Parse URL parameters
      const params = parseURLParams(window.location.href);

      if (!params.s) {
        navigate("/");
        return;
      }

      setQuizCode(params.s);

      // Extract question order from quiz code
      var order = [];
      for (var i = 0; i < params.s.length; i++) {
        order.push(
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(
            params.s[i],
          ),
        );
      }
      setQuestionOrder(order);

      // Extract given answers
      var answers = [];
      for (var i = 0; i < order.length; i++) {
        var qIndex = order[i];
        var answer = params[qIndex];
        if (answer) {
          answers.push(answer);
        }
      }
      setGivenAnswers(answers);

      // Get time taken
      if (params.time) {
        setTimeTaken(parseFloat(params.time));
      }

      // Calculate results
      const correctAnswers = order.map(function (index) {
        return quizData[index].correctAnswer;
      });
      console.log("Correct Answers:", correctAnswers); // Log correct answers
      console.log("Question Order:", questionOrder); // Log question order
      var results = calculateResults(answers, correctAnswers, order);
      setQuizResults(results);

      // Show content after a brief delay
      var timer = setTimeout(function () {
        setLoading(false);
      }, 1000);

      return function () {
        clearTimeout(timer);
      };
    },
    [navigate],
  );

  React.useEffect(
    function () {
      if (!loading && svgRef.current && quizResults) {
        // Create the pie chart for correct/incorrect answers
        var svgEl = svgRef.current;
        // Clear any existing content
        while (svgEl.firstChild) {
          svgEl.removeChild(svgEl.firstChild);
        }

        // Create slices
        var slices = [
          {
            percent: quizResults.correct / quizResults.total,
            color: "#77dd77",
          },
          {
            percent: quizResults.incorrect / quizResults.total,
            color: "#ff6961",
          },
        ];

        var cumulativePercent = 0;

        slices.forEach(function (slice) {
          var startX = Math.cos(2 * Math.PI * cumulativePercent);
          var startY = Math.sin(2 * Math.PI * cumulativePercent);
          cumulativePercent += slice.percent;
          var endX = Math.cos(2 * Math.PI * cumulativePercent);
          var endY = Math.sin(2 * Math.PI * cumulativePercent);
          var largeArcFlag = slice.percent > 0.5 ? 1 : 0;
          var pathData = [
            "M " + startX + " " + startY,
            "A 1 1 0 " + largeArcFlag + " 1 " + endX + " " + endY,
            "L 0 0",
          ].join(" ");

          var pathEl = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          pathEl.setAttribute("d", pathData);
          pathEl.setAttribute("fill", slice.color);
          svgEl.appendChild(pathEl);
        });
      }
    },
    [loading, quizResults],
  );

  var getCoordinatesForPercent = function (percent) {
    var x = Math.cos(2 * Math.PI * percent);
    var y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  var handleBackToStart = function () {
    navigate("/?ns=" + (quizCode.cyb3r ? quizCode.cyb3r() : cyb3r(quizCode)));
  };

  if (loading || !quizResults) {
    return (
      <div className="centered">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className=\"centered middle light-gray\">
        <h1 className=\"ms-font light-gray four-em trans-back\">
          Medienscouts-Quiz - Ergebnisse
        </h1>

        <table>
          <tbody>
            <tr>
              <td rowSpan=\"3\">
                <div className=\"table-wrapper balsamiq-font\">
                  <table className=\"red-color-small\">
                    <thead>
                      <tr>
                        <th className=\"middle\">Frage</th>
                        <th className=\"middle\">Beschreibung</th>
                        <th className=\"middle\">Antwort</th>
                        <th className=\"middle\">Richtig</th>
                      </tr>
                    </thead>
                    <tbody>
                      {givenAnswers.map(function (answer, index) {\n                        var qIndex = questionOrder[index];\n                        var isCorrect =\n                          answer === quizData[qIndex].correctAnswer;\n\n                        return (\n                          <tr key={index}>\n                            <td>{index + 1}</td>\n                            <td>\n                              <div className=\"tooltip\">\n                                <span\n                                  dangerouslySetInnerHTML={{\n                                    __html: quizData[qIndex].question,\n                                  }}\n                                />\n                                <span className=\"tooltiptext tooltip-right\">\n                                  Gegebene Antwort:{\" \"}\n                                  <span\n                                    dangerouslySetInnerHTML={{\n                                      __html:\n                                        quizData[qIndex].answers[\n                                          \"abcd\".indexOf(answer)\n                                        ],\n                                    }}\n                                  />\n                                  <br />\n                                  Richtige Antwort:{\" \"}\n                                  <span\n                                    dangerouslySetInnerHTML={{\n                                      __html:\n                                        quizData[qIndex].answers[\n                                          \"abcd\".indexOf(\n                                            quizData[qIndex].correctAnswer,\n                                          )\n                                        ],\n                                    }}\n                                  />\n                                </span>\n                              </div>\n                            </td>\n                            <td>{answer}</td>\n                            <td>\n                              {isCorrect ? (\n                                <span className=\"material-symbols-outlined correct\">\n                                  check\n                                </span>\n                              ) : (\n                                <span className=\"material-symbols-outlined incorrect\">\n                                  dangerous\n                                </span>\n                              )}\n                            </td>\n                          </tr>\n                        );\n                      })}
                    </tbody>
                  </table>\n                </div>\n              </td>\n              <td colSpan=\"2\" className=\"timedisplay\">\n                Punktzahl: {quizResults.correct}\n                <br />\n                Zeit: {Math.round(timeTaken * 100) / 100} Sekunden\n              </td>\n            </tr>\n            <tr>\n              <td colSpan=\"2\">\n                <svg\n                  viewBox=\"-1 -1 2 2\"\n                  style={{ transform: \"rotate(-90deg)\", height: \"200px\" }}\n                  ref={svgRef}\n                />\n                <br />\n                <br />\n                <div className=\"balsamiq-font back-box\">\n                  <br />\n                  <div className=\"green-color-res\">\n                    Richtig: {quizResults.correct} (\n                    {Math.round(\n                      (quizResults.correct / quizResults.total) * 100,\n                    )}\n                    %)\n                  </div>\n                  <div className=\"red-color-res\">\n                    Falsch: {quizResults.incorrect} (\n                    {Math.round(\n                      (quizResults.incorrect / quizResults.total) * 100,\n                    )}\n                    %)\n                  </div>\n                  <br />\n                </div>\n              </td>\n            </tr>\n            <tr>\n              <td>\n                <button className=\"leave-button invisible\">\n                  <span className=\"material-symbols-outlined leave middle\">\n                    logout\n                  </span>\n                  <br />\n                  Zurück zum Anfang\n                </button>\n              </td>\n              <td>\n                <button className=\"leave-button\" onClick={handleBackToStart}>\n                  <span className=\"material-symbols-outlined leave middle\">\n                    logout\n                  </span>\n                  <br />\n                  Zurück zum Anfang\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  );\n};\n\nexport default ResultsPage;\n"
```