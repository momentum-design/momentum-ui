import "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import svg from "@img/profile.svg";
import { html } from "lit-element";

export const avatarTemplate = html`
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
  <md-avatar title="active" size="48" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="48" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="schedule" size="48" type="schedule" newMomentum="true"></md-avatar>
  <md-avatar title="call" size="48" type="call" newMomentum="true"></md-avatar>
  <md-avatar title="dnd" size="48" type="dnd" newMomentum="true"></md-avatar>
  <md-avatar title="presenting" size="48" type="presenting" newMomentum="true"></md-avatar>
  <md-avatar title="quiet-hours" size="48" type="quiet-hours" newMomentum="true"></md-avatar>
  <md-avatar title="away" size="48" type="away" newMomentum="true"></md-avatar>
  <md-avatar title="ooo" size="48" type="ooo" newMomentum="true"></md-avatar>
  <md-avatar title="busy" size="48" type="busy" newMomentum="true"></md-avatar>
  <md-avatar title="on-mobile" size="48" type="on-mobile" newMomentum="true"></md-avatar>
  <md-avatar title="on-device" size="48" type="on-device" newMomentum="true"></md-avatar>
  <md-avatar title="on-hold" size="48" type="on-hold" newMomentum="true"></md-avatar>
  <h3>New Icon Avatar Status Size</h3>
  <md-avatar title="active" size="24" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="32" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="48" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="64" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="72" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="88" type="active" newMomentum="true"></md-avatar>
  <md-avatar title="active" size="124" type="active" newMomentum="true"></md-avatar>
  <br/>
  <br/>
  <md-avatar title="meeting" size="24" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="32" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="48" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="64" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="72" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="88" type="meeting" newMomentum="true"></md-avatar>
  <md-avatar title="meeting" size="124" type="meeting" newMomentum="true"></md-avatar>
  <h3>Icon Avatar Group</h3>
  <md-avatar title="Icon" type="group"></md-avatar>
  <h3>Avatar Self</h3>
  <md-avatar title="Self" type="self" size="24"></md-avatar>
  <md-avatar title="Self" type="self" size="28"></md-avatar>
  <md-avatar title="Self" type="self" size="36"></md-avatar>
  <md-avatar title="Self" type="self" size="40"></md-avatar>
  <md-avatar title="Self" type="self" size="44"></md-avatar>
  <md-avatar title="Self" type="self" size="56"></md-avatar>
  <h3>Icon Avatar Bot</h3>
  <md-avatar type="bot" title="Tom Smith"></md-avatar>
  <h3>Icon Avatar Notification</h3>
  <md-avatar has-notification type="active" size="72" title="Tom Smith"></md-avatar>
  <h3>Icon Avatar Typing</h3>
  <md-avatar type="typing" size="84" title="Tom Smith"></md-avatar>
  <h3>Composite Avatar</h3>
  <md-composite-avatar size="72">
    <md-avatar type="typing" has-notification title="Tom Smith"></md-avatar>
    <md-avatar type="dnd" title="Alyson Hoagland Pace"></md-avatar>
  </md-composite-avatar>
`;
