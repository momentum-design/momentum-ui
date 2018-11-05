import React from 'react';
import {
  Button,
  AlertCall,
  AlertCallContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';
export default class Default extends React.PureComponent {
  state = {
    alertList: [],
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'},
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }
  handleOnReject = key => {
    console.log(`onRejectCall ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  handleOnAnswerVoice = key => {
    console.log(`onAnswerVoice ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  handleOnAnswerVideo = key => {
    console.log(`onAnswerVideo ${key}`);
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
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };
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
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };
  renderNumberOnlyCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: '+ 1 408-555-1212', type: 'number'}}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };
  renderCallerWithDevices = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        devices={this.state.devices}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };
  render() {
    return (
      <section>
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
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderNumberOnlyCaller()]
                }));
              }}
              children='Number Only Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderCallerWithDevices()]
                }));
              }}
              children='Caller with Device List'
              color='primary'
            />
          </div>
          <br />
          <AlertCallContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}