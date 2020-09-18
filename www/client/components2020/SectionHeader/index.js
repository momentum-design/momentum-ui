import React from 'react';
import PropTypes from 'prop-types';

class SectionHeader extends React.PureComponent {
  render () {
    const {
      className,
      darkTheme,
      title,
      leadStr,
      leadElm
    } = this.props;

    return (
      <div className={'site-responsive-row section-header' + (darkTheme ? ' section-header-dark' : '') + (className ? ' ' + className : '')}>
        <div className='section-header__title'>
          <h1>{title}</h1>
        </div>
        <div className='section-header__lead'>
          {leadStr && (
            <p>{leadStr}</p>
          )}
          {leadElm && leadElm}
        </div>
      </div>
    );
  }
}

SectionHeader.defaultProps = {
  className: '',
  darkTheme: false,
  title: '',
  leadElm: null,
  leadStr: '',
};

SectionHeader.propTypes = {
  /** @prop Use dark css themes | '' */
  className: PropTypes.string,
  /** @prop Use dark css themes | false */
  darkTheme: PropTypes.bool,
  /** @prop Title to show | '' */
  title: PropTypes.string,
  /** @prop Lead text to show | '' */
  leadStr: PropTypes.string,
  /** @prop Lead text to show | '' */
  leadElm: PropTypes.element,
};

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;