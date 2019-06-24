import React from 'react';
import {
  AlertCall,
  AlertCallContainer,
  Button
} from '@momentum-ui/react';
import uniqueId from 'lodash/uniqueId';
import reject from 'lodash/reject';
export default class AlertCallDefault extends React.PureComponent {
  state = {
    alertList: [],
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'},
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }
  handleOnReject = key => {
    alert(`onRejectCall ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  handleOnAnswerVoice = key => {
    alert(`onAnswerVoice ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  handleOnAnswerVideo = key => {
    alert(`onAnswerVideo ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  renderPersonCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => alert("onDeviceSelect")}
        show
      />
    );
  };
  render() {
    return (
      <div>
        <div className='row'>
          <Button
            ariaLabel='Click to Open'
            onClick={() => {
              this.setState(state => ({
                alertList: [...state.alertList, this.renderPersonCaller()]
              }));
            }}
            children='Person Caller'
            color='primary'
          />
        </div>
        <AlertCallContainer>
          {this.state.alertList}
        </AlertCallContainer>
      </div>
    );
  }
}
