import "@/components/activity-button/ActivityButton";
import { html } from "lit-element";

export const activityButtonTemplate = html`
  <md-activity-button .type=${"chat"} label="Chat"></md-activity-button>
  <md-activity-button .type=${"camera"} size="56" label="Chat"></md-activity-button>
  <md-activity-button .type=${"meetings"} size="84" label="Chat" disabled></md-activity-button>
`;
