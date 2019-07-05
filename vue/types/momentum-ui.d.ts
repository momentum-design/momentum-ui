import Vue, { PluginObject } from 'vue'

import { Badge } from './badge'

export interface InstallationOptions {
  size: string
}

/**
 * Install all components into Vue.
 * Call `Vue.use(MomentumUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** Bagde Component */
export class Badge extends Badge {}
