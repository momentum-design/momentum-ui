import "@/components/card-alert/CardAlert";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("card-alert-template-sandbox")
export class CardAlertTemplateSandbox extends LitElement {
  @state() private lastEvent = "";

  static readonly styles = css`
    .card-alert-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 16px;
    }
    h3 {
      margin: 0 0 8px;
    }
    .event-log {
      font-size: 13px;
      color: #555;
      min-height: 20px;
    }
  `;

  private handlePrimaryAction() {
    this.lastEvent = "primary-action-clicked";
  }

  private handleDismiss() {
    this.lastEvent = "dismiss-clicked";
  }

  render() {
    return html`
      <div class="card-alert-container">
        <p class="event-log">Last event: ${this.lastEvent || "—"}</p>

        <md-card-alert
          severity="Critical"
          category="Deficit"
          timestamp=${new Date(Date.now() - 3 * 60000).toISOString()}
          title="Service level below target due to AHT increase"
          queueName="Sales (Calls)"
          detailsHeading="9-9:15 AM actual vs plan"
          .details=${[
            { label: "Service level:", value: " -12% vs target", highlighted: true },
            { label: "AHT", value: "+24% vs baseline", highlighted: true },
            { label: "Volume", value: "Normal" }
          ]}
          insight="Negative sentiment and repeat contacts increased, with impact concentrated in billing."
          primaryActionLabel="Take action"
          primaryActionDropdown
          .showDismiss=${true}
          @primary-action-clicked=${this.handlePrimaryAction}
          @dismiss-clicked=${this.handleDismiss}
        ></md-card-alert>

        <md-card-alert
          severity="Warning"
          category="Adherence"
          ?live=${true}
          title="Sarah exceeded break duration threshold"
          queueName="Sales (Calls)"
          .details=${[
            { label: "Agent", value: "Alice Chen" },
            { label: "Break time", value: "12:00 PM" },
            { label: "Missed by", value: "12 mins", highlighted: true }
          ]}
          insight=""
          primaryActionLabel="Take action"
          .showDismiss=${true}
          @primary-action-clicked=${this.handlePrimaryAction}
          @dismiss-clicked=${this.handleDismiss}
        ></md-card-alert>
      </div>
    `;
  }
}

export const cardAlertTemplate = html`
  <h3>Default Card Recommendation</h3>
  <card-alert-template-sandbox></card-alert-template-sandbox>
`;
