import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";


@customElement("md-code-editor")
export class CodeEditor extends LitElement {
  @property({ type: String, attribute: "label" }) label = "Breadcrumb";


  static get styles() {
    return [reset, styles];
  }


};
