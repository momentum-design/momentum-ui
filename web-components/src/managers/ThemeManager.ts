import { ThemeName } from "@/components/theme/Theme";
import { makeAutoObservable } from "mobx";

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

  constructor(other?: Partial<ThemeManager>) {
    makeAutoObservable(this);

    if (other) {
      this.update(other);
    }
  }

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

  setDarkMode(value: boolean) {
    this.isDarkMode = value;
  }

  setThemeName(value: ThemeName) {
    this.themeName = value;
  }

  setVisualRebrandEnabled(value: boolean) {
    this.isVisualRebrandEnabled = value;
  }

  setMomentumAvatar(value: boolean) {
    this.isMomentumAvatarEnabled = value;
  }

  /**
   * Computed property to check if the current theme is Momentum V2.
   * @returns {boolean} True if the current theme is Momentum V2, otherwise false
   */
  get isMomentumV2Enabled() {
    return this.themeName === "momentumV2";
  }
}

const themeManager = new ThemeManager();
export { themeManager, ThemeManager };
