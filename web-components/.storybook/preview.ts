import { BackgroundModeValues, ThemeNameValues } from "@/components/theme/Theme";
import { iconUrlManager } from "@/managers/IconUrlManager";
import { setCustomElements } from "@storybook/web-components";
import customElements from "./custom-elements.json";
import { withThemeDecorator } from "./themeDecorator";

/**
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
 */

setCustomElements(customElements);

// Use Vite's BASE_URL to handle different deploy paths
iconUrlManager.setSvgIconUrl(`${import.meta.env.BASE_URL}icons/svg`);

export const parameters = {
  docs: {
    inlineStories: false
  },
  ally: {
    config: {},
    element: "#storybook-panel-root",
    options: {
      checks: { "color-contrast": { options: { noScroll: true } } },
      restoreScroll: true
    }
  },
  controls: {
    disableSaveFromUI: true,
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  },
  backgrounds: {
    disable: true
  },
  options: {
    storySort: {
      order: ["Components", "Internal References"],
      method: "alphabetical"
    }
  }
};

export const decorators = [withThemeDecorator];

export const globalTypes = {
  theme: {
    description: "Global theme for components",
    defaultValue: "momentumV2",
    toolbar: {
      title: "Theme",
      icon: "globe",
      items: ThemeNameValues,
      dynamicTitle: true
    }
  },
  isDark: {
    description: "Global dark mode for components",
    defaultValue: false,
    toolbar: {
      title: "Dark",
      icon: "circlehollow",
      items: [
        { value: false, title: "Light", icon: "circlehollow" },
        { value: true, title: "Dark", icon: "circle" }
      ],
      dynamicTitle: true
    }
  },
  isVisualRebrand: {
    description: "Enable visual rebrand backgrounds",
    defaultValue: false,
    toolbar: {
      title: "Visual Rebrand",
      icon: "eye",
      items: [
        { value: false, title: "Off", icon: "eyeclose" },
        { value: true, title: "On", icon: "eye" }
      ],
      dynamicTitle: true
    }
  },
  backgroundMode: {
    description: "Visual rebrand background mode",
    defaultValue: "DEFAULT",
    toolbar: {
      title: "Background",
      icon: "photo",
      items: BackgroundModeValues,
      dynamicTitle: true
    }
  }
};
