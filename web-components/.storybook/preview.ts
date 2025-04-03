import { setCustomElements } from "@storybook/web-components";
import { ThemeNameValues } from "../src/components/theme/Theme";
import customElements from "./custom-elements.json";
import { withThemeDecorator } from "./themeDecorator";

/**
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
 */

setCustomElements(customElements);

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
      date: /Date$/
    }
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
  }
};
