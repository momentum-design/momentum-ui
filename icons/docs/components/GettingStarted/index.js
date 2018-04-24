import React from 'react';
import Header from '../Header';

export default class GettingStarted extends React.Component {
  render() {
    return (
      <div>
        <Header
          title="Getting Started"
          description="Easy ways to get Collab UI Icons on your website or app."
          hero
        />
        <div className="docs-container copy-spacing">
          <h5>
            Collab UI Icons is a full suite of the pictographic icons for easy
            scalable vector graphics on websites and web applications, created
            and maintained by the Spark UI Design Language team. It contains the
            Scss, CSS, fonts and SVG files needed for implenting the icons
            indepented of any other framework. It is also consumed and published
            as part of the Collab UI Toolkit.
          </h5>
          <section>
            <h2>Installation</h2>
            <p>
              Install and manage the Spark UI Toolkit's icons using NPM. You may
              use <code>yarn</code> or <code>npm</code>. By default, yarn/npm installs packages to
              node_modules/.
            </p>
            <p>
              <code>yarn add @collab-ui/icons</code>
            </p>
            <p>or</p>
            <p>
              <code>npm install @collab-ui/icons --save</code>
            </p>
          </section>
          <section>
            <h2>Using CSS</h2>
            <ol>
              <li>Copy the "@collab-ui/icons/fonts" directory to the "fonts" directory for your site.</li>
              <li>Copy the "@collab-ui/icons/css/collab-ui-icons.min.css" to your styles/css directory.</li>
              <li>In the <code>&lt;head&gt;</code> of your HTML reference the location of your collab-ui-icons.min.css.</li>
            </ol>
            <p><code>&lt;link rel="stylesheet" href="path/to/collab-ui-icons/css/collab-ui-icons.min.css"&gt;</code></p>
          </section>
          <section>
            <h2>Using Scss</h2>
            <ol>
              <li>Copy the "@collab-ui/icons/fonts" directory to the "fonts" directory for your site.</li>
              <li>Add an "$icon-font-path" variable to your variables.scss file. <br/>
                <code>$icon-font-path: 'path/to/fonts/directory';</code>
                <br/>
                *The font path is relative to your compiled CSS directory.
              </li>
              <li>Import "@collab-ui/icons/scss/collab-ui-icons.scss" into your main entry Scss file AFTER the variables. <br/>
                <code>@import '@collab-ui/icons/scss/collab-ui-icons.scss';</code>
                <br/>
              </li>
              <li>Compile your Scss using your static compiler or bundler</li>
            </ol>
          </section>
        </div>
      </div>
    );
  }
}
