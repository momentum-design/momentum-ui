import { addons } from '@storybook/addons';
import { Theme } from "../src/components/theme/Theme";

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  themes: Theme,
  showPanel: true,
  panelPosition: 'bottom',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  showRoots: true,
});