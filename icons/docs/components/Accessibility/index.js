import React from 'react';
import Header from '../Header';

export default class Accessibility extends React.Component {
  render() {
    const example1 = `
    <!-- an icon being used as pure decoration -->
    <i class="icon icon-accessories_16" aria-hidden="true"></i>

    <!-- an icon being used as a logo -->
    <h1 class="logo">
      <i class="icon icon-cisco-logo" aria-hidden="true"></i>
      Cisco Systems Inc.
    </h1>

    <!-- an icon being used in front of link text -->
    <a href="https://web.ciscospark.com/downloads"><i class="icon icon-download_16" aria-hidden="true"></i> Download the Cisco Spark App</a>
    `;
    const example2 = `
    <!-- an icon being used to communicate travel methods -->
    <dl>
      <dt>
        <i class="icon icon-car" aria-hidden="true" title="Time to destination by car"></i>
        <span class="sr-only">Time to destination by car:</span>
      </dt>
      <dd>4 minutes</dd>

      <dt>
        <i class="icon icon-bicycle" aria-hidden="true" title="Time to destination by bike"></i>
        <span class="sr-only">Time to destination by bike:</span>
      </dt>
      <dd>12 minutes</dd>
    </dl>

    <!-- an icon being used to denote time remaining -->
    <i class="icon icon-hourglass" aria-hidden="true" title="60 minutes remain in your exam"></i>
    <span class="sr-only">60 minutes remain in your exam</span>

    <i class="icon icon-hourglass-half" aria-hidden="true" title="30 minutes remain in your exam"></i>
    <span class="sr-only">30 minutes remain in your exam</span>

    <i class="icon icon-hourglass-end" aria-hidden="true" title="0 minutes remain in your exam"></i>
    <span class="sr-only">0 minutes remain in your exam</span>
    `;
    const example3 = `
    <!-- an icon being used to communicate shopping cart state -->
    <a href="path/to/shopping/cart" aria-label="View 3 items in your shopping cart">
      <i class="icon icon-shopping-cart" aria-hidden="true"></i>
    </a>

    <!-- an icon being used as a link to a navigation menu -->
    <a href="#navigation-main" aria-label="Skip to main navigation">
      <i class="icon icon-list-menu_24" aria-hidden="true"></i>
    </a>

    <!-- an icon being used as a delete button's symbol with a title attribute to provide a native mouse tooltip -->
    <a class="btn btn-danger" href="path/to/settings" aria-label="Delete">
      <i class="icon icon-delete_24" aria-hidden="true" title="Delete this item?"></i>
    </a>
    `;
    return (
      <div>
        <Header
          title="Accessibility"
          description="Make your icons awesome for all of your users"
          hero
        />
        <div className="docs-container copy-spacing">
          <h3>
            Icons are symbols that can convey a ton of information and really
            help people comprehend directions, signs, and interfaces. It's
            important that we create and use them so that they can reach the
            largest amount of people possible.
          </h3>
          <section>
            <h2>Icons used for pure decoration or visual styling</h2>
            <p>If you're using an icon to add some extra decoration or branding, it does not need to be announced to users as they are navigating your site or app aurally. Additionally, if you're using an icon to visually re-emphasize or add styling to content already present in your HTML, it does not need to be repeated to an assistive technology-using user. You can make sure this is not read by adding the <code>aria-hidden="true"</code> to your Collab UI Icons markup.</p>
            <pre>
              <code>{example1}</code>
            </pre>
          </section>
          <section>
            <h2>Icons with semantic or interactive purpose</h2>
            <p>If you're using an icon to convey meaning (rather than only as a decorative element), ensure that this meaning is also conveyed to assistive technologies. This goes for content you're abbreviating via icons as well as interactive controls (buttons, form elements, toggles, etc.). There are a few techniques to accomplish this:</p>
            <h3>If an icon is not an interactive element</h3>
            <p>The simplest way to provide a text alternative is to use the <code>aria-hidden="true"</code> attribute on the icon and to include the text with an additional element, such as a <code>&lt;span&gt;</code>, with appropriate CSS to visually hide the element while keeping it accessible to assistive technologies. In addition, you can add a <code>title</code> attribute on the icon to provide a tooltip for sighted mouse users.</p>
            <pre>
              <code>{example2}</code>
            </pre>
            <h3>If an icon represents an interactive element</h3>
            <p>In the case of focusable interactive elements, there are various options to include an alternative text or label to the element, without the need for any visually hidden <code>&lt;span&gt;</code> or similar. For instance, simply adding the <code>aria-label</code> attribute with a text description to the interactive element itself will be sufficient to provide an accessible alternative name for the element. If you need to provide a visual tooltip on mouseover/focus, we recommend additionally using the <code>title</code> attribute or a custom tooltip solution.</p>
            <pre>
              <code>{example3}</code>
            </pre>
          </section>
          <section>
            <h2>Other cases and information</h2>
            <p>While the scenarios and techniques here help avoid some serious issues and confusion, they are not exhaustive. There are many complex contexts and use cases when it comes to accessibility, such as users with low vision who need a high color contrast ratio to see UI. There are some great tools and resources to learn from and work on these issues out there. Here are a few reads we recommend.</p>
            <ul>
              <li><a href="https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html" target="_blank">https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html</a></li>
              <li><a href="https://css-tricks.com/html-for-icon-font-usage/" target="_blank">https://css-tricks.com/html-for-icon-font-usage/</a></li>
              <li><a href="http://www.sitepoint.com/icon-fonts-vs-svg-debate/" target="_blank">http://www.sitepoint.com/icon-fonts-vs-svg-debate/</a></li>
              <li><a href="http://leaverou.github.io/contrast-ratio" target="_blank">http://leaverou.github.io/contrast-ratio/</a></li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}
