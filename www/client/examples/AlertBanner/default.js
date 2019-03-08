import React from 'react';
import { AlertBanner, Button } from '@collab-ui/react';
export default class AlertBannerDefault extends React.PureComponent {
  state = {
    showAlert1: true,
  }
  render() {
    return (
     <div>
       <div>
         <AlertBanner
           show={this.state.showAlert1}
           closable
           onHide={() => this.setState({showAlert1: false})}
         >
           Default Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Default Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Default Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}