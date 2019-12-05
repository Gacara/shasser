import React from 'react';

const Button = (props) => {
  const { title, task } = props;
  return (
    <button className="round-button" onClick={task}>
      { title }
    </button>
  );
};

export default Button;
