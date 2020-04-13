import React from 'react';
import { Button, Lightbox } from '@momentum-ui/react';
import reactIcon from '@momentum-ui/core/images/momentum/momentum.jpg';
import ciscoWebex from '@momentum-ui/core/images/cisco-webex/lockup/cisco-webex-lockup-blue.png';

export default class LightboxKitchenSink extends React.Component {
  state = {
    index: 0,
    show: true
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={() => {this.setState({show: true});}}>
          Open
        </Button>
        {
          this.state.show && <Lightbox
          onClose={() => {this.setState({show: false});}}
          onChange={idx => this.setState({ index: idx })}
          name="Screen Shot 2018-04-11 at 7.32.51 PM.png"
          applicationId="app"
          onDownload={() => {}}
          downloading={false}
          info={{
            sharedBy: 'Shared by test',
            sharedOn: 'At 4/17/2018, 10:02 AM',
            size: '34.4 KB',
          }}
          index={this.state.index}
          height={250}
          width={250}
          pages={[
            {
              decrypting: false,
              image: reactIcon,
              thumb: reactIcon,
            },
            {
              decrypting: false,
              image: ciscoWebex,
              thumb: ciscoWebex,
            },
          ]}
        />
      }
      </React.Fragment>
    );
  }
}
