import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-activity-button-default',
  template: `
  <div>
    <md-activity-button type='chat' [size]='56' (whenClick)='handleClick("chat")'></md-activity-button>
    <md-activity-button type='camera' [size]='56' (whenClick)='handleClick("camera")'></md-activity-button>
    <md-activity-button type='contact-card' [size]='56' (whenClick)='handleClick("contact-card")'></md-activity-button>
    <md-activity-button type='meetings' [size]='56' (whenClick)='handleClick("meetings")'></md-activity-button>
    <md-activity-button type='whiteboard' [size]='56' (whenClick)='handleClick("whiteboard")'></md-activity-button>
    <md-activity-button type='files' [size]='56' (whenClick)='handleClick("files")'></md-activity-button>
    <md-activity-button type='share-screen' [size]='56' (whenClick)='handleClick("share-screen")'></md-activity-button>
    <md-activity-button type='tasks' [size]='56' (whenClick)='handleClick("tasks")'></md-activity-button>
  </div>
  <div>
    <md-activity-button type='chat' (whenClick)='handleClick("chat")'></md-activity-button>
    <md-activity-button type='camera' (whenClick)='handleClick("camera")'></md-activity-button>
    <md-activity-button type='contact-card' (whenClick)='handleClick("contact-card")'></md-activity-button>
    <md-activity-button type='meetings' (whenClick)='handleClick("meetings")'></md-activity-button>
    <md-activity-button type='whiteboard' (whenClick)='handleClick("whiteboard")'></md-activity-button>
    <md-activity-button type='files' (whenClick)='handleClick("files")'></md-activity-button>
    <md-activity-button type='share-screen' (whenClick)='handleClick("share-screen")'></md-activity-button>
    <md-activity-button type='tasks' (whenClick)='handleClick("tasks")'></md-activity-button>
  </div>
  <div>
    <md-activity-button [disabled]='true' type='chat' [size]='84' (whenClick)='handleClick("chat")'></md-activity-button>
    <md-activity-button type='camera' [size]='84' (whenClick)='handleClick("camera")'></md-activity-button>
    <md-activity-button type='contact-card' [size]='84' (whenClick)='handleClick("contact-card")'></md-activity-button>
    <md-activity-button type='meetings' [size]='84' (whenClick)='handleClick("meetings")'></md-activity-button>
    <md-activity-button type='whiteboard' [size]='84' (whenClick)='handleClick("whiteboard")'></md-activity-button>
    <md-activity-button type='files' [size]='84' (whenClick)='handleClick("files")'></md-activity-button>
    <md-activity-button type='share-screen' [size]='84' (whenClick)='handleClick("share-screen")'></md-activity-button>
    <md-activity-button type='tasks' [size]='84' (whenClick)='handleClick("tasks")'></md-activity-button>
  </div>
  `,
  styles: []
})
export class ActivityButtonDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleClick = (str) => {
    console.info(str);
  }

}
