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
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { iconSet, iconSize, iconType } from "./Icon";

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
    isActive: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-icon"
    }
  }
};

const momentumDesignManifestArray = Object.keys(momentumDesignManifest).map((key) => ({
  name: key,
  value: (momentumDesignManifest as Record<string, string>)[key]
}));
const momentumDesignNames = momentumDesignManifestArray.map((item) => item.name);

export const Icon = () => {
  const darkTheme = boolean("Dark Mode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const color = text("Color", "currentColor");
  const theIconSet = select("Icon set", iconSet, iconSet[0]);
  const momentumUIName = select("Momentum UI Name", iconNames, "arrow-up_16");
  const momentumDesignName = select("Moment Design Name", momentumDesignNames, "arrow-up-bold");
  const title = text("Title", "");
  const type = select("Type", iconType, "");
  const size = select("Size", iconSize, "16");
  const sizeOverrided = boolean("Size Override", false);

  function getIconSetIconName() {
    if (theIconSet !== "momentumDesign") {
      return `icon-${momentumUIName}`;
    }

    return momentumDesignName;
  }

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} theme=${theme}>
      <md-icon
        .name=${getIconSetIconName()}
        .title=${title}
        .color=${color}
        .type=${type}
        .size=${String(size)}
        .sizeOverrided=${sizeOverrided}
        .iconSet=${theIconSet}
        @icon-click=${action("dispatchEvent")}
      >
      </md-icon>
    </md-theme>
  `;
};
