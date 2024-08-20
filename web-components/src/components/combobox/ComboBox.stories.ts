/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Combobox",
  component: "md-combobox",
  parameters: {
    a11y: {
      element: "md-combobox"
    }
  }
};

export const Combobox = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const placeholder = text("placeholder", "Add Country");
  const disabled = boolean("Disabled", false);
  const trimSpace = boolean("Trim white space", false);
  const init = boolean("InitialValue", false);
  const customValue = boolean("Custom Value", false);
  const multi = boolean("Multi", false);
  const multiInit = boolean("Multi InitialValue", false);
  const object = boolean("Object Data", false);
  const objectInit = boolean("Object Data InitialValue", false);
  const customContent = boolean("Custom Content", false);
  const customContentInit = boolean("Multi Custom Content InitialValue", false);
  const ariaLabel = text("aria-label", "Select the country");
  const searchSpecificAriaLabel = text("aria-label", "Select the country, {{count}} results found");

  if (init) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          placeholder=${placeholder}
          .options=${comboBoxOptions}
          ?disabled=${disabled}
          ?search-trim-space=${trimSpace}
          .value=${[comboBoxOptions[3]]}
          ariaLabel=${ariaLabel}
          search-result-aria-label=${searchSpecificAriaLabel}
        ></md-combobox>
      </md-theme>
    `;
  } else if (multi) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox placeholder=${placeholder} .options=${comboBoxOptions} is-multi></md-combobox>
      </md-theme>
    `;
  } else if (customValue) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          placeholder=${placeholder}
          .options=${comboBoxOptions}
          .is-multi=${multi}
          allow-custom-value
        ></md-combobox>
      </md-theme>
    `;
  } else if (multiInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          placeholder=${placeholder}
          .options=${comboBoxOptions}
          is-multi
          .value=${[comboBoxOptions[3], comboBoxOptions[5]]}
        ></md-combobox>
      </md-theme>
    `;
  } else if (object) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          placeholder=${placeholder}
          .options=${comboBoxObjectOptions}
          option-id="id"
          option-value="country"
          .is-multi=${multi}
        ></md-combobox>
      </md-theme>
    `;
  } else if (objectInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          placeholder=${placeholder}
          .options=${comboBoxObjectOptions}
          option-id="id"
          option-value="country"
          .is-multi=${multi}
          .value=${[comboBoxObjectOptions[4]]}
          ?search-trim-space=${trimSpace}
        ></md-combobox>
      </md-theme>
    `;
  } else if (customContent) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox with-custom-content .is-multi=${multi}>
          <div slot="one" aria-label="Facebook" display-value="Facebook">
            <span>Facebook</span>
            <md-icon name="icon-facebook_16"></md-icon>
          </div>
          <div slot="two" aria-label="Twitter" display-value="Twitter">
            <span class="company-value">Twitter</span>
            <md-icon name="icon-twitter_16"></md-icon>
          </div>
          <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
            <span class="company-value">Wikipedia</span>
            <md-icon name="icon-wikipedia_16"></md-icon>
          </div>
          <div slot="four" aria-label="Google" display-value="Google">
            <span class="company-value">Google</span>
            <md-icon name="icon-google_16"></md-icon>
          </div>
        </md-combobox>
      </md-theme>
    `;
  } else if (customContentInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox with-custom-content is-multi .value=${[{ id: "Wikipedia", value: "Wikipedia" }]}>
          <div slot="one" aria-label="Facebook" display-value="Facebook">
            <span>Facebook</span>
            <md-icon name="icon-facebook_16"></md-icon>
          </div>
          <div slot="two" aria-label="Twitter" display-value="Twitter">
            <span class="company-value">Twitter</span>
            <md-icon name="icon-twitter_16"></md-icon>
          </div>
          <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
            <span class="company-value">Wikipedia</span>
            <md-icon name="icon-wikipedia_16"></md-icon>
          </div>
          <div slot="four" aria-label="Google" display-value="Google">
            <span class="company-value">Google</span>
            <md-icon name="icon-google_16"></md-icon>
          </div>
        </md-combobox>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme} theme=${theme}>
        <md-combobox
          .options=${comboBoxOptions}
          placeholder=${placeholder}
          ?disabled=${disabled}
          ?search-trim-space=${trimSpace}
        ></md-combobox>
      </md-theme>
    `;
  }
};
