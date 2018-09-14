import React from 'react';
import colors from '@collab-ui/core/data/colors';

export default class Colors extends React.PureComponent {
  render() {
    const getBackgroundColor = (color, chip) => {
      const rgb = color.name === 'black' ? '0,0,0' : '255,255,255';
      const opacity = chip.opacity / 100;

      return `rgba(${rgb},${opacity})`;
    };

    const paintChips = (color, idx) => {
      const isBW = color.name === 'black' || color.name === 'white';

      return (
        <div
          key={`paintChips-${idx}`}
          className="paint-chip-group medium-6 large-4 xlarge-3 columns end">
          {
            <div
              className={
                `paint-chips` +
                `${(color.text === 'dark' && ' paint-chips--light') || ''}` +
                `${(isBW && color.opacity && ' paint-chips--opacity') || ''}`
              }
              style={!isBW ? { backgroundColor: color.variations[0].hex } : {}}>
              <h2
                className="paint-chips__name"
                style={isBW ? { backgroundColor: color.name } : {}}>
                {color.name}
              </h2>
              {color.variations.map((chip, idx2) => {
                return paintChip(color, chip, idx2, isBW);
              })}
            </div>
          }
        </div>
      );
    };

    const paintChip = (color, chip, idx, isBW) => {
      return (
        <div
          key={`paintChips-${idx}`}
          className={
            `paint-chip` +
            `${(chip.text === 'dark' && ' paint-chip--light') || ''}`
          }
          style={
            isBW
              ? { backgroundColor: getBackgroundColor(color, chip) }
              : { backgroundColor: chip.hex }
          }>
          <span className="paint-chip__variable">{chip.variable}</span>
          {chip.hex && <span className="paint-chip__hex">{chip.hex}</span>}
          {chip.opacity && (
            <span className="paint-chip__opacity">
              {isBW ? `opacity: ${chip.opacity}%` : chip.opacity}
            </span>
          )}
        </div>
      );
    };

    return (
      <div className="row" style={{display: 'flex', flexWrap: 'wrap'}}>
        {colors.map((color, idx) => {
          return paintChips(color, idx);
        })}
      </div>
    );
  }
}
