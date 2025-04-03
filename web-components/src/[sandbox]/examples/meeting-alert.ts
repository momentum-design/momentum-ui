import "@/components//meeting-alert/MeetingAlert";
import "@/components/button/Button";
import "@/components/icon/Icon";
import svgWhatsapp from "@img/whatsapp.svg";
import { html } from "lit-element";
import { querySelectorDeep } from "query-selector-shadow-dom";

let isMeetingAlertOpenAttr = false;
let isMeetingAlertOpenProp = false;

function toggleMeetingAlertAttr() {
  const meetingAlert = querySelectorDeep("#triggered-meeting-alert");
  isMeetingAlertOpenAttr = !isMeetingAlertOpenAttr;
  if (isMeetingAlertOpenAttr) {
    meetingAlert?.setAttribute("show", "");
  } else {
    meetingAlert?.removeAttribute("show");
  }
}

function toggleMeetingAlertProp() {
  const meetingAlertProp = querySelectorDeep("#triggered-meeting-alert-prop");
  isMeetingAlertOpenProp = !isMeetingAlertOpenProp;
  meetingAlertProp.show = isMeetingAlertOpenProp;
}

export const meetingAlertTemplate = html`
  <h3>md-meeting-alert no image</h3>
  <div class="row">
    <md-button value="value" @click=${toggleMeetingAlertAttr}>toggle meeting alert using attribute</md-button>
    <md-meeting-alert
      id="triggered-meeting-alert"
      status="Queue_Demo7"
      title="Attribute Trigger"
      .onKeyDown=${() => console.log("passed onKeyDown Func")}
    >
    </md-meeting-alert>
  </div>
  <br />
  <div class="row">
    <md-button @click=${toggleMeetingAlertProp}>toggle meeting alert using property</md-button>
    <md-meeting-alert
      id="triggered-meeting-alert-prop"
      .show=${isMeetingAlertOpenProp}
      status="Queue_Demo7"
      title="Property Trigger"
      .onSnooze=${() => console.log("passed onSnooze Func")}
      .onKeyDown=${() => console.log("passed onKeyDown Func")}
    >
    </md-meeting-alert>
  </div>
  <h3>md-meeting-alert image through src</h3>
  <md-meeting-alert
    show
    status="Queue_Demo7"
    title="John Doe"
    .onKeyDown=${() => console.log("passed onKeyDown Func")}
    src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
  >
  </md-meeting-alert>
  <h3>md-meeting-alert image through slot</h3>
  <md-meeting-alert
    show
    status="Queue_Demo7"
    title="Jane Doe"
    userStyles=":host .md-alert { background: red; color: white }"
  >
    <span slot="custom-avatar">
      <img
        width="40"
        src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
      />
    </span>
  </md-meeting-alert>
  <h3>md-meeting-alert svg through slot</h3>
  <md-meeting-alert show status="Queue_Demo7" title="Jane Doe">
    <span slot="custom-avatar">
      <img width="40'" height="40'" src="${svgWhatsapp}" />
    </span>
  </md-meeting-alert>
  <h3>md-meeting-alert action through slot</h3>
  <md-meeting-alert show status="Queue_Demo7" title="Jane Doe">
    <md-button
      slot="custom-action"
      ariaLabel="Action"
      circle
      @click=${(e: Event) => {
        console.log("Custom action passed via slot");
        e.stopPropagation();
      }}
      size=${44}
      role="button"
    >
      <md-icon name="icon-alarm_16"></md-icon>
    </md-button>
  </md-meeting-alert>
  <h3>md-meeting-alert with attendees</h3>
  <md-meeting-alert
    .attendees=${[
      { title: "J $", src: null, alt: "J $" },
      { title: "Jefe Guadelupe", src: null, alt: "Jefe Guadelupe" }
    ]}
    show
    status="Queue_Demo7"
    title="Jane Doe"
  >
    <md-button ariaLabel="Action" circle size=${44} role="button">
      <md-icon name="icon-alarm_16"></md-icon>
    </md-button>
  </md-meeting-alert>
`;
