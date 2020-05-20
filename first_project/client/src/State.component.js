import React from "react";

const State = ({ state: { state, positive, death } }) => (
  <div>
    <h5>{state}</h5>
    <p>Positive cases: {positive}</p>
    <p>Deaths: {death}</p>
  </div>
);

export default State;
