import React from 'react';
import PropTypes from 'prop-types';
import comingSoon from '../../assets/coming-soon.jpg';
import PageHeader from '../../collab-ui/PageHeader';
import { Spinner } from '@collab-ui/react';
import DesignTab from '../../components/DesignTab';
import Media from 'react-media';

class ContentPage extends React.Component {
  render() {
    const {
      data
    } = this.props;

    const getContent = () => {
      /* eslint-disable react/no-danger */
      if (data.style || data.usage) {
        return (
          <div className="docs-content-area docs-content-area--with-pagenav">
            <DesignTab {...this.props} sections={data.style || data.usage} />
          </div>
          );
      } else if (data.content) {
        return (
          <div className="docs-content__column row">
            <div className="medium-11 columns medium-offset-1" dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        );
      } else return <img src={comingSoon} alt="Coming Soon" />;
      /* eslint-enable react/no-danger */
    };

    return (
      <React.Fragment>
        { data.displayName && (
          <Media query="(min-width: 1025px)">
            {isDesktop => <PageHeader title={data.displayName} lead={data.description} textAlign="left" collapse={isDesktop} />}
            </Media>
        )}
        <div className="docs-content-area">
        {data.loading
          ? <Spinner />
          : getContent()}
        </div>
      </React.Fragment>
    );
  }
}

ContentPage.propTypes = {
  data: PropTypes.object.isRequired,
};

ContentPage.displayName = 'ContentPage';

export default ContentPage;
