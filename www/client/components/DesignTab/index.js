import React from 'react';
import PropTypes from 'prop-types';
import DesignSection from '../DesignSection';
import PageLinks from '../../momentum-ui/PageLinks';
import Media from 'react-media';

class DesignTab extends React.PureComponent {
  static displayName = 'DesignTab';

  render() {
    const { sections } = this.props;

    return (
      <React.Fragment>
        <div className="docs-content__column row">
          {
            sections
            && sections.map((section, idx) => (
              <DesignSection section={section} key={`${section}-${idx}`} />
            ))
            || 'Coming Soon'
          }
        </div>
        <Media
          query="(min-width: 1025px)"
          render={() => (
            <div className="docs-content__nav">
              <PageLinks links={sections} />
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

DesignTab.propTypes = {
  sections: PropTypes.array,
};

export default DesignTab;
