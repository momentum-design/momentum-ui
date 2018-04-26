import React from 'react';
import {ANG_URL, ANG2_URL, CORE_URL, SYM_URL} from '../../constants';
import Header from '../Header';
import angularJsImg from '@collab-ui/core/docs/assets/angularjs-inline.png';
import angularImg from '@collab-ui/core/docs/assets/angular-inline.png';

const Overview = () => {
  return (
    <div data-docs-overview="docs-overview">
        <Header
          title="Collab UI React"
          description="The official front-end framework for building rich enterprise experiences and custom applications with the patterns and established best practices that are native to Collaboration Design"
          hero
          color="#00B387"
          textColor="light"
        />
        <article className="row copy-spacing">
          <div className="docs-container">
            <section>
              <h2>Consistent</h2>
              <h5>Collab UI provides front-end developers & engineers a collection of reusable Angular components to build websites
                and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior in prototype
                and production work.</h5>
            </section>
            <section>
              <h2>Flexible</h2>
              <h5>You can use Collab UI with just about any technology stack. The <a href={CORE_URL}>core library</a> contains the CSS/Scss for styling the
                HTML components. There are additional libraries written in
                <a className="library-image" href={ANG2_URL}>
                  <img className="library-image" src={angularImg} alt="Collab UI Angular" title="Collab UI Angular" />
                </a>
                <a className="library-image" href={ANG_URL}>
                  <img className="library-image" src={angularJsImg} alt="Collab UI AngularJS" title="Collab UI AngularJS" />
                </a>
              </h5>
              </section>
              <section>
                <h2>Components</h2>
                <h5>Components are the building blocks of Collab UI applications, enabling designers and developers with ready-to-go interface
                  elements available in HTML and CSS code.</h5>
              </section>
              <section>
                <h2>Responsive</h2>
                <h5>Build responsive, mobile-first projects on the web</h5>
              </section>
              <section>
                <h2>Accessible</h2>
                <h5>The Collab UI components provide accessible markup which will serve as a foundation for your application development.</h5>
              </section>
              <section>
                <h2>Collaboration Design</h2>
                <h5>Components will be added to this site as they are updated to the new Collaboration Design. You can find legacy
                  components on the
                  <a href={SYM_URL}> Symphony documentation site</a>.</h5>
              </section>
          </div>
        </article>
    </div>
  );
};

export default Overview;
