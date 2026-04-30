import { CardAlertSeverity } from "@/components/card-alert/CardAlert";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("card-alert-template-sandbox")
export class CardAlertTemplateSandbox extends LitElement {
  @state() private lastEvent = "";

  static readonly styles = css`
    .card-alert-container {
      display: flex;
      flex-direction: row;
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
      <p class="event-log">Last event: ${this.lastEvent || "—"}</p>
      <div class="card-alert-container">
        <md-card-alert
          severity=${CardAlertSeverity.CRITICAL}
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
        ></md-card-alert>

        <md-card-alert
          severity=${CardAlertSeverity.MEDIUM}
          category="Surplus"
          timestamp=${new Date(Date.now() - 12 * 60000).toISOString()}
          title="Sarah exceeded break duration threshold"
          queueName="Sales (Calls)"
          detailsHeading="9-9:15 AM actual vs plan"
          .details=${[
            { label: "Agent", value: "Alice Chen" },
            { label: "Break time", value: "12:00 PM" },
            { label: "Missed by", value: "12 mins", highlighted: true }
          ]}
          insight=""
          primaryActionLabel="Take action"
          .showDismiss=${true}
          @primary-action-clicked=${this.handlePrimaryAction}
        ></md-card-alert>

        <md-card-alert
          category="Surplus"
          timestamp=${new Date(Date.now() - 12 * 60000).toISOString()}
          title="This is a card without a severity and an extremely long title to test that the truncation works correctly and doesn't break the layout of the card alert component"
          queueName="Sales (Calls)"
          detailsHeading="9-9:15 AM actual vs plan"
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
