import omit from 'lodash/omit';

const prepareCodeSectionsData = async codeComponent => {
  try {
    return omit(codeComponent, ['_id', 'id', 'created_at', 'updated_at', '__v']);
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default prepareCodeSectionsData;
