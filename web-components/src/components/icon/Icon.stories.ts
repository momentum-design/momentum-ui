/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import momentumDesignManifest from "@momentum-design/icons/dist/manifest.json";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { iconSet, iconSize, iconType } from "./Icon";

const momentumDesignManifestArray = Object.keys(momentumDesignManifest).map((key) => ({
  name: key,
  value: (momentumDesignManifest as Record<string, string>)[key]
}));
const momentumDesignNames = momentumDesignManifestArray.map((item) => item.name);

export const Icon = (args: Args) => {
  function getIconSetIconName(args: Args) {
    if (args.theIconSet !== "momentumDesign") {
      return `icon-${args.momentumUIName}`;
    }

    return args.momentumDesignName;
  }

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-icon
        .name=${getIconSetIconName(args)}
        .title=${args.title}
        .color=${args.color}
        .type=${args.type}
        .size=${String(args.size)}
        .sizeOverrided=${args.sizeOverrided}
        .iconSet=${args.theIconSet}
        @icon-click=${action("dispatchEvent")}
      >
      </md-icon>
    </md-theme>
  `;
};

export default {
  title: "Components/Icon",
  component: "md-icon",
  argTypes: {
    iconClassMap: { table: { disable: true } },
    iconStyleMap: { table: { disable: true } },
    iconFontSize: { table: { disable: true } },
    iconColor: { table: { disable: true } },
    iconName: { table: { disable: true } },
    consoleHandler: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    isComboBoxIcon: { table: { disable: true } },
    isActive: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    color: { control: "color", defaultValue: "currentColor" },
    theIconSet: { control: { type: "select", options: iconSet }, defaultValue: "momentumDesign" },
    momentumUIName: { control: { type: "select", options: iconNames }, defaultValue: "arrow-up_16" },
    momentumDesignName: { control: { type: "select", options: momentumDesignNames }, defaultValue: "arrow-up-bold" },
    title: { control: "text", defaultValue: "" },
    type: { control: { type: "select", options: iconType }, defaultValue: "" },
    size: { control: { type: "select", options: iconSize }, defaultValue: "16" },
    sizeOverrided: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-icon"
    }
  }
};
