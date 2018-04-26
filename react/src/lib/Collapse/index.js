import React from 'react';
import PropTypes from 'prop-types';

/**
 * Collapse is component for rendering dropdown menu
 * @param props
 * @returns {XML}
 * @constructor
 */

export default class Collapse extends React.Component {
  static displayName = 'Collapse';

  state = {
    dropdownClass: '',
  };

  componentDidUpdate(nextProps) {
    window.requestAnimationFrame(() => {
      return this.props.isOpen !== nextProps.isOpen && nextProps.isOpen
        ? this.setState({
            dropdownClass: 'in',
          })
        : this.setState({ dropdownClass: '' });
    });
  }

  render() {
    const { isOpen, children } = this.props;
    const { dropdownClass } = this.state;

    const changeHeight = isOpen ? { height: 'auto' } : { height: '0px' };

    return (
      <div>
        <hr />
        <collapse
          className={`collapse` + `${dropdownClass}`}
          aria-expanded={isOpen}
          aria-hidden={!isOpen}
          style={changeHeight}
        >
          <div className="well well-lg">{children}</div>
        </collapse>
      </div>
    );
  }
}

Collapse.defaultProps = {
  children: null,
  isOpen: false,
};

Collapse.propTypes = {
  // show/hide modal.
  isOpen: PropTypes.bool.isRequired,
  // Children components
  children: PropTypes.node,
};

// export default Collapse;

/**
* @name Collapse
* @description Default Collapse
* @category containers
* @component collapse
* @section default
*
* @js
import { Button } from '@collab-ui/react';

export default class Collapse extends React.PureComponent {
  state = {
    showCollapseBody: true,
  }

  render() {
    return (
     <div>
       <div>
         <Collapse
           show={this.state.showCollapseBody}
         >
           <div>Test</div>
         </Collapse>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             label='Toggle Collapse'
             onClick={() => this.setState({showCollapseBody: !this.state.showCollapseBody})}
             ariaLabel='Toggle Collapse'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}
**/
