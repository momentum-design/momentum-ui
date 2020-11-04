import { array, boolean, button, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./MeetingAlert";

export default {
  title: "Meeting Alert",
  decorators: [withKnobs]
};

const onClick = () => {
  console.log("clicked");
};

const MEETING_ALERT_SRC = "https://api.adorable.io/avatars/285/abott@adorable.png";

export const Default = () => html`
  <md-meeting-alert
    show
    status="Queue_Demo7"
    title="Jane Doe"
    src=${MEETING_ALERT_SRC}
    onKeyPress="alert('meeting-alert keypress')"
  ></md-meeting-alert>
`;

export const Show = () => {
  const label = "show";
  const defaultValue = true;
  const show = boolean(label, defaultValue);

  return html`
    <md-meeting-alert
      .show=${show}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    ></md-meeting-alert>
  `;
};

export const CloseAriaLabel = () => {
  const closeAriaLabel = text("Close Aria Label", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      closeAriaLabel=${closeAriaLabel}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const Message = () => {
  const message = text("Message", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      message=${message}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const RemindAriaLabel = () => {
  const remindAriaLabel = text("Remind Aria Label", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      remindAriaLabel=${remindAriaLabel}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const Role = () => {
  const role = text("Role", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      role=${role}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const Src = () => {
  const src = text("Src", "https://api.adorable.io/avatars/285/abott@adorable.png");
  return html`
    <md-meeting-alert
      show
      src=${src}
      status="Queue_Demo7"
      title="Jane Doe"
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
    <h4>Copy/paste for a random avatar:</h4>
    <span>https://i.pravatar.cc/300</span>
  `;
};

export const Status = () => {
  const status = text("Status", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      status=${status}
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const Title = () => {
  const title = text("Title", "Webex Teams");
  return html`
    <md-meeting-alert
      show
      title=${title}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

export const UserStyles = () => {
  const userStyles = text("UserStyles", ":host .md-alert--meeting { background: green; color: white }");
  return html`
    <md-meeting-alert
      show
      userStyles=${userStyles}
      title="Webex Teams"
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
    <br />
    <h4>Style applied to "md-alert--meeting"</h4>
  `;
};

export const OnClick = () => {
  const onClick = button("OnClick", () => alert("click action"));
  return html`
    <md-meeting-alert
      show
      title="Webex Teams"
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      @click=${onClick}
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};

// Attendees story is limited, the array() only accepts and array of strings wheras the property expects and array of objects
export const Attendees = () => {
  const label = "Attendees";
  const defaultValue = [
    `{title: 'J $', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`,
    `{title: 'Jefe Guadelupe', src:${MEETING_ALERT_SRC}, alt:'Alt Text'}`
  ];

  const attendees = array(label, defaultValue);

  return html`
    <md-meeting-alert
      show
      .attendees=${attendees}
      status="Queue_Demo7"
      title="Jane Doe"
      src=${MEETING_ALERT_SRC}
      @click="${onClick}"
      onKeyPress="alert('meeting-alert keypress')"
    >
    </md-meeting-alert>
  `;
};
