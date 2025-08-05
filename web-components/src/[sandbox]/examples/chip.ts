import "@/components/chip/Chip";
import "@/components/list/List";
import { html } from "lit-element";

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
  <md-chip
    icon="file-pdf-bold"
    iconSize="16"
    iconSet="momentumDesign"
    iconColor="violet-60"
    selected
    value="contract-revision.pdf"
  >
    Contract revision</md-chip
  >
  <h3 class="sandbox-header">Disabled Chip</h3>

  <md-chip icon="file-pdf-bold" iconSize="16" iconSet="momentumDesign" disabled selected value="contract-revision.pdf">
    Contract revision
  </md-chip>

  <h3 class="sandbox-header">Loading Chip</h3>
  <md-chip
    icon="file-pdf-bold"
    iconSize="16"
    iconSet="momentumDesign"
    iconColor="violet-60"
    determinateProgress="67"
    value="IMG_Dapper_Dog.jpeg"
  >
  </md-chip>
  <md-chip
    icon="file-pdf-bold"
    iconSize="16"
    iconSet="momentumDesign"
    iconColor="violet-60"
    indeterminateProgress
    value="IMG_Dapper_Dog.jpeg"
  >
  </md-chip>
  <h3 class="sandbox-header">Text Overflow Chip</h3>
  <md-chip
    icon="file-pdf-bold"
    iconSize="16"
    iconSet="momentumDesign"
    iconColor="violet-60"
    tooltipText="super-long-cisco-tihng-filename_001239084.png"
    value="super-long-cisco-tihng-filename_001239084.png"
  >
  </md-chip>

  <h3 class="sandbox-header">Text Overflow Chip with different tooltip</h3>
  <md-chip
    icon="file-pdf-bold"
    iconSize="16"
    iconSet="momentumDesign"
    iconColor="violet-60"
    tooltipText="a more descriptive tooltip"
    value="super-long-cisco-tihng-filename_001239084.png"
  >
  </md-chip>

  <h3 class="sandbox-header">Minimum Width Chip</h3>
  <md-chip icon="file-pdf-bold" iconSize="16" iconSet="momentumDesign" iconColor="violet-60" value="i"> </md-chip>
  <h3 class="sandbox-header">Named Custom content Slots</h3>
  <md-chip color="cyan" readonly value="developer@cisco.ninja">
    <md-icon name="alert-bold" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
    <md-icon name="alarm-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
  </md-chip>
  <h3>Color Chips (Read Only)</h3>
  <md-chip readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="blue" readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="red" readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="yellow" readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="green" readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="mint" readonly value="developer@cisco.ninja"> cisco-developer@cisco.ninja </md-chip>
  <md-chip color="cyan" readonly value="developer@cisco.ninja">
    <md-icon name="alert-bold" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
    <md-icon name="alarm-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
  </md-chip>
  <md-tooltip message="more info on filter1" placement="bottom">
    <md-chip value="Test Agent Filter1">
      <md-icon name="icon-cancel_8" slot="custom-right-content"></md-icon>
    </md-chip>
  </md-tooltip>
  <md-chip tooltipText="more info on filter2" value="Test Agent Filter 2" tooltipPlacement="right">
    <md-icon name="icon-cancel_8" slot="custom-right-content"></md-icon>
  </md-chip>
  <h3>Chip List</h3>
  <ul role="list">
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip1"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip2"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip3"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip4"></md-chip>
    <md-chip value="developer@cisco.ninja" slot="list-item" id="Chip5"></md-chip>
  </ul>
  <h3 class="sandbox-header">sentiment chip</h3>
  <md-chip value="- % #" color="positive" small>
    <md-icon name="emoji-happy-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="- % #" color="negative" small>
    <md-icon name="emoji-unhappy-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="- % #" color="neutral" small>
    <md-icon name="emoji-passive-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="Partial" color="warning" small>
    <md-icon name="unblock-bold" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <h3 class="sandbox-header">status chip</h3>
  <md-chip value="Agent name - 00:00" color="status-positive" small>
    <md-icon name="participant-filled" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="%Wrap-up alert% - 00:00" color="status-negative" small suppress-default-max-width>
    <md-icon name="alert-active-filled" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="Wrap-up - 00:00" color="status-accent" small>
    <md-icon name="archive-filled" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="Barged - 00:00" color="status-warning" small>
    <md-icon name="call-barge-filled" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <md-chip value="On hold - 00:00" color="status-orange" small>
    <md-icon name="call-hold-filled" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
  </md-chip>
  <h3 class="sandbox-header">confidence chip</h3>
  <md-chip value="Default" color="confidence-default" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Violet" color="confidence-violet" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Slate" color="confidence-slate" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Gold" color="confidence-gold" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Mint" color="confidence-mint" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Pink" color="confidence-pink" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Cobalt" color="confidence-cobalt" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <md-chip value="Lime" color="confidence-lime" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #</span>
  </md-chip>
  <h3 class="sandbox-header">confidence chip with long text</h3>
  <md-chip value="Confidence chip with long text and long confidence" color="confidence-default" small>
    <span slot="custom-right-content"><span aria-hidden="true"> | </span>Confidence: #####</span>
  </md-chip>
  <h3 class="sandbox-header">Agent Chip informational</h3>
  <md-chip value="Agent: John Doe" decorative> </md-chip>
  <h3 class="sandbox-header">Agent Chip</h3>
  <md-chip value="Kevin Hyde" color="neutral" small>
    <md-avatar
      alt="avatar"
      title="Kevin Hyde"
      size="16"
      newMomentum
      style="display: flex"
      src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png"
      slot="custom-left-content"
    ></md-avatar>
  </md-chip>
`;
