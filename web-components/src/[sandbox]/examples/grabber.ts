import "@/components/grabber/Grabber";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("grabber-template-sandbox")
export class FavoriteTemplateSandbox extends LitElement {
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) value = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("favorite-toggle", this.countFavorite as EventListener);
    this.addEventListener("favorite-keydown", this.handleKeydownFavorite as EventListener);
  }

  private countFavorite(e: CustomEvent) {
    const { active, value } = e.detail;

    this.selected = active;
    if (active === true) {
      this.value = value;
    } else {
      this.value = "";
    }
  }

  private handleKeydownFavorite(e: KeyboardEvent) {
    const { active, value } = e.detail as any;

    this.selected = active;
    if (active === true) {
      this.value = "Keyboard event: " + value;
    } else {
      this.value = "";
    }
  }

  render() {
    return html`
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Leading</h3>
        <md-grabber alignment="leading"></md-grabber>
        <p>Select: ${this.selected}</p>
        <p>Value: ${this.value}</p>
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Trailing</h3>
        <md-grabber alignment="trailing"></md-grabber>
        <p>Select: ${this.selected}</p>
        <p>Value: ${this.value}</p>
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Top</h3>
        <md-grabber alignment="top"></md-grabber>
        <p>Select: ${this.selected}</p>
        <p>Value: ${this.value}</p>
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Bottom</h3>
        <md-grabber alignment="bottom"></md-grabber>
        <p>Select: ${this.selected}</p>
        <p>Value: ${this.value}</p>
      </div>
    `;
  }
}

export const grabberTemplate = html`
  <h3 class="sandbox-header">Default Grabber</h3>
  <grabber-template-sandbox></grabber-template-sandbox>
`;
