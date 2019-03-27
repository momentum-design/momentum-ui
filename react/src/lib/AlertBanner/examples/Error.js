import React from 'react';
import { AlertBanner, Button } from '@collab-ui/react';
export default class AlertBannerError extends React.PureComponent {
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
           type='error'
         >
           Error Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Error Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Error Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}