import React from 'react';

const NoResults = ({ recentStolen, serialNumber }) => (
  <div className="binx-stolen-widget-list">
    <h2 className='search-fail'>
    {recentStolen ? (
      <div>
        <span>
          We're sorry! Something went wrong and we couldn't retrieve recent results!
        </span>
        <span>
          We're probably working on fixing this right now, send us an email at 
          {" "}
          <a href="mailto:contact@bikeindex.org">contact@bikeindex.org</a> if the problem persists
        </span>
      </div>
    ) : (
      <span>
        No stolen bikes on the Bike Index with a serial of <span class="search-query">{serialNumber}</span>
      </span> 
    )}
    </h2>
  </div>
);

export default NoResults;