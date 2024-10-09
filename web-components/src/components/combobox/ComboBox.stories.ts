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
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Combobox",
  component: "md-combobox",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    comboboxClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    align: { table: { disable: true } },
    placeholder: { control: "text", defaultValue: "Add Country" },
    disabled: { control: "boolean" },
    trimSpace: { control: "boolean" },
    init: { control: "boolean" },
    customValue: { control: "boolean" },
    multi: { control: "boolean" },
    multiInit: { control: "boolean" },
    object: { control: "boolean" },
    objectInit: { control: "boolean" },
    customContent: { control: "boolean" },
    customContentInit: { control: "boolean" },
    ariaLabel: { control: "text", defaultValue: "Select the country" },
    searchSpecificAriaLabel: { control: "text", defaultValue: "Select the country, {{count}} results found" },
    newMomentum: { control: "boolean", defaultValue: true }
  },
  parameters: {
    a11y: {
      element: "md-combobox"
    }
  }
};

export const Combobox = (args: Args) => {
  if (args.init) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          placeholder=${args.placeholder}
          .options=${args.comboBoxOptions}
          ?disabled=${args.disabled}
          ?search-trim-space=${args.trimSpace}
          .value=${[comboBoxOptions[3]]}
          ariaLabel=${args.ariaLabel}
          search-result-aria-label=${args.searchSpecificAriaLabel}
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  } else if (args.multi) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox placeholder=${args.placeholder} .options=${comboBoxOptions} is-multi></md-combobox>
      </md-theme>
    `;
  } else if (args.customValue) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          placeholder=${args.placeholder}
          .options=${args.comboBoxOptions}
          ?is-multi=${args.multi}
          allow-custom-value
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  } else if (args.multiInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          placeholder=${args.placeholder}
          .options=${comboBoxOptions}
          is-multi
          .value=${[comboBoxOptions[3], comboBoxOptions[5]]}
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  } else if (args.object) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          placeholder=${args.placeholder}
          .options=${comboBoxObjectOptions}
          option-id="id"
          option-value="country"
          ?is-multi=${args.multi}
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  } else if (args.objectInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          placeholder=${args.placeholder}
          .options=${comboBoxObjectOptions}
          option-id="id"
          option-value="country"
          ?is-multi=${args.multi}
          .value=${[comboBoxObjectOptions[4]]}
          ?search-trim-space=${args.trimSpace}
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  } else if (args.customContent) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox with-custom-content ?is-multi=${args.multi} ?newMomentum="${args.newMomentum}">
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
  } else if (args.customContentInit) {
    return html`
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          with-custom-content
          is-multi
          .value=${[{ id: "Wikipedia", value: "Wikipedia" }]}
          ?newMomentum="${args.newMomentum}"
        >
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
      <md-theme class="theme-toggle" id="combobox" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-combobox
          .options=${comboBoxOptions}
          placeholder=${args.placeholder}
          ?disabled=${args.disabled}
          ?search-trim-space=${args.trimSpace}
          ?newMomentum="${args.newMomentum}"
        ></md-combobox>
      </md-theme>
    `;
  }
};
