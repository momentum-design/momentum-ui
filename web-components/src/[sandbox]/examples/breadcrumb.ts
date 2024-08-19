import "@/components/breadcrumb/Breadcrumb";
import { html } from "lit-element";
import { breadCrumb } from "@/[sandbox]/sandbox.mock";

export const breadcrumbTemplate = html` <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb> `;
