import React from 'react';
import { Lightbox } from '@momentum-ui/react';
import reactIcon from '@momentum-ui/core/images/momentum/momentum.jpg';
import ciscoWebex from '@momentum-ui/core/images/cisco-webex/lockup/cisco-webex-lockup-blue.png';

export default class LightboxKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Lightbox
          onClose={() => {}}
          onChange={() => {}}
          name="Screen Shot 2018-04-11 at 7.32.51 PM.png"
          applicationId="app"
          onDownload={() => {}}
          downloading={false}
          info={{
            sharedBy: 'Shared by test',
            sharedOn: 'At 4/17/2018, 10:02 AM',
            size: '34.4 KB',
          }}
          index={0}
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
      </React.Fragment>
    );
  }
}
