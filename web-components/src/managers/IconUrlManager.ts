import { action, observable } from "mobx";

class IconUrlManager {
  @observable
  svgIconUrl = "/assets/icons/svg";

  constructor(other?: Partial<IconUrlManager>) {
    if (other) {
      this.update(other);
    }
  }

  @action
  update(other: Partial<IconUrlManager>) {
    if (other.svgIconUrl !== undefined) {
      this.svgIconUrl = other.svgIconUrl;
    }
  }

  @action
  setSvgIconUrl(value: string) {
    this.svgIconUrl = value;
  }
}

const iconUrlManager = new IconUrlManager();
export { IconUrlManager, iconUrlManager };
