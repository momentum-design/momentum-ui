/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "*.scss" {
  const css: CSSResult;
  export default css;
}

declare module "*.svg" {
  const svg: any;
  export default svg;
}

declare module "@momentum-ui/utils/lib/getColorValue";

declare module "query-selector-shadow-dom";

declare module "country-codes-list";
declare interface Attendee {
  title: string;
  src?: string;
  alt?: string;
}
