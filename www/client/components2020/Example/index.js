import React from 'react';
import PropTypes from 'prop-types';

class Example extends React.PureComponent {

  render() {
    const {
      children,
      className,
      innerPadding,
      smallBlockSize,
      subtitle,
    } = this.props;

    return (
      <div className={"example-container" + (className && ' ' + className)}>
        <div
          className={
            "example-container-banner"
            + (smallBlockSize ? " example-container-banner-small" : "")
          }
          style={{padding: innerPadding}}
        >
          {/* <div> */}
          {children}
          {/* </div> */}
        </div>
        { subtitle && <p className="example-container-subtitle">{subtitle}</p> }
      </div>
    );
  }

}

Example.defaultProps = {
  children: null,
  className: '',
  innerPadding: '',
  smallBlockSize: false,
  subtitle: '',
};

Example.propTypes = {
  /** @prop The example content | null */
  children: PropTypes.node,
  /** @prop Optional custom class for the example container | '' */
  className: PropTypes.string,
  /** @prop Optional inner padding of the block container | '' */
  innerPadding: PropTypes.string,
  /** @prop Optional bool to use a smaller block height (420px) | false */
  smallBlockSize: PropTypes.bool,
  /** @prop Optional example subtitle to display below the block | null */
  subtitle: PropTypes.string,
};

Example.displayName = 'Example';

export default Example;
