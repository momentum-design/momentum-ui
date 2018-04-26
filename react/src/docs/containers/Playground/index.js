import React from 'react';
import Header from '../Header';
import SampleComponent from './insertExampleHere';

const Playground = () => {
  return (
    <div data-docs-overview="docs-overview">
      <Header
        title="Playground"
        description="Use this page to develop and test components for the toolkit."
        hero
        color="#00B387"
        textColor="light"
      />
      <article className="row copy-spacing">
        <div className="docs-container">
          <SampleComponent />
        </div>
      </article>
    </div>
  );
};

export default Playground;
