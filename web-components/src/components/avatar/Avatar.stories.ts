import "@/components/avatar/Avatar";
import { AvatarType } from "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Avatar",
  component: "md-avatar",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-avatar"
    }
  }
};

export const Default = () => html`
  <md-avatar title="Anthony Russell" alt="Avatar"></md-avatar>
`;

export const Type = () => {
  const avatarType = {
    Active: "active",
    Bot: "bot",
    Call: "call",
    Dnd: "dnd",
    Group: "group",
    Inactive: "inactive",
    Meeting: "meeting",
    Ooo: "ooo",
    Presenting: "presenting",
    Self: "self",
    Typing: "typing",
    None: ""
  };
  const type = select("Type", avatarType, "active");
  return html`
    <md-avatar title="Anthony Russell" alt="Avatar" .type=${type as AvatarType}></md-avatar>
  `;
};

export const Title = () => {
  const title = text("Title", "Rachell Harris");
  return html`
    <md-avatar title="Anthony Russell" alt="Avatar" .title=${title}></md-avatar>
  `;
};

export const Source = () =>
  html`
    <md-avatar
      title="Anthony Russell"
      src=${"https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600"}
      alt="Avatar"
    ></md-avatar>
  `;

export const Color = () => {
  const options = {
    Purple: "purple",
    Mint: "mint",
    Slate: "slate",
    Gold: "gold",
    Lime: "lime",
    Darkmint: "darkmint",
    Green: "green",
    Yellow: "yellow",
    Red: "red",
    Orange: "orange",
    Violet: "violet",
    Cyan: "cyan",
    Cobalt: "cobalt",
    Pink: "pink"
  };

  const preDefinedColor = select("PreDefined Color", options, "mint");

  return html`
    <md-avatar alt="Avatar" title="Alyson Hoagland Pace" color=${preDefinedColor}></md-avatar>
  `;
};

export const Size = () => {
  const avatarSize = [18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;
  const size = select("Size", avatarSize, 44);
  return html`
    <md-avatar title="Anthony Russell" alt="Avatar" .size=${size}></md-avatar>
  `;
};

export const CustomImage = () => html`
  <md-avatar alt="Avatar" title="Kevin Russell" size="56">
    <img
      width="100"
      height="100"
      src=${"https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600"}
    />
  </md-avatar>
`;

export const HasNotification = () => {
  const hasNotification = boolean("Has Notification", true);

  return html`
    <md-avatar title="Anthony Russell" alt="Avatar" ?has-notification=${hasNotification}></md-avatar>
  `;
};

export const Composite = () => {
  const compositeAvatarSize = [0, 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;
  const size = select("Composite Size", compositeAvatarSize, 56);

  return html`
    <md-composite-avatar .size=${size}>
      <md-avatar title="Anthony Russell" type="dnd" has-notification alt="Avatar"></md-avatar>
      <md-avatar type="typing" title="Alyson Hoagland Pace" alt="Avatar"></md-avatar>
    </md-composite-avatar>
  `;
};
