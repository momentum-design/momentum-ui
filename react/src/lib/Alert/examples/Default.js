import React from 'react';
import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';
export default class AlertDefault extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }
  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.info(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Info/Default'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}