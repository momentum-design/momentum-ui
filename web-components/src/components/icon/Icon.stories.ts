/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import momentumDesignManifest from "@/../node_modules/@momentum-design/icons/dist/manifest.json";
import "@/components/icon/Icon";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import { action } from "storybook/actions";
import { Args } from "@storybook/web-components";
import { html } from "lit";
import { iconSet, iconSize, iconType } from "./Icon";

const momentumDesignManifestArray = Object.keys(momentumDesignManifest).map((key) => ({
  name: key,
  value: (momentumDesignManifest as Record<string, string>)[key]
}));
const momentumDesignNames = momentumDesignManifestArray.map((item) => item.name);

const render = (args: Args) => {
  function getIconSetIconName(args: Args) {
    if (args.theIconSet !== "momentumDesign") {
      return `icon-${args.momentumUIName}`;
    }

    return args.momentumDesignName;
  }

  return html`
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
  `;
};

export const Icon: Args = {
  args: {
    theIconSet: "momentumDesign",
    momentumUIName: "arrow-up_16",
    momentumDesignName: "arrow-up-bold",
    title: "",
    type: "",
    size: "16",
    sizeOverrided: false
  },
  render: render
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
    color: { control: { type: "color" } },
    theIconSet: { control: { type: "select" }, options: iconSet },
    momentumUIName: { control: { type: "select" }, options: iconNames },
    momentumDesignName: { control: { type: "select" }, options: momentumDesignNames },
    title: { control: "text", defaultValue: "" },
    type: { control: { type: "select" }, options: iconType, defaultValue: "" },
    size: { control: { type: "select" }, options: iconSize, defaultValue: "16" },
    sizeOverrided: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      context: "md-icon"
    }
  }
};
