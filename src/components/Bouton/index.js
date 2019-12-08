import React from 'react';

const Button = (props) => {
  const { title, task, className} = props;
  return (
    <button type="button" className={className} onClick={task}>
      { title }
    </button>
  );
};

export default Button;
