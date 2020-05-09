/** @component alert-meeting */

import React from 'react';
import {
  Button,
  AlertMeeting,
  AlertContainer
} from '@momentum-ui/react';

export default class Default extends React.PureComponent {
  state = {
    show: false
  }

  handleOnHide = () => {
    this.setState({show: false});
  }
  
  handleOnSnooze = () => {
    this.setState({show: false});
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({show: true})}
              children='Multiple Attendees'
              color='primary'
            />
          </div>
          <br />
          <AlertContainer>
            <AlertMeeting
              title='Important Meeting'
              status='In 5 mins.'
              message='This is important'
              onHide={this.handleOnHide}
              onSnooze={this.handleOnSnooze}
              attendees={[{title: 'J $'}, {title: 'Jefe Guadelupe'}]}
              show={this.state.show}
            />
          </AlertContainer>
        </div>
      </section>
    );
  }
}