import React from 'react';
import {
  AlertContainer,
  Button
} from '@momentum-ui/react';
export default class AlertError extends React.PureComponent {
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
              onClick={() => alertContainer.error(
                'Alert',
                this.state.alertMessage,
                () => alert('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Error'
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
