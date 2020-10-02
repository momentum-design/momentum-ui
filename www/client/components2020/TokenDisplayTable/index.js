import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '../SectionTitle';

class TokenDisplayTable extends React.PureComponent {
  render () {
    const {
      className,
      darkTheme,
      sectionTitleLabel,
      sectionTitleTrailing,
      tableHeaders,
      tableRows,
    } = this.props;

    return (
      <div
        className={
          "token-display-table__container"
          + (darkTheme ? " token-display-table__container-dark" : "")
          + (className ? " " + className : "")
          }
        >
        <SectionTitle
          darkTheme={darkTheme}
          label={sectionTitleLabel}
          trailing={sectionTitleTrailing}
        />
        <div className="token-display-table__table-container">
          <table className="token-display-table">
            <thead className="token-display-table__header">
              <tr className="token-display-table__row">
                {tableHeaders.map((header, index) => (
                  <th key={"header" + String(index)}>
                    <div
                      className={
                        "token-display-table__header-cell"
                        + (darkTheme ? " token-display-table__header-cell-dark" : "")
                        }
                    >
                      {header}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr
                  key={"row" + String(index)}
                  className={
                    "token-display-table__row"
                    + (darkTheme ? " token-display-table__row-dark" : "")
                    }
                >
                  {row.map((rowItem, index) => (
                    <td key={"row-item-" + String(index)}>
                      {rowItem}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TokenDisplayTable.defaultProps = {
  className: '',
  darkTheme: false,
  sectionTitleLabel: '',
  sectionTitleTrailing: null,
  tableHeaders: [],
  tableRows: [],
};

TokenDisplayTable.propTypes = {
  /** @prop Optional custom className | '' */
  className: PropTypes.string,
  /** @prop Use dark css themes | false */
  darkTheme: PropTypes.bool,
  /** @prop The section title | '' */
  sectionTitleLabel: PropTypes.string,
  /** @prop The section title trailing element | null */
  sectionTitleTrailing: PropTypes.object,
  /** @prop Table headers | [] */
  tableHeaders: PropTypes.array,
  /** @prop Table row | [] */
  tableRows: PropTypes.array,
};

TokenDisplayTable.displayName = 'TokenDisplayTable';

export default TokenDisplayTable;