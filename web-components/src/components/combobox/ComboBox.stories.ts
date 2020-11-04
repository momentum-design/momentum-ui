import "./ComboBox";
import "../icon/Icon";
import { comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "ComboBox",
  component: "md-combobox",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-combobox"
    }
  }
};

export const Placeholder = () => {
  const placeholder = text("placeholder", "Add Country");

  return html`
    <md-combobox .options=${comboBoxOptions} placeholder=${placeholder}></md-combobox>
  `;
};

export const Disabled = () => {
  const disabled = boolean("Disabled", true);

  return html`
    <md-combobox .options=${comboBoxOptions} ?disabled=${disabled}></md-combobox>
  `;
};

export const Default = () => {
  return html`
    <md-combobox .options=${comboBoxOptions}></md-combobox>
  `;
};

export const InitialValue = () => {
  return html`
    <md-combobox .options=${comboBoxOptions} .value=${[comboBoxOptions[3]]}></md-combobox>
  `;
};

export const CustomValue = () => {
  return html`
    <md-combobox .options=${comboBoxOptions} allow-custom-value></md-combobox>
  `;
};

export const Multi = () => {
  return html`
    <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
  `;
};

export const MultiInitialValue = () => {
  return html`
    <md-combobox .options=${comboBoxOptions} is-multi .value=${[comboBoxOptions[3], comboBoxOptions[5]]}></md-combobox>
  `;
};

export const MultiCustomValue = () => {
  return html`
    <md-combobox .options=${comboBoxOptions} is-multi allow-custom-value></md-combobox>
  `;
};

export const ObjectData = () => {
  return html`
    <md-combobox .options=${comboBoxObjectOptions} option-id="id" option-value="country"></md-combobox>
  `;
};

export const ObjectDataInitialValue = () => {
  return html`
    <md-combobox
      .options=${comboBoxObjectOptions}
      option-id="id"
      option-value="country"
      .value=${[comboBoxObjectOptions[4]]}
    ></md-combobox>
  `;
};

export const ObjectMulti = () => {
  return html`
    <md-combobox .options=${comboBoxObjectOptions} option-id="id" option-value="country" is-multi></md-combobox>
  `;
};

export const ObjectMultiInitialValue = () => {
  return html`
    <md-combobox
      .options=${comboBoxObjectOptions}
      option-id="id"
      option-value="country"
      is-multi
      .value=${[comboBoxObjectOptions[3], comboBoxObjectOptions[5]]}
    ></md-combobox>
  `;
};

export const CustomContent = () => {
  return html`
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
  `;
};

export const MultiCustomContent = () => {
  return html`
    <md-combobox with-custom-content is-multi>
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
  `;
};

export const MultiCustomContentInitialValue = () => {
  return html`
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
  `;
};
