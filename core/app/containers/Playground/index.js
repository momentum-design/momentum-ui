import React from 'react';
import SampleComponent from './insertExampleHere.html';


const Playground = () => {
  return (
    <div data-docs-overview="docs-overview">
      <article className="row copy-spacing">
        <h1>Core Playground</h1>
        <div className="docs-container">
          <div dangerouslySetInnerHTML={{__html: SampleComponent}} />
        </div>
      </article>
    </div>
  );
};

export default Playground;
