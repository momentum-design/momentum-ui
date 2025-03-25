import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const templateHTML = (attendees: Array<Record<string, any>>) => {
  // TODO: JIRA CAX-327: Replace style overrides with dedicated CompositeAvatar component
  const compositeAvatarWrapper = `position: relative; display: block;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;`;
  const compositeAvatar = `display: flex;width: 1.625rem;height: 1.625rem;font-size: .56875rem;line-height: .8125rem;`;
  const compositeAvatarOne = `position: absolute;left: 0px;top: 0px;`;
  const compositeAvatarTwo = `position: absolute;right: 0px;bottom: 0px;`;

  return html`
    <div class="md-composite-avatar md-composite-avatar--wc-override" style=${compositeAvatarWrapper}>
      <md-avatar
        slot="avatar"
        class="md-avatar"
        alt=${attendees[0].alt || attendees[0].title}
        src=${ifDefined(attendees[0].src ? attendees[0].src : undefined)}
        title=${attendees[0].title}
        size="24"
        style=${compositeAvatar + compositeAvatarOne}
      ></md-avatar>
      <md-avatar
        slot="avatar"
        class="md-avatar"
        alt=${attendees[1].alt || attendees[1].title}
        src=${ifDefined(attendees[1].src ? attendees[1].src : undefined)}
        title=${attendees[1].title}
        size="24"
        style=${compositeAvatar + compositeAvatarTwo}
      ></md-avatar>
    </div>
  `;
};
