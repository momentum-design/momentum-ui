import "@/components/card-ai/CardAi";
import { customElement, html, LitElement, css, property } from "lit-element";

@customElement("card-ai-template-sandbox")
export class CardAiTemplateSandbox extends LitElement {
  @property({ type: String }) value = "";

  static readonly styles = css`
    .card-ai-container {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("summarise-more-toggled", this.handleSummariseMoreToggled as EventListener);
    this.addEventListener("thumbs-up-toggled", this.handleThumbsUpToggled as EventListener);
    this.addEventListener("thumbs-down-toggled", this.handleThumbsDownToggled as EventListener);
  }

  private handleThumbsDownToggled(e: MouseEvent) {
    const { id } = e.detail as any;

    this.value = "Thumbs down " + id + " actioned";
  }

  private handleThumbsUpToggled(e: MouseEvent) {
    const { id } = e.detail as any;

    this.value = "Thumbs up " + id + " actioned";
  }

  private handleSummariseMoreToggled(e: MouseEvent) {
    const { id } = e.detail as any;

    this.value = "Summarise more " + id + " actioned";
  }

  render() {
    return html`
      <div class="card-ai-container">
        <h2>${this.value}</h2>

        <h3>1. Title with multiple cards and feedback</h3>
        <md-card-ai
          id="1"
          title="%Lorem Ipsum is simply dummy text of the printing %Space link% and typesetting%"
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%  1 of 2"
          timestamp="14:35 PM"
        ></md-card-ai>
        <md-card-ai
          id="2"
          title=""
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%  2 of 2"
          timestamp="14:35 PM"
          .summariseMoreVisible=${true}
        ></md-card-ai>

        <h3>2. Title with single card and feedback</h3>
        <md-card-ai
          id="3"
          title="%Lorem Ipsum is simply dummy text of the printing %Space link% and typesetting%"
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%"
          timestamp="14:35 PM"
        /></md-card-ai>

        <h3>3. Title only</h3>
        <md-card-ai
          id="4"
          title="%Lorem Ipsum is simply dummy text of the printing %Space link% and typesetting%"
        /></md-card-ai>

        <h3>4. No title with single card and feedback</h3>
        <md-card-ai
          id="5"
          title=""
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%"
          timestamp="14:35 PM"
        /></md-card-ai>

        <h3>5. No title with single card without feedback</h3>
        <md-card-ai
          id="6"
          title=""
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%"
          timestamp=""
        /></md-card-ai>

        <h3>6. User query</h3>
        <md-card-ai
          id="7"
          cardText="%Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.%"
          variant="user_query"
        /></md-card-ai>
      </div>
    `;
  }
}

export const cardAiTemplate = html`
  <h3>Default Card</h3>
  <card-ai-template-sandbox></card-ai-template-sandbox>
`;
