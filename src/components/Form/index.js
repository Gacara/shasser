import React from 'react';



const Form = ({ handleSubmit }) => (
  <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="filter"/>
      <input
        id="filter"
        type="text"
        name="filter"
      />
      <input type="submit" value="Filtrer" />

    </form>
  </>
);

export default Form;
