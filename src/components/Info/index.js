import React from 'react';

const Info = (props) => {
  const { num, name, img } = props;
  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <a href={`/pokemon/${name.toLowerCase().replace(/[. ]/g, '')}`} className="card">
        <div className="card-header">
          <p className="custom-name">
            {num}
  -
            {name}
          </p>
          <img className="pokemon" src={img} alt={name} />
        </div>
      </a>
    </div>
  );
};

export default Info;
