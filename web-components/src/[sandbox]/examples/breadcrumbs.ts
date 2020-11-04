import "@/components/breadcrumbs/Breadcrumbs";
import { html } from "lit-element";
import { breadCrumbs } from "@/[sandbox]/sandbox.mock";

export const breadcrumbsTemplate = html`
  <md-breadcrumbs .navCrumbs="${breadCrumbs}"></md-breadcrumbs>
`;
