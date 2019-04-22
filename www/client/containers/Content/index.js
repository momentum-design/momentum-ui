import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../../momentum-ui/PageHeader';
import { fetchPageData } from '../../services/page/actions';
import ContentPage from './ContentPage';
import Media from 'react-media';

class ContentPageContainer extends React.Component {
  componentDidMount() {
    const { fetchPageData, id, pageData } = this.props;

    if(!pageData[id]) {
      fetchPageData(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchPageData, id, pageData } = this.props;

    if(prevProps.id !== id && !pageData[id]) {
      fetchPageData(id);
    }
  }

  render() {
    const { id, pageData } = this.props;

    return (
      pageData &&
      pageData[id] &&
      <ContentPage data={pageData[id]} {...this.props} />
      || (
        <Media query="(min-width: 1025px)">
          {isDesktop => <PageHeader textAlign="left" collapse={isDesktop} />}
        </Media>
        )
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.pageReducer.pages
});

ContentPageContainer.propTypes = {
  fetchPageData: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  pageData: PropTypes.shape({}),
};

ContentPageContainer.defaultProps = {
  pageData: {}
};

export default connect(mapStateToProps, { fetchPageData })(ContentPageContainer);
