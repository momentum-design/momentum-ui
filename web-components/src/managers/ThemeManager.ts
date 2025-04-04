import { ThemeName } from "@/components/theme/Theme";
import { action, computed, makeObservable, observable } from "mobx";

/**
 * ThemeManager is a class that manages the global theme state.
 * It provides observable properties that can be observed by other classes
 * to set properties on their components, such as whether dark mode is enabled.
 */
class ThemeManager {
  /**
   * Observable property to indicate if dark mode is enabled
   * Is needed by components styled outside of the web components
   */
  isDarkMode = false;

  /**
   * Observable property to store the current theme name
   */
  themeName: ThemeName = "lumos";

  /**
   * Observable property to indicate if visual rebrand is enabled
   * Will be used to allow users to toggle to updated visuals
   */
  isVisualRebrandEnabled = false;

  /**
   * Observable property to indicate if Momentum Avatar is enabled
   * Should be used to set the new momentum style on avatars and sue
   * correct momentum presence states
   */
  isMomentumAvatarEnabled = false;

  /**
   * Computed property to check if the current theme is Momentum V2.
   * @returns {boolean} True if the current theme is Momentum V2, otherwise false
   */  
  get isMomentumV2Enabled() {
    return this.themeName === "momentumV2";
  }

  constructor(other?: Partial<ThemeManager>) {
    makeObservable(this, {
      isDarkMode: observable,
      themeName: observable,
      isVisualRebrandEnabled: observable,
      isMomentumAvatarEnabled: observable,
      isMomentumV2Enabled: computed,
      setDarkMode: action,
      setThemeName: action,
      setVisualRebrandEnabled: action,
      setMomentumAvatar: action,
      update: action
    });

    if (other) {
      this.update(other);
    }
  }

  /**
   * Action to update multiple properties of the ThemeManager.
   * This method allows batch updates to the observable properties.
   * @param {Partial<ThemeManager>} other - An object containing the properties to update.
   */
  update(other: Partial<ThemeManager>) {
    if (other.isDarkMode !== undefined) {
      this.isDarkMode = other.isDarkMode;
    }
    if (other.themeName !== undefined) {
      this.themeName = other.themeName;
    }
    if (other.isVisualRebrandEnabled !== undefined) {
      this.isVisualRebrandEnabled = other.isVisualRebrandEnabled;
    }
    if (other.isMomentumAvatarEnabled !== undefined) {
      this.isMomentumAvatarEnabled = other.isMomentumAvatarEnabled;
    }
  }

  /**
   * Action to set the dark mode state.
   * @param {boolean} value - The new value for dark mode.
   */
  setDarkMode(value: boolean) {
    this.isDarkMode = value;
  }

  /**
   * Action to set the theme name.
   * @param {ThemeName} value - The new theme name.
   */
  setThemeName(value: ThemeName) {
    this.themeName = value;
  }

  /**
   * Action to enable or disable the visual rebrand.
   * @param {boolean} value - The new value for visual rebrand.
   */
  setVisualRebrandEnabled(value: boolean) {
    this.isVisualRebrandEnabled = value;
  }

  /**
   * Action to enable or disable the Momentum Avatar feature.
   * @param {boolean} value - The new value for Momentum Avatar.
   */
  setMomentumAvatar(value: boolean) {
    this.isMomentumAvatarEnabled = value;
  }
  
}

const themeManager = new ThemeManager();
export { themeManager, ThemeManager };
