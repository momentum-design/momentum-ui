import React from 'react';
import {
  Alert,
  AlertContainer,
  Button
} from '@momentum-ui/react';
export default class AlertDefault extends React.PureComponent {
  state = {
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
              children='Error'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer>
          <Alert
            closable
            title='Error'
            message={'Who\'s awesome?  You are!'}
            dismissBtnProps={{ 
              onClick: () => this.setState({ show: false }),
              ariaLabel: 'Close Alert'
            }}
            show={this.state.show}
            type='error'
          />
        </AlertContainer>
      </section>
    );
  }
}
