import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';

export default class Usage extends React.Component {
  render() {
    const basicExample = `
    <i class="icon icon-camera_16"></i>
    `;
    const sizesExample = `
    <i class="icon icon-blocked_12"></i>
    <i class="icon icon-blocked_16"></i>
    <i class="icon icon-blocked_20"></i>
    <i class="icon icon-blocked_24"></i>
    <i class="icon icon-blocked_28"></i>
    <i class="icon icon-blocked_32"></i>
    <i class="icon icon-blocked_36"></i>
    <i class="icon icon-blocked_40"></i>
    <i class="icon icon-blocked_48"></i>
    <i class="icon icon-blocked_56"></i>
    `;
    const listExample = `
    <ul class="icon-ul">
      <li><i class="icon-li icon icon-email_16"></i>List icons</li>
      <li><i class="icon-li icon icon-calendar-month_16"></i>can be used</li>
      <li><i class="icon-li icon icon-alert_16"></i>as bullets</li>
      <li><i class="icon-li icon icon-settings_16"></i>in lists</li>
    </ul>
    `;
    return (
      <div>
        <Header
          title="Using Spark Icons"
          description="Easy ways to use Collab UI Icons on your website or app."
          hero
        />
        <div className="docs-container copy-spacing">
          <section>
            <h2>Basic Icons</h2>
            <p>
              You can place Collab UI Icons just about anywhere using the CSS
              Prefix <code>icon-</code> and the icon's name. Collab UI Icons is
              designed to be used with inline elements (we like the{' '}
              <code>&lt;i&gt;</code> tag for brevity, but using a{' '}
              <code>&lt;span&gt;</code> is more semantically correct).
            </p>
            <div className="row">
              <div className="medium-4 columns i-usage">
                <i className="icon icon-camera_16"><span>icon-camera_16</span></i>
              </div>
              <div className="medium-8 columns">
                <pre>
                  <code className="html">
                  {basicExample}
                </code>
                </pre>
              </div>
            </div>
          </section>
          <section>
            <h2>Icon Sizes</h2>
            <p>
              All of the Collab UI Icons are suffixed with their size. i.e.{' '}
              <code>icon-camera_16</code> The CSS will automatically size the
              icons according to this size. *Note: Not all icons are available in <em>every</em> size. See the <Link to="/">Icons Page</Link> for icons size availability or <a href="http://thedesigngroup.cisco.com/vd-icons/">request</a> the icon size if it is not available.
            </p>
            <div className="row">
              <div className="medium-4 columns i-usage">
                <i className="icon i-spacing icon-blocked_12"><span>icon-blocked_12</span></i>
                <i className="icon i-spacing icon-blocked_16"><span>icon-blocked_16</span></i>
                <i className="icon i-spacing icon-blocked_20"><span>icon-blocked_20</span></i>
                <i className="icon i-spacing icon-blocked_24"><span>icon-blocked_24</span></i>
                <i className="icon i-spacing icon-blocked_28"><span>icon-blocked_28</span></i>
                <i className="icon i-spacing icon-blocked_32"><span>icon-blocked_32</span></i>
                <i className="icon i-spacing icon-blocked_36"><span>icon-blocked_36</span></i>
                <i className="icon i-spacing icon-blocked_40"><span>icon-blocked_40</span></i>
                <i className="icon i-spacing icon-blocked_48"><span>icon-blocked_48</span></i>
                <i className="icon i-spacing icon-blocked_56"><span>icon-blocked_56</span></i>
              </div>
              <div className="medium-8 columns">
                <pre>
                  <code className="html">
                  {sizesExample}
                </code>
                </pre>
              </div>
            </div>
          </section>
          <section>
            <h2>List Icons</h2>
            <p>
              Use <code>icon-ul</code> and <code>icon-li</code> to easily replace default bullets in unordered lists.
            </p>
            <div className="row">
              <div className="medium-4 columns i-usage">
                <ul className="icon-ul">
                  <li><i className="icon-li icon icon-email_16" />List icons</li>
                  <li><i className="icon-li icon icon-calendar-month_16" />can be used</li>
                  <li><i className="icon-li icon icon-alert_16" />as bullets</li>
                  <li><i className="icon-li icon icon-settings_16" />in lists</li>
                </ul>
              </div>
              <div className="medium-8 columns">
                <pre>
                  <code className="html">
                    {listExample}
                  </code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
