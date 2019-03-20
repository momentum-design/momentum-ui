import React from 'react';
import PropTypes from 'prop-types';

class IconProperties extends React.Component {
  render() {
    const {
      onSelect,
      selectedValue,
      type,
      values,
    } = this.props;

    return values.reduce((agg, value, idx) => {
      if (type === 'color') {
        return value == selectedValue
          ? agg.concat([
            <button
              className={`cui-button--none icon__swatch icon__swatch--${value} selected`}
              key={`value-${idx}`} />
            ])
          : agg.concat([
            <button 
              className={`cui-button--none icon__swatch icon__swatch--${value}`}
              tabIndex={0}
              onClick={() => onSelect(value)}
              key={`value-${idx}-1`} />
            ]);
      } else {
        const addComma = idx !== values.length - 1 && <span key={`value-${idx}-0`}>, </span>;
        return value == selectedValue
          ? agg.concat([<span key={`value-${idx}`}>{value}</span>, addComma])
          : agg.concat([
              <button 
                className="cui-button--none cui-link cui-link--blue"
                tabIndex={0}
                onClick={() => onSelect(value)}
                key={`value-${idx}-1`}
              >
                {value}
              </button>,
              addComma,
            ]);
      }
    }, []);
  }
}

IconProperties.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  type: PropTypes.string,
  values: PropTypes.array.isRequired,
};

IconProperties.defaultProps = {
  type: '',
};

IconProperties.displayName = 'IconProperties';

export default IconProperties;