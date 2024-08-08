import "@/components/badge/Badge";
import "@/components/icon/Icon";
import "@/components/taskitem/TaskItem";
import "@/components/scrollbar/Scrollbar";
import { html } from "lit-element";

export const scrollbarTemplate = html`
  <div class="container">
    <h2>Scrollbar</h2>
    <md-scrollbar style="width:328px; height: 300px">
      <div>
        <md-task-item
          mediaType="telephony"
          status="conference"
          title="Mihael Varificantare for test text overflow"
          queue="IRV_quelle_1167676776767676asdadadas"
          lastmessage="I can ask one more question"
          quantity="0"
        >
          <div>01:08:00</div>
        </md-task-item>
        <md-task-item
          mediaType="outbound telephony"
          status="hold"
          title="Mihael Varificantare"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
          customAriaLabel="Custom outbound telephony hold Mihael Varificantare IRV_quelle_11"
        >
          <div>01:08:00</div>
        </md-task-item>
        <md-task-item
          mediaType="inbound telephony"
          status="transfered"
          title="Mihael Varificantare"
          queue="IRV_quelle_11"
          lastmessage=" "
          quantity="123"
        >
          <div>01:08:00</div>
        </md-task-item>
        <md-task-item mediaType="email" title="mlittlefoot@gmail.com" queue="IRV_quelle_12" selected>
          <div>00:08</div>
        </md-task-item>
        <md-task-item mediaType="telephony" title="Mihael Varificantare" queue="IRV_quelle_11">
          <div>Ringing</div>
        </md-task-item>
        <md-task-item mediaType="messenger" title="Mihael Varificantare" queue="IRV_quelle_11">
          <div>Ringing</div>
        </md-task-item>
        <md-task-item mediaType="whatsApp" title="Mihael Varificantare" queue="IRV_quelle_11">
          <div>01:10:25</div>
        </md-task-item>
        <md-task-item mediaType="chat" title="Mihael Varificantare" queue="IRV_quelle_11">
          <div>01:10:25</div>
        </md-task-item>
        <md-task-item
          mediaType="sms"
          title="Mihael Varificantare for test text overflow"
          queue="IRV_quelle_1167676776767676asdadadas"
        >
          <md-badge slot="task-type" color="darkmint" circle>
            <md-icon name="sms_16" color="white-100"></md-icon>
          </md-badge>
          <md-button variant="green" title="text title"><span slot="text">Ringing</span></md-button>
        </md-task-item>
      </div>
    </md-scrollbar>
  </div>
`;
