import "@/components/favorite/Favorite";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("favorite-template-sandbox")
export class CoachTemplateSandbox extends LitElement {
  @property({ type: Boolean }) selected = true;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("favorite-elect", this.countFavorite as EventListener);
  }

  private countFavorite(e: CustomEvent) {
    const { active} = e.detail;

    this.selected = active;
  }

  render() {
    return html`
      <md-favorite></md-favorite>
      <p>Select: ${this.selected}</p>
    `;
  }

}

export const favoriteTemplate = html`
  <h3 class="sandbox-header">Default Favorite</h3>  
  <favorite-template-sandbox></favorite-template-sandbox>
`;