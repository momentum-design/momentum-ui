import React from 'react';
import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';
export default class AlertWarning extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }
  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.warning(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Warning'
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