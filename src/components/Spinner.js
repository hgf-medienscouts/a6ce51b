import React from 'react';
import '../styles/style.css';

const Spinner = () => {
  return (
    <div className="atom-spinner atom-scale">
      <div className="spinner-inner">
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-circle">&#9679;</div>
      </div>
    </div>
  );
};

export default Spinner;