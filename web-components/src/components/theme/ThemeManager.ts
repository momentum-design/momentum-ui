import { action, computed, observable } from "mobx";
import { ThemeName } from "./Theme";

/**
 * ThemeManager is a singleton class that manages the global theme state.
 * It provides observable properties that can be observed by other classes
 * to set properties on their components, such as whether dark mode is enabled.
 */
export class ThemeManager {
  /**
   * Observable property to indicate if dark mode is enabled
   * Is needed by components styled outside of the web components
   */
  @observable isDarkMode = false;

  /**
   * Observable property to store the current theme name
   */
  @observable themeName: ThemeName = "lumos";

  /**
   * Observable property to indicate if visual rebrand is enabled
   * Will be used to allow users to toggle to updated visuals
   */
  @observable isVisualRebrandEnabled = false;

  /**
   * Observable property to indicate if Momentum Avatar is enabled
   * Should be used to set the new momentum style on avatars and sue
   * correct momentum presence states
   */
  @observable isMomentumAvatarEnabled = false;

  /**
   * Observable property to indicate if Momentum Components are enabled
   * Should be used set the newMomentum styles on components
   */
  @observable isMomentumComponentsEnabled = false;

  private static instance: ThemeManager;

  /**
   * Returns the singleton instance of ThemeManager.
   * If the instance does not exist, it creates a new one.
   * @returns {ThemeManager} The singleton instance of ThemeManager
   */
  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }

    return ThemeManager.instance;
  }

  @action setDarkMode(value: boolean) {
    this.isDarkMode = value;
  }

  @action setThemeName(value: ThemeName) {
    this.themeName = value;
  }

  @action setVisualRebrandEnabled(value: boolean) {
    this.isVisualRebrandEnabled = value;
  }

  @action setMomentumAvatar(value: boolean) {
    this.isMomentumAvatarEnabled = value;
  }

  @action setMomentumComponents(value: boolean) {
    this.isMomentumComponentsEnabled = value;
  }

  /**
   * Computed property to check if the current theme is Momentum V2.
   * @returns {boolean} True if the current theme is Momentum V2, otherwise false
   */
  @computed get isMomentumV2Enabled() {
    return this.themeName === "momentumV2";
  }
}

const themeManager = ThemeManager.getInstance();
export default themeManager;
