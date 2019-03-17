import React from 'react';

const List = ({ results }) => (
  /* 
    TODO: setup maxHeight on <ul>
  */
  <div className="binxcontainer" id="binx_list_container">
    <ul>
      {results.map(result => {
        const link = `https://bikeindex.org/bikes/${result.id}`;
        return (
          <li className={result.stolen && "stolen"}>
            {result.thumb && 
              <a className="stolen-thumb" href={link} target="_blank">
                <img src={result.thumb} />
              </a>
            }
            <h4>
              <a href={link} target="_blank">{result.title}</a>
            </h4>
            <p>
              <span className='stolen-color'>Stolen</span> 
              {result.stolen_location && 
                <span> from {result.stolen_location} &mdash;</span> 
              }
              {result.date_stolen &&
                <span className='date-stolen'>{result.date_stolen}</span>
              }
            </p>
            <p>
              Serial: <span className='serial-text'>{result.serial}</span>
            </p>
            {!result.stolen &&
              <p class="not-stolen">Bike is not marked stolen</p>
            }
          </li>
        );
      })}
    </ul>
  </div>
);

export default List;
