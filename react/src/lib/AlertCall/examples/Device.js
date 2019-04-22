import React from 'react';
import {
  Button,
  AlertCall,
  AlertCallContainer
} from '@momentum-ui/react';
import uniqueId from 'lodash/uniqueId';
import reject from 'lodash/reject';
export default class AlertCallDevice extends React.PureComponent {
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
  renderDeviceCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'}}
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
          <br />
          <Button
            ariaLabel='Click to Open'
            onClick={() => {
              this.setState(state => ({
                alertList: [...state.alertList, this.renderDeviceCaller()]
              }));
            }}
            children='Device Caller'
            color='primary'
          />
        </div>
        <AlertCallContainer
          alertList={this.state.alertList}
        />
      </div>
    );
  }
}
