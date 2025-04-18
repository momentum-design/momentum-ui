/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/taskitem/TaskItem";
import { action } from "@storybook/addon-actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { TaskItemStatus, TaskItemMediaType } from "./TaskItem.constants";
import { iconUrlManager } from "@/managers/IconUrlManager";

export default {
  title: "Components/Task Item",
  component: "md-task-item",
  argTypes: {
    title: { control: "text" },
    popovertitle: { control: "text" },
    "item-title": { control: "text" },
    quantity: { control: "number" },
    mediaType: { control: "text" },
    status: { control: "text" },
    queue: { control: "text" },
    "queue-time": { control: "text" },
    lastmessage: { control: "text" },
    "is-restyle": { control: "boolean" },
    "display-only-title": { control: "boolean" },
    selected: { control: "boolean" },
    iconSrc: { control: "text" },
    slot: { control: "text" },
    disabled: { control: "boolean" },

    renderTaskType: { table: { disable: true } },
    renderStatus: { table: { disable: true } },
    onCornerMove: { table: { disable: true } },
    resizeStyleMap: { table: { disable: true } },
    fullScreen: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-task-item"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-task-item
      mediaType="${args.mediaType}"
      popovertitle="${args.popovertitle}"
      status="${args.status}"
      title="${args.title}"
      item-title="${args["item-title"]}"
      queue="${args.queue}"
      queue-time="${args["queue-time"]}"
      quantity="${args.quantity}"
      lastmessage="${args.lastmessage}"
      iconSrc="${args.iconSrc}"
      ?is-restyle=${args["is-restyle"]}
      ?display-only-title=${args["display-only-title"]}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      @taskitem-click=${action("click")}
      @taskitem-keydown=${action("keydown")}
    >
      ${unsafeHTML(args.slot)}
    </md-task-item>
  `;
};

export const Example: StoryObj = {
  args: {
    title: "Mihael Varificantare",
    quantity: 12,
    mediaType: "voice",
    status: "conference",
    queue: "IRV_quelle_11",
    "is-restyle": false,
    slot: `
      <md-badge slot="task-type" color="darkmint" circle>
        <md-icon name="sms-filled" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
      </md-badge>
      <div>00:00</div>
    `
  },
  render: render
};

export const LegacyTaskItem: StoryObj = {
  render: () => {
    return html`
      <div style="width: 350px;">
        <h3>Legacy Task Item</h3>
        ${render({
          title: "%CustName/Email/GUID%",
          quantity: 12,
          mediaType: TaskItemMediaType.CHAT,
          status: TaskItemStatus.CONFERENCE,
          queue: "%Queue%",
          slot: `
        <div>00:00</div>
      `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          quantity: 123,
          mediaType: TaskItemMediaType.SMS,
          status: TaskItemStatus.COURTESY_CALLBACK,
          queue: "%Queue%",
          slot: `
        <div>00:00</div>
      `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.SMS,
          status: TaskItemStatus.COURTESY_CALLBACK,
          queue: "%Queue%",
          slot: `
          <div style="display: flex; flex-direction: column ;justify-content: space-evenly; height: 100%;gap:4px;">
            <md-button variant="green" size="28"> Answer </md-button>
            <md-button variant="red" size="28"> Decline </md-button>
          </div>
      `
        })}
        ${render({
          "item-title": "%CustName/Email/GUID%",
          "display-only-title": true,
          mediaType: TaskItemMediaType.OUTBOUND_CAMPAIGN,
          slot: `
          <md-button variant="secondary" loading maxWidth="150px" disabled size="28">
            <span slot="text">Connecting...</span>
          </md-button>
          `
        })}
      </div>
    `;
  }
};

export const RestyleTaskItem: StoryObj = {
  render: () => {
    return html`
      <div style="width: 284px;">
        <h3>Restyle Task Item</h3>
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.CHAT,
          queue: "%Queue%",
          "queue-time": "Handle Time: 00:00",
          lastmessage: "%Last Message%",
          "is-restyle": true
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.CHAT,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          disabled: true
        })}
        ${render({
          mediaType: TaskItemMediaType.CHAT,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          slot: `
          <md-tooltip message="Click to call" placement="top" slot="title">
            <md-link tag="a" inline inline-style="default">+01 32498 587</md-link>
          </md-tooltip>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          quantity: 1,
          mediaType: TaskItemMediaType.CHAT,
          queue: "%Queue%",
          "queue-time": "Handle Time: 00:00",
          lastmessage: "%Last Message%",
          "is-restyle": true
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.CHAT,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          slot: `
            <md-button variant="green" size="28"> Answer </md-button>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.WHATSAPP,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          slot: `
            <md-button circle size="28">
              <md-icon slot="icon" name="more-bold" iconSet="momentumDesign"></md-icon>
            </md-button>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.WHATSAPP,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          selected: true,
          slot: `
            <md-checkbox></md-checkbox>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.TELEPHONY,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          slot: `
            <md-button variant="secondary" size="28" style="margin-bottom: 8px">
              <md-icon slot="icon" name="assign-privilege-bold" iconSet="momentumDesign" style="margin-right: 6px"></md-icon>
               Assign
            </md-button>
            <md-button variant="secondary" size="28">
              <md-icon slot="icon" name="assign-host-bold" iconSet="momentumDesign" style="margin-right: 6px"></md-icon>
               Assign to me 
            </md-button>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.TELEPHONY,
          queue: "%Queue%",
          lastmessage: "10:00AM 04/21/2025",
          "is-restyle": true,
          slot: `
          <div style="display:flex; gap:4px; margin-left:auto;">
            <md-button circle size="28"
              ><md-icon slot="icon" name="delete-bold" color="var(--taskitem-restyle-error-text-color)" iconSet="momentumDesign"></md-icon
            ></md-button>
            <md-button circle size="28"
              ><md-icon slot="icon" name="edit-bold" iconSet="momentumDesign"></md-icon
            ></md-button>
          </div>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.TELEPHONY,
          queue: "%Queue%",
          lastmessage: "%Last Message%",
          "is-restyle": true,
          slot: `
          <div style="display:flex; gap:12px; margin-left:auto;">
            <md-chip value="0.0" color="negative" small>
              <md-icon name="emoji-unhappy-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
              <md-icon name="arrow-tail-up-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
            </md-chip>
            <md-button circle size="28">
              <md-icon slot="icon" name="more-bold" iconSet="momentumDesign"></md-icon>
            </md-button>
          </div>
          `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.TELEPHONY,
          lastmessage: "%Retry%",
          "is-restyle": true,
          slot: `
          <div
            slot="queue"
            style="display:flex; justify-content-center; color: var(--taskitem-restyle-error-text-color);"
          >
            <md-icon name="error-legacy-badge-filled" iconSet="momentumDesign" style="margin-right: 5px"></md-icon>
            %Error failed load%
          </div>
          <md-button variant="secondary" circle size="28"
            ><md-icon slot="icon" name="refresh-bold" iconSet="momentumDesign"></md-icon
          ></md-button>
        `
        })}
        ${render({
          title: "%CustName/Email/GUID%",
          mediaType: TaskItemMediaType.OUTBOUND_CAMPAIGN,
          "is-restyle": true,
          slot: `
          <md-button variant="secondary" loading maxWidth="150px" disabled size="28">
            <span slot="text">Connecting...</span>
          </md-button>
          `
        })}
        ${render({
          title: "%Campaign%",
          mediaType: TaskItemMediaType.OUTBOUND_CAMPAIGN,
          queue: "%Queue%",
          lastmessage: "Time left 00:29",
          "is-restyle": true,
          slot: `
          <div style="display: flex; flex-direction: column ;justify-content: space-evenly; height: 100%; gap:8px;">
            <md-button variant="green" size="28"> Accept </md-button>
            <div style="display:flex; gap:4px; margin-left:auto;">
              <md-button variant="secondary" circle size="28"
                ><md-icon slot="icon" name="skip-bold" iconSet="preferMomentumDesign"></md-icon
              ></md-button>
              <md-button variant="secondary" circle size="28"
                ><md-icon slot="icon" name="remove-bold" iconSet="preferMomentumDesign"></md-icon
              ></md-button>
            </div>
          </div>
          `
        })}
      </div>
    `;
  }
};

export const TaskItemMediaTypes: StoryObj = {
  render: () => {
    const MediaType = Object.values(TaskItemMediaType);
    return html`
      <div style="width: 300px;">
        <h3>Task Item Avatar Status</h3>

        ${MediaType.map(
          (type) => html`
            <div>Media Type: <b>${type}</b></div>
            ${render({
              title: "%CustName/Email/GUID%",
              mediaType: type,
              queue: "%Queue%",
              iconSrc: `${iconUrlManager.svgIconUrl}/social-viber-color.svg`,
              lastmessage: "%Last Message%",
              "is-restyle": true
            })}
          `
        )}
      </div>
    `;
  }
};

export const TaskItemAvatarStatus: StoryObj = {
  render: () => {
    const Avatarstatus = Object.values(TaskItemStatus);
    return html`
      <div style="width: 300px;">
        <h3>Task Item Avatar Status</h3>

        ${Avatarstatus.map(
          (status) => html`
            <div>status: <b>${status}</b></div>
              ${render({
                title: "%CustName/Email/GUID%",
                mediaType: TaskItemMediaType.CHAT,
                status: status,
                queue: "%Queue%",
                lastmessage: "%Last Message%",
                "is-restyle": true
              })}
            </div>
          `
        )}
      </div>
    `;
  }
};
