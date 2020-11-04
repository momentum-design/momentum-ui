import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { alertTypes } from "@/utils/enums";
import "./Alert";

export default {
  title: "Alert",
  decorators: [withKnobs]
};

export const Default = () => {
  const label = "Size";
  const defaultValue = "default";
  const title = text("Title", "Alert");
  const message = text("Message", "Who is awesome? You are!");
  const type = select(label, alertTypes, defaultValue);
  const closable = boolean("clossable", true);
  const show = boolean("Show", true);

  return html`
    <div>
      <md-alert title=${title} message=${message} type=${type} ?closable=${closable} ?show=${show}></md-alert>
    </div>
  `;
};
