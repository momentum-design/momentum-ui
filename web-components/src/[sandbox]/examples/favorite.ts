import "@/components/favorite/Favorite";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("favorite-template-sandbox")
export class CoachTemplateSandbox extends LitElement {
  @property({ type: Number }) count = 0;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("favorite-elect", this.countFavorite as EventListener);
  }

  private countFavorite(e: CustomEvent) {
    const { id , active} = e.detail;

    if (id && active === true) {
      this.count +=1;
    }
  }

  render() {
    return html`
      <md-favorite active></md-favorite>
      <md-favorite ></md-favorite>
      <md-favorite ></md-favorite>
      <md-favorite ></md-favorite>
      <md-favorite ></md-favorite>
      <p>Select: ${this.count}</p>
    `;
  }

}

export const favoriteTemplate = html`
  <h3 class="sandbox-header">Default Favorite</h3>  
  <favorite-template-sandbox></favorite-template-sandbox>
`;