import "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import "@/components/toggle-switch/ToggleSwitch";
import svg from "@img/profile.svg";
import { LitElement, customElement, html, internalProperty } from "lit-element";

@customElement("avatar-template-sandbox")
export class AvatarTemplateSandbox extends LitElement {
  @internalProperty()
  private isNewMomentumEnabled = false;

  private readonly toggleMomentum = () => {
    this.isNewMomentumEnabled = !this.isNewMomentumEnabled;
  };

  get channelAvatarTemplate() {
    return html`
      <h3>Icon Avatar Channel with style:table (no Background Color)</h3>
      <md-avatar title="Channel Chat" type="channel-chat" avatar-style="table"></md-avatar>
      <md-avatar title="Channel SMS Inbound" type="channel-sms-inbound" avatar-style="table"></md-avatar>
      <md-avatar title="Channel SMS Outbound" type="channel-sms-outbound" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Email Inbound" type="channel-email-inbound" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Email Outbound" type="channel-email-outbound" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Call" type="channel-call" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Callback" type="channel-callback" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Headset" type="channel-headset" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Campaign" type="channel-campaign" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Emoji" type="channel-emoji" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Webex" type="channel-webex" avatar-style="table"></md-avatar>
      <md-avatar title="Channel FB Messenger" type="channel-fb-messenger" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Apple Chat" type="channel-apple-chat" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Line" type="channel-line" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Twitter X" type="channel-twitter-x" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Viber" type="channel-viber" avatar-style="table"></md-avatar>
      <md-avatar title="Channel Whats App" type="channel-whats-app" avatar-style="table"></md-avatar>
      <md-avatar title="Channel We Chat" type="channel-we-chat" avatar-style="table"></md-avatar>
      <md-avatar title="Suspected Spam" type="channel-spam"></md-avatar>
      <h3>Icon Avatar Channel with style:default and state:active (Background Color:white)</h3>
      <md-avatar title="Channel Chat" type="channel-chat" avatar-style="default" state="active"></md-avatar>
      <md-avatar
        title="Channel SMS Inbound"
        type="channel-sms-inbound"
        avatar-style="default"
        state="active"
      ></md-avatar>
      <md-avatar
        title="Channel SMS Outbound"
        type="channel-sms-outbound"
        avatar-style="default"
        state="active"
      ></md-avatar>
      <md-avatar
        title="Channel Email Inbound"
        type="channel-email-inbound"
        avatar-style="default"
        state="active"
      ></md-avatar>
      <md-avatar
        title="Channel Email Outbound"
        type="channel-email-outbound"
        avatar-style="default"
        state="active"
      ></md-avatar>
      <md-avatar title="Channel Call" type="channel-call" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Callback" type="channel-callback" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Headset" type="channel-headset" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Campaign" type="channel-campaign" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Emoji" type="channel-emoji" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Webex" type="channel-webex" avatar-style="default" state="active"></md-avatar>
      <md-avatar
        title="Channel FB Messenger"
        type="channel-fb-messenger"
        avatar-style="default"
        state="active"
      ></md-avatar>
      <md-avatar title="Channel Apple Chat" type="channel-apple-chat" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Line" type="channel-line" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Twitter X" type="channel-twitter-x" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Viber" type="channel-viber" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel Whats App" type="channel-whats-app" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Channel We Chat" type="channel-we-chat" avatar-style="default" state="active"></md-avatar>
      <md-avatar title="Suspected Spam" type="channel-spam"></md-avatar>
      <h3>Icon Avatar Channel with style:default state:rest (Background Color:dark gray)</h3>
      <md-avatar title="Channel Chat" type="channel-chat" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel SMS Inbound" type="channel-sms-inbound" avatar-style="default" state="rest"></md-avatar>
      <md-avatar
        title="Channel SMS Outbound"
        type="channel-sms-outbound"
        avatar-style="default"
        state="rest"
      ></md-avatar>
      <md-avatar
        title="Channel Email Inbound"
        type="channel-email-inbound"
        avatar-style="default"
        state="rest"
      ></md-avatar>
      <md-avatar
        title="Channel Email Outbound"
        type="channel-email-outbound"
        avatar-style="default"
        state="rest"
      ></md-avatar>
      <md-avatar title="Channel Call" type="channel-call" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Callback" type="channel-callback" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Headset" type="channel-headset" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Campaign" type="channel-campaign" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Emoji" type="channel-emoji" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Webex" type="channel-webex" avatar-style="default" state="rest"></md-avatar>
      <md-avatar
        title="Channel FB Messenger"
        type="channel-fb-messenger"
        avatar-style="default"
        state="rest"
      ></md-avatar>
      <md-avatar title="Channel Apple Chat" type="channel-apple-chat" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Line" type="channel-line" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Twitter X" type="channel-twitter-x" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Viber" type="channel-viber" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel Whats App" type="channel-whats-app" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Channel We Chat" type="channel-we-chat" avatar-style="default" state="rest"></md-avatar>
      <md-avatar title="Suspected Spam" type="channel-spam"></md-avatar>
      <h3>Icon Avatar Channel with Custom Icon</h3>
      <md-avatar title="Custom Channel" type="channel-custom" avatar-style="table" state="rest">
        <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
      </md-avatar>
      <md-avatar title="Custom Channel" type="channel-custom" avatar-style="default" state="active">
        <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
      </md-avatar>
      <md-avatar title="Custom Channel" type="channel-custom" avatar-style="default" state="rest">
        <md-icon name="placeholder-filled" iconSet="momentumDesign"></md-icon>
      </md-avatar>
    `;
  }

  render() {
    return html`
      <h3>Basic Large Avatar</h3>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="purple"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="mint"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="slate"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="gold"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="pink"></md-avatar>
      <md-avatar alt="avatar" title="Alyson Hoagland Pace" size="44" color="lime"></md-avatar>
      <h3>Medium Src Avatar</h3>
      <md-avatar
        alt="avatar"
        title="Kevin Hyde"
        size="52"
        src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png"
      ></md-avatar>
      <h3>Small Avatar with Custom Image</h3>
      <md-avatar alt="avatar" title="Kevin Hyde" size="18">
        <img
          src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
        />
      </md-avatar>
      <h3>Medium Type with Custom SVG Image</h3>
      <md-avatar alt="avatar" title="Kevin Hyde" size="40">
        <img width="100" height="100" src=${svg} />
      </md-avatar>
      <h3>Icon Avatar with Color</h3>
      <md-avatar alt="avatar" title="Warning Icon" size="80" color="mint" icon-name="warning_20"></md-avatar>
      <md-avatar alt="avatar" title="Warning Icon" size="80" icon-name="bot-bold" newMomentum></md-avatar>
      <h3>Icon Avatar Status</h3>
      <md-avatar title="active" size="36" type="active"></md-avatar>
      <md-avatar title="bot" size="36" type="bot"></md-avatar>
      <md-avatar title="call" size="36" type="call"></md-avatar>
      <md-avatar title="dnd" size="36" type="dnd"></md-avatar>
      <md-avatar title="group" size="36" type="group"></md-avatar>
      <md-avatar title="inactive" size="36" type="inactive"></md-avatar>
      <md-avatar title="meeting" size="36" type="meeting"></md-avatar>
      <md-avatar title="ooo" size="36" type="ooo"></md-avatar>
      <md-avatar title="presenting" size="36" type="presenting"></md-avatar>
      <md-avatar title="self" size="36" type="self"></md-avatar>
      <md-avatar title="typing" size="36" type="typing"></md-avatar>
      <md-avatar title="engaged" size="36" type="engaged"></md-avatar>
      <md-avatar title="idle" size="36" type="idle"></md-avatar>
      <md-avatar title="rona" size="36" type="rona"></md-avatar>
      <h3>New Icon Avatar Status</h3>
      <md-avatar title="active" size="48" type="active" newMomentum></md-avatar>
      <md-avatar title="meeting" size="48" type="meeting" newMomentum></md-avatar>
      <md-avatar title="schedule" size="48" type="schedule" newMomentum></md-avatar>
      <md-avatar title="call" size="48" type="call" newMomentum></md-avatar>
      <md-avatar title="dnd" size="48" type="dnd" newMomentum></md-avatar>
      <md-avatar title="presenting" size="48" type="presenting" newMomentum></md-avatar>
      <md-avatar title="quiet-hours" size="48" type="quiet-hours" newMomentum></md-avatar>
      <md-avatar title="away" size="48" type="away" newMomentum></md-avatar>
      <md-avatar title="ooo" size="48" type="ooo" newMomentum></md-avatar>
      <md-avatar title="busy" size="48" type="busy" newMomentum></md-avatar>
      <md-avatar title="on-mobile" size="48" type="on-mobile" newMomentum></md-avatar>
      <md-avatar title="on-device" size="48" type="on-device" newMomentum></md-avatar>
      <md-avatar title="on-hold" size="48" type="on-hold" newMomentum></md-avatar>
      <md-avatar title="away-calling" size="48" type="away-calling" newMomentum></md-avatar>
      <md-avatar title="active" size="48" type="active" newMomentum typing></md-avatar>
      <md-avatar title="engaged" size="48" type="engaged" newMomentum></md-avatar>
      <md-avatar title="rona" size="48" type="rona" newMomentum></md-avatar>
      <md-avatar title="idle" size="48" type="idle" newMomentum></md-avatar>
      <md-avatar title="inactive" size="48" type="inactive" newMomentum></md-avatar>
      <h3>New Icon Avatar Status Size</h3>
      <md-avatar title="active" size="24" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="32" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="40" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="48" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="64" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="72" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="88" type="active" newMomentum></md-avatar>
      <md-avatar title="active" size="124" type="active" newMomentum></md-avatar>
      <h3>New Icon Avatar Status legacy size</h3>
      <md-avatar size="28" type="idle" title="2 8" newMomentum></md-avatar>
      <md-avatar size="36" type="idle" title="3 6" newMomentum></md-avatar>
      <md-avatar size="44" type="idle" title="4 4" newMomentum></md-avatar>
      <md-avatar size="52" type="idle" title="5 2" newMomentum></md-avatar>
      <md-avatar size="56" type="idle" title="5 6" newMomentum></md-avatar>
      <br />
      <br />
      <md-avatar title="meeting" size="24" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="32" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="40" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="48" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="64" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="72" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="88" type="meeting" newMomentum></md-avatar>
      <md-avatar title="meeting" size="124" type="meeting" newMomentum></md-avatar>
      <h3>Icon Avatar Group</h3>
      <md-avatar title="Icon" type="group"></md-avatar>
      <h3>Avatar Self</h3>
      <md-avatar title="Self" type="self" size="24"></md-avatar>
      <md-avatar title="Self" type="self" size="28"></md-avatar>
      <md-avatar title="Self" type="self" size="36"></md-avatar>
      <md-avatar title="Self" type="self" size="40"></md-avatar>
      <md-avatar title="Self" type="self" size="44"></md-avatar>
      <md-avatar title="Self" type="self" size="56"></md-avatar>
      <md-avatar title="Self" type="self" size="124"></md-avatar>
      ${this.channelAvatarTemplate}
      <h3>Icon Avatar Bot</h3>
      <md-avatar type="bot" title="Tom Smith"></md-avatar>
      <md-avatar type="bot" title="Tom Smith" newMomentum></md-avatar>
      <h3>Icon Avatar Notification</h3>
      <md-avatar has-notification type="active" size="72" title="Tom Smith"></md-avatar>
      <h3>Icon Avatar Typing</h3>
      <md-avatar type="typing" size="84" title="Tom Smith"></md-avatar>
      <h3>Composite Avatar</h3>
      <md-composite-avatar size="72">
        <md-avatar type="typing" has-notification title="Tom Smith"></md-avatar>
        <md-avatar type="dnd" title="Alyson Hoagland Pace"></md-avatar>
      </md-composite-avatar>
      <h3>Click Event Avatar</h3>
      <md-avatar title="active" size="40" type="active" newMomentum role="button"></md-avatar>
      <h3>Toggle newMomentum on avatar</h3>
      <md-avatar
        title="active"
        size="36"
        type="idle"
        ?newMomentum=${this.isNewMomentumEnabled}
        role="button"
      ></md-avatar>
      <br />
      <md-toggle-switch htmlId="newMomentumToggleSwitch" @click=${this.toggleMomentum} alignLabel="left">
        Enable new momentum
      </md-toggle-switch>
    `;
  }
}

export const avatarTemplate = html` <avatar-template-sandbox></avatar-template-sandbox> `;
