import "@/components/combobox/ComboBox";
import { comboBoxComplexObjectOption, comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import { html } from "lit-element";
import { repeat } from "lit-html/directives/repeat";

const dropdownValue: string[] = [];

export const comboBoxTemplate = html`
  <h3>Default</h3>
  <md-combobox .options=${comboBoxOptions} placeholder="Placeholder" .value=${[comboBoxOptions[5]]}></md-combobox>
  <h3>Default with Custom Values</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[5]]}
    allow-custom-value
  ></md-combobox>
  <h3>Multi Data with Custom Values</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[1]]}
    allow-custom-value
    is-multi
  ></md-combobox>
  <h3>Disabled State</h3>
  <md-combobox disabled .options=${comboBoxOptions} placeholder="Placeholder" searchable> </md-combobox>
  <h3>Object Data</h3>
  <md-combobox placeholder="Placeholder" .options=${comboBoxObjectOptions} option-id="id" option-value="country">
  </md-combobox>
  <h3>Object Data Predefined Value</h3>
  <md-combobox
    placeholder="Placeholder"
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    .value=${[comboBoxObjectOptions[5]]}
  >
  </md-combobox>
  <h3>Object Data Multi</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    is-multi
    placeholder="Placeholder"
  >
  </md-combobox>
  <h3>Object Data Multi Predefined</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    .value=${[comboBoxObjectOptions[7], comboBoxObjectOptions[8]]}
    option-id="id"
    option-value="country"
    is-multi
    placeholder="Placeholder"
  >
  </md-combobox>
  <h3>Slot Content</h3>
  <md-combobox with-custom-content>
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
  <h3>Slot Content Multi</h3>
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
  <h3>Slot Complex Object Content Multi</h3>
  <md-combobox with-custom-content is-multi>
    ${repeat(
      comboBoxComplexObjectOption,
      country => country.countryNameEn,
      (country: { countryNameEn: string; countryCallingCode: string }, index) => html`
        <div
          slot=${index}
          display-value=${country.countryNameEn}
          aria-label="+${country.countryCallingCode}${country.countryNameEn}"
        >
          <span>${country.countryNameEn}</span>
          <span>+${country.countryCallingCode}</span>
        </div>
      `
    )}
  </md-combobox>
  <h3>Slot Complex Custom Object Content</h3>
  <md-combobox .custom-options=${JSON.stringify(dropdownValue)} with-custom-content>
    {dropdownValue.map((item, index) => dropdownOptionTemplate(item, index))}
  </md-combobox>
`;
