/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import "@/components/avatar/Avatar";
import { AvatarType } from "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import "@/components/theme/Theme";
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

export const Avatar = () => {
  const darkTheme = boolean("darkMode", false);
  const type = select("Type", avatarType, "active");
  const title = text("Title", "Rachell Harris");
  const preDefinedColor = select("PreDefined Color", options, "mint");
  const avatarSize = [18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;
  const size = select("Size", avatarSize, 44);
  const customUrl = boolean("Custom Src", false);
  const customImage = boolean("Custom Image", false);
  const url = text("src", "https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600");
  const hasNotification = boolean("Has Notification", false);
  const composite = boolean("Composite", false);
  const compositeAvatarSize = [0, 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;
  const sizeComos = select("Composite Size", compositeAvatarSize, 56);

  if (composite) {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${darkTheme}>
        <md-composite-avatar .size=${sizeComos}>
          <md-avatar title="Anthony Russell" type="dnd" has-notification alt="Avatar"></md-avatar>
          <md-avatar type="typing" title="Alyson Hoagland Pace" alt="Avatar"></md-avatar>
        </md-composite-avatar>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${darkTheme}>
        <md-avatar .title=${title} alt="Avatar" .type=${type as AvatarType} .src="${customUrl ? `${url}` : ""}" .color=${preDefinedColor} .size=${size} ?has-notification=${hasNotification}>
          ${customImage ? html`<img
          width="100"
          height="100"
          src=${url}
        />` : ``}
        </md-avatar>
      </md-theme>
    `;
  }
};
