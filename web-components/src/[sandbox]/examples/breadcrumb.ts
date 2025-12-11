import { breadCrumb } from "@/[sandbox]/sandbox.mock";
import "@/components/breadcrumb/Breadcrumb";
import { html } from "lit";

export const breadcrumbTemplate = html` <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb> `;
