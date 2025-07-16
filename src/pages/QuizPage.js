import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Spinner from "../components/Spinner";
import quizData from "../utils/quizData";
import { getQuizCode, generateQuestionOrder } from "../utils/quizUtils";
import "../styles/style.css";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(true);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [correctBanner, setCorrectBanner] = useState(false);
  const [wrongBanner, setWrongBanner] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [answerStatus, setAnswerStatus] = useState({
    a_correct: false,
    b_correct: false,
    c_correct: false,
    d_correct: false,
    a_wrong: false,
    b_wrong: false,
    c_wrong: false,
    d_wrong: false,
    a_cw: false,
    b_cw: false,
    c_cw: false,
    d_cw: false,
  });
  const [startTime, setStartTime] = useState(0);

  // Set up the quiz when the component mounts
  useEffect(() => {
    document.documentElement.className = "qpage";

    const code = getQuizCode(window.location.href);
    if (!code) {
      navigate("/");
      return;
    }

    const order = generateQuestionOrder(code);
    setQuestionOrder(order);
    setStartTime(Date.now());

    // Show content after a brief delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  // Handle answer selection
  const handleAnswerClick = (answer) => {
    if (showNextButton) return;

    const currentQuestion = questionOrder[currentQuestionIndex];
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    const isCorrect = answer === correctAnswer;
    const answerLetter = answer; // a, b, c, or d
    const answerIndex = "abcd".indexOf(answerLetter);
    const correctIndex = "abcd".indexOf(correctAnswer);

    const newAnswerStatus = {
      a_correct: false,
      b_correct: false,
      c_correct: false,
      d_correct: false,
      a_wrong: false,
      b_wrong: false,
      c_wrong: false,
      d_wrong: false,
      a_cw: false,
      b_cw: false,
      c_cw: false,
      d_cw: false,
    };

    // Mark the correct answer
    newAnswerStatus[`${"abcd"[correctIndex]}_correct`] = true;
    newAnswerStatus[`${"abcd"[correctIndex]}_cw`] = true;

    // If the user's answer is wrong, mark it as wrong
    if (!isCorrect) {
      newAnswerStatus[`${answerLetter}_wrong`] = true;
      newAnswerStatus[`${answerLetter}_cw`] = true;
    }

    setAnswerStatus(newAnswerStatus);
    setShowAnswers(false);

    // Store the user's answer
    const newGivenAnswers = [...givenAnswers, answer];
    setGivenAnswers(newGivenAnswers);

    // Show appropriate banner
    if (isCorrect) {
      setCorrectBanner(true);
    } else {
      setWrongBanner(true);
    }

    // Hide banner after 1.5 seconds
    setTimeout(() => {
      setCorrectBanner(false);
      setWrongBanner(false);
    }, 1500);

    // Show next button
    setShowNextButton(true);
  };

  // Handle next question button click
  const handleNextQuestion = () => {
    if (!showNextButton) return;

    // Reset states
    setAnswerStatus({
      a_correct: false,
      b_correct: false,
      c_correct: false,
      d_correct: false,
      a_wrong: false,
      b_wrong: false,
      c_wrong: false,
      d_wrong: false,
      a_cw: false,
      b_cw: false,
      c_cw: false,
      d_cw: false,
    });

    // If we're at the last question, navigate to results
    if (currentQuestionIndex >= questionOrder.length - 1) {
      // Construct the URL for the results page
      let resultsUrl = `/results?s=${getQuizCode(window.location.href)}`;

      // Add answers to URL
      for (let i = 0; i < givenAnswers.length; i++) {
        resultsUrl += `&${questionOrder[i]}=${givenAnswers[i]}`;
      }

      // Add time taken
      const timeElapsed = (Date.now() - startTime) / 1000;
      resultsUrl += `&time=${timeElapsed}`;

      // Navigate to results page
      navigate(resultsUrl);
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswers(true);
      setShowNextButton(false);
    }
  };

  // If we're still loading or have no question order, show loading spinner
  if (loading || questionOrder.length === 0) {
    return (
      <div className="centered">
        <Spinner />
      </div>
    );
  }

  const currentQuestion = questionOrder[currentQuestionIndex];
  const questionText = quizData[currentQuestion].question;
  const answers = quizData[currentQuestion].answers;

  return (
    <div>
      <Header
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questionOrder.length}
        showProgress={true}
      />

      <Banner showCorrect={correctBanner} showWrong={wrongBanner} />

      <div className="centered ms-font middle light-gray">
        <h1 className="red-color">
          Medienscouts-Quiz - Frage {currentQuestionIndex + 1}
        </h1>

        <h2
          className="red-color balsamiq-font two-em"
          dangerouslySetInnerHTML={{ __html: questionText }}
        />

        <table>
          <tbody>
            <tr>
              <td>
                <button
                  onClick={() => handleAnswerClick("a")}
                  className="button special ms-font middle"
                >
                  <span
                    className={`inlineblock ${answerStatus.a_correct ? "correct_answer" : ""} ${
                      answerStatus.a_wrong ? "wrong_answer" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[0] }}
                  />
                </button>
                <button
                  onClick={() => handleAnswerClick("b")}
                  className="button ms-font middle"
                >
                  <span
                    className={`inlineblock ${answerStatus.b_correct ? "correct_answer" : ""} ${
                      answerStatus.b_wrong ? "wrong_answer" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[1] }}
                  />
                </button>
                <br />
                <br />
                <button
                  onClick={() => handleAnswerClick("c")}
                  className="button ms-font middle"
                >
                  <span
                    className={`inlineblock ${answerStatus.c_correct ? "correct_answer" : ""} ${
                      answerStatus.c_wrong ? "wrong_answer" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[2] }}
                  />
                </button>
                <button
                  onClick={() => handleAnswerClick("d")}
                  className="button special ms-font middle"
                >
                  <span
                    className={`inlineblock ${answerStatus.d_correct ? "correct_answer" : ""} ${
                      answerStatus.d_wrong ? "wrong_answer" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[3] }}
                  />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={handleNextQuestion}
                  className="next_button material-symbols-outlined"
                >
                  navigate_next
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizPage;
