import React from 'react';
import {
  AlertContainer,
  Button
} from '@collab-ui/react';
export default class AlertSuccess extends React.PureComponent {
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
              onClick={() => alertContainer.success(
                'Alert',
                this.state.alertMessage,
                () => alert('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Success'
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
