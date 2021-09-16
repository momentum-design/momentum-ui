import "@/components/chip/Chip";
import "@/components/list/List";
import { html } from "lit";

export const chipTemplate = html`
  <h3 class="sandbox-header">Default Chip</h3>
  <md-chip value="developer@cisco.ninja"> </md-chip>
  <h3 class="sandbox-header">Additional Color Chip</h3>
  <md-chip value="Gray" color="gray"> </md-chip>
  <md-chip value="Violet" color="violet"> </md-chip>
  <md-chip value="Mint" color="mint"> </md-chip>
  <md-chip value="Gold" color="gold"> </md-chip>
  <md-chip value="Lime" color="lime"> </md-chip>
  <md-chip value="Pink" color="pink"> </md-chip>
  <md-chip value="Orange" color="orange"> </md-chip>
  <md-chip value="Cobalt" color="cobalt"> </md-chip>
  <h3 class="sandbox-header">Read Only Default Chip</h3>
  <md-chip value="developer@cisco.ninja" readonly> </md-chip>
  <h3 class="sandbox-header">Selected Chip</h3>
  <md-chip icon="icon-file-pdf_16" iconColor="violet-60" selected value="contract-revision.pdf">
    Contract revision</md-chip
  >
  <h3 class="sandbox-header">Disabled Chip</h3>

  <md-chip icon="icon-file-pdf_16" disabled selected value="contract-revision.pdf">Contract revision</md-chip>

  <h3 class="sandbox-header">Loading Chip</h3>
  <md-chip icon="icon-file-pdf_16" iconColor="violet-60" determinateProgress="67" value="IMG_Dapper_Dog.jpeg">
  </md-chip>
  <md-chip icon="icon-file-pdf_16" iconColor="violet-60" indeterminateProgress value="IMG_Dapper_Dog.jpeg"> </md-chip>
  <h3 class="sandbox-header">Text Overflow Chip</h3>
  <md-chip icon="icon-file-pdf_16" iconColor="violet-60" value="super-long-cisco-tihng-filename_001239084.png">
  </md-chip>
  <h3 class="sandbox-header">Minimum Width Chip</h3>
  <md-chip icon="icon-file-pdf_16" iconColor="violet-60" value="i"> </md-chip>
  <h3 class="sandbox-header">Named Custom content Slots</h3>
  <md-chip color="cyan" readonly value="developer@cisco.ninja">
    <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
    <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
  </md-chip>
  <h3>Color Chips (Read Only)</h3>
  <md-chip readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="blue" readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="red" readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="yellow" readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="green" readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="mint" readonly value="developer@cisco.ninja">
    cisco-developer@cisco.ninja
  </md-chip>
  <md-chip color="cyan" readonly value="developer@cisco.ninja">
    <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
    <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
  </md-chip>
  <h3>Chip List</h3>
  <ul role="list">
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip1"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip2"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip3"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip4"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip5"></md-chip>
  </ul>
`;
