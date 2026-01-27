import { action, observable } from "mobx";

class IconUrlManager {
  @observable
  svgIconUrl = "/assets/icons/svg";

  useFetchForMomentumDesign = false;

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
    if (other.useFetchForMomentumDesign !== undefined) {
      this.useFetchForMomentumDesign = other.useFetchForMomentumDesign;
    }
  }

  @action
  setSvgIconUrl(value: string) {
    this.svgIconUrl = value;
  }

  setUseFetchForMomentumDesign(value: boolean) {
    this.useFetchForMomentumDesign = value;
  }
}

const iconUrlManager = new IconUrlManager();
export { IconUrlManager, iconUrlManager };
