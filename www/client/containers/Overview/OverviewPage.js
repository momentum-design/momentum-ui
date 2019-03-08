import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../collab-ui/PageHeader';
import OverviewSection from '../../components/OverviewSection';
import { Spinner } from '@collab-ui/react';
import Media from 'react-media';

class OverviewPage extends React.Component {
  render() {
    const { data, child } = this.props;

    const getSubSections = () => (
      data.children.length > 0
        && data.children.map(subsection => (
          <OverviewSection
            key={`${subsection.id}-${subsection.name}`}
            description={subsection.description}
            title={subsection.displayName}
            link={`${data.name}/${subsection.name}`}
            {...subsection.thumbnailImage
              && {
                image: subsection.thumbnailImage,
                imageDescription: subsection.description,
              }
            }
          />
        ))
    );

    return (
      <React.Fragment>
        <Media query="(min-width: 1025px)">
          {isDesktop => (
              <PageHeader
                title={child.title}
                lead={child.description}
                textAlign="left"
                key='overview-0'
                collapse={isDesktop}
              />
            )
          }
        </Media>
        <div className="docs-content-area" key='overview-1'>
        {
          data.loading
            ? <Spinner />
            : (
              <div className="docs-content__column row">
                <div className="medium-12">
                  <OverviewSection
                    isHeader
                    description={data.description}
                    {...data.thumbnailImage
                      && {
                        image: data.thumbnailImage,
                        imageDescription: data.description,
                      }
                    }
                  />
                  {getSubSections()}
                </div>
              </div>
            )
        }
        </div>
      </React.Fragment>
    );
  }
}

OverviewPage.propTypes = {
  child: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

OverviewPage.displayName = 'OverviewPage';

export default OverviewPage;
