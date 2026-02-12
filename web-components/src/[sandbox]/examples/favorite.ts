import "@/components/favorite/Favorite";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("favorite-template-sandbox")
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

  private handleKeydownFavorite(e: CustomEvent) {
    const { active, value } = e.detail;

    this.selected = active;
    if (active === true) {
      this.value = "Keyboard event: " + value;
    } else {
      this.value = "";
    }
  }

  render() {
    return html`
      <md-favorite></md-favorite>
      <p>Select: ${this.selected}</p>
      <p>Value: ${this.value}</p>
    `;
  }
}

export const favoriteTemplate = html`
  <h3 class="sandbox-header">Default Favorite</h3>
  <favorite-template-sandbox></favorite-template-sandbox>
`;
