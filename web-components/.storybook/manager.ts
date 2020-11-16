import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme: themes.light,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  showRoots: true,
});