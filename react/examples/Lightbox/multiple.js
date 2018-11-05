import React from 'react';
import { Button, Lightbox } from '@collab-ui/react';
import reactIcon from '@collab-ui/core/docs/assets/react.png';
import angularIcon from '@collab-ui/core/docs/assets/angular.png';
 export default class Default extends React.Component {
  state = {
    index: 0,
    show: false,
    downloading: false,
  }
  render() {
    return (
      <div>
        <Button ariaLabel='Show Lightbox' onClick={() => this.setState({ show: true })}>Show</Button>
        {
          this.state.show &&
          <Lightbox
            onClose={() => this.setState({ show: false})}
            onChange={(idx) => this.setState({ index: idx })}
            name="Screen Shot 2018-04-11 at 7.32.51 PM.png"
            applicationId="app"
            onDownload={() => {
                this.setState({downloading: true});
                setTimeout(() => this.setState({downloading: false}), 2000);
              }
            }
            downloading={this.state.downloading}
            info={{sharedBy:"Shared by test", sharedOn: "At 4/17/2018, 10:02 AM", size: "34.4 KB"}}
            index={this.state.index}
            height={250}
            width={250}
            pages={[{
              decrypting: false,
              image: reactIcon,
              thumb: reactIcon
            }, {
              decrypting: false,
              image: angularIcon,
              thumb: angularIcon
            }]}
          />
        }
      </div>
    );
  }
}