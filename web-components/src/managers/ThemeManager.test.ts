import { ThemeManager } from "./ThemeManager";

describe("ThemeManager", () => {
  let themeManager: ThemeManager;

  beforeEach(() => {
    themeManager = new ThemeManager();
  });

  test("should initialize with default values", () => {
    expect(themeManager.isDarkMode).toBe(false);
    expect(themeManager.themeName).toBe("lumos");
    expect(themeManager.isVisualRebrandEnabled).toBe(false);
    expect(themeManager.isMomentumAvatarEnabled).toBe(false);
  });

  test("should update properties correctly", () => {
    const newValues: Partial<ThemeManager> = {
      isDarkMode: true,
      themeName: "momentumV2",
      isVisualRebrandEnabled: true,
      isMomentumAvatarEnabled: true
    };

    themeManager.update(newValues);

    expect(themeManager.isDarkMode).toBe(true);
    expect(themeManager.themeName).toBe("momentumV2");
    expect(themeManager.isVisualRebrandEnabled).toBe(true);
    expect(themeManager.isMomentumAvatarEnabled).toBe(true);
  });

  test("should set dark mode correctly", () => {
    themeManager.setDarkMode(true);
    expect(themeManager.isDarkMode).toBe(true);

    themeManager.setDarkMode(false);
    expect(themeManager.isDarkMode).toBe(false);
  });

  test("should set theme name correctly", () => {
    themeManager.setThemeName("momentumV2");
    expect(themeManager.themeName).toBe("momentumV2");

    themeManager.setThemeName("lumos");
    expect(themeManager.themeName).toBe("lumos");
  });

  test("should set visual rebrand enabled correctly", () => {
    themeManager.setVisualRebrandEnabled(true);
    expect(themeManager.isVisualRebrandEnabled).toBe(true);

    themeManager.setVisualRebrandEnabled(false);
    expect(themeManager.isVisualRebrandEnabled).toBe(false);
  });

  test("should set momentum avatar enabled correctly", () => {
    themeManager.setMomentumAvatar(true);
    expect(themeManager.isMomentumAvatarEnabled).toBe(true);

    themeManager.setMomentumAvatar(false);
    expect(themeManager.isMomentumAvatarEnabled).toBe(false);
  });

  test("should compute isMomentumV2Enabled correctly", () => {
    themeManager.setThemeName("momentumV2");
    expect(themeManager.isMomentumV2Enabled).toBe(true);

    themeManager.setThemeName("lumos");
    expect(themeManager.isMomentumV2Enabled).toBe(false);
  });
});
