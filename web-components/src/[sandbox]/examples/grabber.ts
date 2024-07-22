import "@/components/grabber/Grabber";
import { Grabber } from "@/components/grabber/Grabber";
import { customElement, html, LitElement, PropertyValues, query } from "lit-element";

@customElement("grabber-template-sandbox")
export class GrabberTemplateSandbox extends LitElement {
  @query("#grabberLeading") grabberLeading!: Grabber.ELEMENT;
  @query("#grabberTrailing") grabberTrailing!: Grabber.ELEMENT;
  @query("#grabberTop") grabberTop!: Grabber.ELEMENT;
  @query("#grabberBottom") grabberBottom!: Grabber.ELEMENT;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("grabber-toggled", this.grabberToggled as EventListener);
    this.addEventListener("grabber-hover-changed", this.grabberToggled as EventListener);
  }

  disconnectedCallback(): void {
    this.removeEventListener("grabber-toggled", this.grabberToggled as EventListener);
    this.removeEventListener("grabber-hover-changed", this.grabberToggled as EventListener);

    super.disconnectedCallback();
  }

  grabberToggled(_e: CustomEvent) {
    this.requestUpdate();
  }

  grabberHovered(_e: CustomEvent) {
    this.requestUpdate();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    //After the first update the query properties will
    //no longer be null so request an other update
    this.requestUpdate();
  }

  grabberDetailTemplate(grabber: Grabber.ELEMENT | null | undefined) {
    if (grabber === null || grabber === undefined) {
      return html`
        <p>Loading...</p>
      `;
    }
    return html`
      <p>Label: ${grabber.checked ? grabber.checkedLabel : grabber.label}</p>
      <p>Checked: ${grabber.checked}</p>
      <p>Hovered: ${grabber.hovered}</p>
    `;
  }

  render() {
    return html`
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Leading</h3>
        <md-grabber id="grabberLeading" alignment="leading"></md-grabber>
        ${this.grabberDetailTemplate(this.grabberLeading)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Trailing</h3>
        <md-grabber id="grabberTrailing" alignment="trailing"></md-grabber>
        ${this.grabberDetailTemplate(this.grabberTrailing)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Top</h3>
        <md-grabber id="grabberTop" alignment="top"></md-grabber>
        ${this.grabberDetailTemplate(this.grabberTop)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Bottom</h3>
        <md-grabber id="grabberBottom" alignment="bottom"></md-grabber>
        ${this.grabberDetailTemplate(this.grabberBottom)}
      </div>
    `;
  }
}

export const grabberTemplate = html`
  <h3 class="sandbox-header">Default Grabber</h3>
  <grabber-template-sandbox></grabber-template-sandbox>
`;
