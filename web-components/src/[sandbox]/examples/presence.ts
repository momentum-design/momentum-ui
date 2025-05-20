import "@/components/presence/Presence";
import { TaskItemStatus } from "@/components/taskitem/TaskItem.constants";
import { css, customElement, html, LitElement } from "lit-element";
import { PresenceState, PresenceType } from "../../components/presence/Presence.utils";

@customElement("presence-template-sandbox")
export class PresenceTemplateSandbox extends LitElement {

  static styles = css`
    .presence-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 16px;
    }
    .presence-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
  `;

  render() {
    return html`
      <h3>Presence Types</h3>
      <div class="presence-grid">
        ${PresenceType.map(
          (value: string) => html`
          <div class="presence-item">
            <md-presence
              size="34"
              title=${value}
              presence-type=${value as PresenceState}
              .newMomentum=${true}>
            </md-presence>
            <h3>${value}</h3>
          </div>
        `)}
      </div>

      <h3>Task Item Status</h3>
      <div class="presence-grid">
        ${Object.values(TaskItemStatus).map(
          (value: string) => html`
          <div class="presence-item">
            <md-presence
              size="34"
              title=${value}
              presence-type=${value as PresenceState}
              .newMomentum=${true}>
            </md-presence>
            <h3>${value}</h3>
          </div>
        `)}
      </div>

      <h3>Failure Presence</h3>      
      <md-presence
          size="34"
          title=${"active"}
          presence-type=${"active" as PresenceState}
          .newMomentum=${true}
          .failurePresence=${true}>
      </md-presence>  
    `;
  }
}

export const presenceTemplate = html` <presence-template-sandbox></presence-template-sandbox> `;
