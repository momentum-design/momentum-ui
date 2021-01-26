import "@/components/form/Form";
import { html } from "lit-element";

export const formTemplate = html`
  <h3>Default</h3>
  <md-form is-valid>
    <md-input></md-input>
    <md-button type="submit">Submit</md-button>
  </md-form>
  <h3>Target</h3>
  <md-form target="_blank" is-valid>
    <md-input></md-input>
  </md-form>
  <h3>Not Valid</h3>
  <md-form>
    <md-input></md-input>
  </md-form>
`;
