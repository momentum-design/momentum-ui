import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../momentum-ui/PageHeader';
import OverviewPage from './OverviewPage';
import { fetchPageData } from '../../services/page/actions';
import { connect } from 'react-redux';
import Media from 'react-media';

class OverviewContainer extends React.Component {
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
    const {
      id,
      pageData,
      ...props
    } = this.props;

    return (
      pageData
        && pageData[id]
        && <OverviewPage data={pageData[id]} {...props} />
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

OverviewContainer.propTypes = {
  child: PropTypes.shape({}).isRequired,
  fetchPageData: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  pageData: PropTypes.shape({}),
};

OverviewContainer.defaultProps = {
  pageData: {}
};

export default connect(mapStateToProps, { fetchPageData })(OverviewContainer);
