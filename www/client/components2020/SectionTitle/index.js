import React from 'react';
import PropTypes from 'prop-types';

class SectionTitle extends React.PureComponent {
  render () {
    const {
      darkTheme,
      label,
      trailing
    } = this.props;

    return (
      <div className={`section-title ${darkTheme ? "section-title-dark" : ""}`}>
        <div className={`section-title__label ${darkTheme ? "section-title__label-dark" : ""}`}>
          {label}
        </div>
        {
        trailing &&
          <div className="section-title__trailing">
            {trailing}
          </div>
        }
      </div>
    );
  }
}

SectionTitle.defaultProps = {
  darkTheme: false,
  label: '',
  trailing: null,
};

SectionTitle.propTypes = {
  /** @prop Use dark css themes | false */
  darkTheme: PropTypes.bool,
  /** @prop The title to show | '' */
  label: PropTypes.string,
  /** @prop Trailing element to show | null */
  trailing: PropTypes.object,
};

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;