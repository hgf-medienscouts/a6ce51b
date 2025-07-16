import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/style.css';

const Banner = ({ showCorrect, showWrong }) => {
  return (
    <span className="centered">
      <CSSTransition
        in={showCorrect}
        timeout={600}
        classNames="fade"
        unmountOnExit
      >
        <span className="material-symbols-outlined correct_answer banner">check</span>
      </CSSTransition>
      
      <CSSTransition
        in={showWrong}
        timeout={600}
        classNames="fade"
        unmountOnExit
      >
        <span className="material-symbols-outlined wrong_answer banner">dangerous</span>
      </CSSTransition>
    </span>
  );
};

export default Banner;