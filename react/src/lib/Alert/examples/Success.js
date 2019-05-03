import React from 'react';
import {
  Alert,
  AlertContainer,
  Button
} from '@momentum-ui/react';
export default class AlertDefault extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!',
    show: false
  }
  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ show: true })}
              children='Success'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer>
          <Alert
            closable
            title='Alert'
            message={'Who\'s awesome?  You are!'}
            dismissBtnProps={{ 
              onClick: () => this.setState({ show: false }),
              ariaLabel: 'Close Alert'
            }}
            show={this.state.show}
            type='success'
          />
        </AlertContainer>
      </section>
    );
  }
}
