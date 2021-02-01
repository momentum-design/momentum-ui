import "@/components/form/Form";
import "@/components/button/Button";
import { html } from "lit-element";

export const formTemplate = html`
  <h3>Default</h3>
  <md-form is-valid>
    <md-input label="Name"></md-input>
    <md-input label="Email"></md-input>
    <md-input label="Count"></md-input>
    <md-button type="submit" label="Please Submit Form" size="52" color="blue">Submit</md-button>
  </md-form>
  <h3>Target</h3>
  <md-form target="_blank" is-valid>
    <md-input></md-input>
  </md-form>
  <h3>Not Valid</h3>
  <md-form>
    <md-input></md-input>
    <button type="submit">Submit</button>
  </md-form>
  <h3>No Validation</h3>
  <md-form no-validate>
    <md-input></md-input>
    <md-button type="submit" color="green">Submit</md-button>
  </md-form>
`;
