import "@/components/badge/Badge";
import "@/components/checkbox/Checkbox";
import "@/components/icon/Icon";
import "@/components/taskitem/TaskItem";
import svgWxm from "@img/wxm.svg";
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("task-item-sandbox")
export class TaskItemSandbox extends LitElement {
  @state()
  private isRestyled = false;

  render() {
    return html`
      <md-checkbox
        style="margin-bottom: 8px;"
        ?checked=${this.isRestyled}
        @checkbox-change=${() => (this.isRestyled = !this.isRestyled)}
      >
        isRestyled
      </md-checkbox>

      <div style="width:328px">
        <md-task-item
          mediaType="telephony"
          status="conference"
          item-title="Mihael Varificantare for test text overflow"
          queue="IRV_quelle_1167676776767676asdadadas"
          lastmessage="I can ask one more question"
          quantity="0"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="outbound telephony"
          status="hold"
          item-title="No title tooltip test"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          customAriaLabel="Custom outbound telephony hold Mihael Varificantare IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="inbound telephony"
          status="transfered"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="midcall telephony"
          item-title="MediaType: midcall telephony"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          iconSrc=${svgWxm}
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="callback"
          status="campaign"
          item-title="Media Type callback"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="progressive_campaign"
          item-title="Media Type progressive_campaign"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:08:00</div>
        </md-task-item>

        <md-task-item
          mediaType="email"
          status="play"
          item-title="mlittlefoot@gmail.com"
          queue="IRV_quelle_12"
          selected
          ?is-restyle=${this.isRestyled}
        >
          <div>00:08</div>
        </md-task-item>

        <md-task-item
          mediaType="telephony"
          status="consulting"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>Ringing</div>
        </md-task-item>

        <md-task-item
          mediaType="messenger"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>Ringing</div>
        </md-task-item>

        <md-task-item
          mediaType="whatsApp"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:10:25</div>
        </md-task-item>

        <md-task-item
          mediaType="facebook"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:10:25</div>
        </md-task-item>

        <md-task-item
          mediaType="chat"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:10:25</div>
        </md-task-item>
        <md-task-item
          mediaType="outbound_chat"
          item-title="Mihael Varificantare"
          queue="IRV_quelle_11"
          ?is-restyle=${this.isRestyled}
        >
          <div>01:10:25</div>
        </md-task-item>

        <md-task-item
          mediaType="sms"
          status="courtesy_callback"
          item-title="Mihael Varificantare for test text overflow"
          queue="IRV_quelle_1167676776767676asdadadas"
          ?is-restyle=${this.isRestyled}
        >
          <md-badge slot="task-type" color="darkmint" circle>
            <md-icon name="sms_16" color="white-100"></md-icon>
          </md-badge>
          <md-button variant="green" title="text title"><span slot="text">Ringing</span></md-button>
        </md-task-item>

        <md-task-item
          mediaType="outbound-campaign"
          item-title="Campaign call"
          display-only-title
          ?is-restyle=${this.isRestyled}
        >
          <md-button variant="secondary" loading maxWidth="150px" disabled size="28">
            <span slot="text">Connecting...</span>
          </md-button>
        </md-task-item>

        <md-task-item
          mediaType="outbound-campaign"
          popovertitle="Campaign call"
          queue="A Queue"
          lastmessage="Time Left 00:29"
          ?is-restyle=${this.isRestyled}
        >
          <div style="display: flex; flex-direction: column ;justify-content: space-evenly; height: 100%;gap:4px;">
            <md-button variant="green" size="28"> Answer </md-button>
            <md-button variant="red" size="28"> Decline </md-button>
          </div>
        </md-task-item>
        <md-task-item
          mediaType="outbound-campaign"
          popovertitle="Campaign call"
          queue="A Queue"
          lastmessage="Time Left 00:29"
          ?is-restyle=${this.isRestyled}
        >
          <div style="display: flex; flex-direction: column ;justify-content: space-evenly; height: 100%;gap:4px;">
            <md-button variant="green" size="28"> Accept </md-button>
            <div style="display:flex; gap:4px; margin-left:auto;">
              <md-button variant="secondary" circle size="28"
                ><md-icon slot="icon" name="skip-bold" iconSet="preferMomentumDesign"></md-icon
              ></md-button>
              <md-button variant="secondary" circle size="28"
                ><md-icon slot="icon" name="remove-bold" iconSet="preferMomentumDesign"></md-icon
              ></md-button>
            </div>
          </div>
        </md-task-item>
      </div>
    `;
  }
}

export const taskItemTemplate = html`<task-item-sandbox></task-item-sandbox>`;
