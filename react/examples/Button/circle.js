import React from 'react';
import { Button, Icon } from '@collab-ui/react';
export default function ButtonLargeCircle() {
  return(
    <div>
      <div className='row' style={{marginBottom: '1rem'}}>
        <div className="example-spacing">
          <div>size=(none)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size='none'
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />
          <div>size=(20)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={20}
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />
          <div>size=(28)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              color='blue'
              size={28}
            >
              <Icon name='icon-plus_12' color='white' />
            </Button>
          </div>
          <br />
          <div>size=(32)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={32}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />
          <div>Default size=(36)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />
          <div>size=(40)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={40}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />
          <div>size=(44)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={44}
            >
              <Icon name='icon-arrow-tail-down_14' />
            </Button>
          </div>
          <br />
          <div>size=(56)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={56}
            >
              <Icon name='icon-arrow-tail-down_20' />
            </Button>
          </div>
          <br />
          <div>size=(68)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={68}
            >
              <Icon name='icon-arrow-tail-down_28' />
            </Button>
          </div>
          <br />
          <div>size=(72)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={72}
            >
              <Icon name='icon-active-speaker_32' />
            </Button>
          </div>
          <br />
          <div>size=(84)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={84}
            >
              <Icon name='icon-blocked_36' />
            </Button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}