/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import { AvatarSize, AvatarType } from "@/components/avatar/Avatar.constants";
import "@/components/avatar/CompositeAvatar";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import mdx from "./Avatar.mdx";

export default {
  title: "Components/Avatar",
  component: "md-avatar",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-avatar"
    },
    docs: {
      page: mdx
    }
  }
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
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const type = select("Type", AvatarType, "");
  const title = text("Title", "Rachell Harris");
  const preDefinedColor = select("PreDefined Color", options, "mint");
  const size = select("Size", AvatarSize, 44);
  const customUrl = boolean("Custom Src", false);
  const customImage = boolean("Custom Image", false);
  const url = text(
    "src",
    "https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~b18d4572b17a4e98a16708797343ee7a~1600"
  );
  const hasNotification = boolean("Has Notification", false);
  const composite = boolean("Composite", false);
  const compositeAvatarSize = [0, 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84] as const;
  const sizeComos = select("Composite Size", compositeAvatarSize, 56);
  const iconName = text("Icon Name", "");
  const newMomentum = boolean("New Momentum", false);

  if (composite) {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${darkTheme} theme=${theme}>
        <md-composite-avatar .size=${sizeComos}>
          <md-avatar title="Anthony Russell" type="dnd" has-notification alt="Avatar"></md-avatar>
          <md-avatar type="typing" title="Alyson Hoagland Pace" alt="Avatar"></md-avatar>
        </md-composite-avatar>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="avatar" ?darkTheme=${darkTheme} theme=${theme}>
        <md-avatar
          .title=${title}
          alt="Avatar"
          icon-name=${iconName}
          label="Avatar"
          .type=${type}
          .src="${customUrl ? `${url}` : ""}"
          .color=${preDefinedColor}
          .size=${size}
          ?has-notification=${hasNotification}
          ?newMomentum=${newMomentum}
        >
          ${customImage
            ? html`
                <img width="100" height="100" src=${url} />
              `
            : ``}
        </md-avatar>
      </md-theme>
    `;
  }
};
