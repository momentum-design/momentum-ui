import "@/components/badge/Badge";
import "@/components/card-v2/CardV2";
import { css, customElement, html, LitElement, property } from "lit-element";

@customElement("card-v2-template-sandbox")
export class CardV2TemplateSandbox extends LitElement {
  @property({ type: String }) value = "";

  static readonly styles = css`
    .card-v2-container {
      display: flex;
      flex-direction: column;
      width: 240px;
    }

    .card-v2-wide-container {
      display: flex;
      flex-direction: column;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("expand-card-toggled", this.handleExpandCardToggled as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("expand-card-toggled", this.handleExpandCardToggled as EventListener);
  }

  private handleExpandCardToggled(e: CustomEvent) {
    const { identifier, active } = e.detail;

    this.value = "Card (" + identifier + ") active: " + active;
  }

  render() {
    return html`
      <div>
        <h3>${this.value}</h3>
        <div class="card-v2-container">
          <h3>Default</h3>
          <md-card-v2
            identifier="fac3aaf3-677c-4380-bbd5-c2e407514c43"
            state="default"
            header="Longest waiting in queue"
            data="00:12:11"
            info="Longest waiting in queue"
            .expandable=${true}
          >
          </md-card-v2>

          <h3>Inactive</h3>
          <md-card-v2
            identifier="aaa43a56-ec31-4d70-a77c-c797a1239777"
            state="inactive"
            header="Avg. handling time"
            data="00:19:20"
            info="Avg. handling time"
            .expandable=${false}
          >
          </md-card-v2>
        </div>

        <div class="card-v2-wide-container">
          <h3>Expanded View</h3>
          <md-card-v2
            identifier="7002dad2-ed43-4937-a790-48ab8e916d1a"
            state="inactive"
            header="Abandoned"
            data="80"
            info="Abandoned"
            .expandable=${false}
          >
          </md-card-v2>
        </div>
      </div>
    `;
  }
}

export const cardV2Template = html` <card-v2-template-sandbox></card-v2-template-sandbox> `;
