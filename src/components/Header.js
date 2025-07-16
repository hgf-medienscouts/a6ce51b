import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Header = ({ currentQuestionIndex, totalQuestions, showProgress = false }) => {
  // Calculate progress percentage for the progress bar
  const progressPercent = showProgress && totalQuestions > 0 
    ? `${(100 * currentQuestionIndex) / totalQuestions}%`
    : '0%';

  // Set the CSS variable for progress
  document.documentElement.style.setProperty('--percent', progressPercent);

  return (
    <div className="ms-font home">
      {showProgress && (
        <span className="centered-top">
          <span className="progress-container">
            <span className="progress-filler"></span>
          </span>
        </span>
      )}
      
      <Link to="/" className="nolink">
        <img src="/assets/img/ms_logo.png" alt="Medienscouts Logo" className="img" />
        <div className="noblock">Zum Start</div>
      </Link>
    </div>
  );
};

export default Header;