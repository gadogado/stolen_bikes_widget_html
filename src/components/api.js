const STOLEN_API = `https://bikeindex.org/api/v2/bikes_search/stolen?per_page=10&widget_from=${
  window.location.hostname
}`;

const request = async url => {
  const resp = await fetch(url);
  const json = await resp.json();
  return json;
};

/* 
  PUBLIC 
*/
const fetchStolenNearby = async location => {
  const url = `${STOLEN_API}&proximity=${location}&proximity_radius=100`;
  const results = await request(url);
  return results;
};

export { fetchStolenNearby };
