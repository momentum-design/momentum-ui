/**
 * @category communication
 * @component alert-banner
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@collab-ui/react';

const AlertBanner = props => {
  const { show, type, closable, children, onHide } = props;

  const handleKeyPress = e => {
    e.preventDefault();
    if (e.which === 32 || e.which === 13) {
      return onHide(e);
    } else if (e.charCode === 32 || e.charCode === 13) {
      return onHide(e);
    }
  };

  return (
    show && (
      <div type={type}>
        <div className={`cui-alert-banner ` + `cui-alert-banner--${type}`}>
            <div className="cui-alert-banner__text">{children}</div>
          {closable && (
            <div
              className="cui-alert-banner__close"
              onClick={onHide}
              tabIndex={0}
              onKeyPress={handleKeyPress}
              role={'button'}
            >
              <Icon name="cancel_16"/>
            </div>
          )}
        </div>
      </div>
    )
  );
};

AlertBanner.defaultProps = {
  children: null,
  type: 'info',
  closable: false,
  onHide: () => {},
};

AlertBanner.propTypes = {
  /** @prop Set AlertBanner visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: PropTypes.node,
  /** @prop Sets the AlertBanner type | 'info' */
  type: PropTypes.oneOf(['info', 'warning', 'error']),
  /** @prop Mandatory handler invoked when the user presses on the AlertBanner's close button or hit's the esc key | () => {} */
  onHide: PropTypes.func,
  /** @prop Sets the visibility of AlertBanner's close button | false */
  closable: PropTypes.bool,
};

AlertBanner.displayName = 'AlertBanner';

export default AlertBanner;

/**
* @name Information
* @category communication
* @component alert-banner
* @section default
* @description Create info/default AlertBanners by omitting the type prop. To make the AlertBanner closable, use the closable prop.
*
* @js
import { Button } from '@collab-ui/react';

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
**/

/**
* @name Warning
* @category communication
* @component alert-banner
* @section warning
* @description Create warning AlertBanners by setting the "type" prop to type='warning'.
*
* @js
import { Button } from '@collab-ui/react';

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
**/

/**
/**
* @name Error
* @category communication
* @component alert-banner
* @section error
* @description Create error AlertBanners by setting the type prop to type='error'.
*
* @js
import { Button } from '@collab-ui/react';

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
**/
