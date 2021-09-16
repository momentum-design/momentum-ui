import "@/components/avatar/Avatar";
import "@/components/avatar/CompositeAvatar";
import svg from "@img/profile.svg";
import { html } from "lit";

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
  <md-avatar title="Icon" size="36" type="dnd"></md-avatar>
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
