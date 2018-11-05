import React from 'react';
import { AlertBanner, Button } from '@collab-ui/react';
export default class AlertBannerWarning extends React.PureComponent {
  state = {
    showAlert1: true
  }
  render() {
    return (
     <div>
       <div>
         <AlertBanner
           show={this.state.showAlert1}
           closable
           onHide={() => this.setState({showAlert1: false})}
           type='warning'
         >
           Warning Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Warning Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Warning Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}