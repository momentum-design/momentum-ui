require('dotenv').config();
const WP_URL = process.env.WP_URL || 'https://wp.momentum.design';
const CHANGE_LOG_URL = process.env.CHANGE_LOG_URL || 'https://raw.githubusercontent.com/momentum-design';

const CHANGE_LOG_URLS = {
  'momentum-ui-icons':`${CHANGE_LOG_URL}/momentum-ui/master/icons/CHANGELOG.md`,
  'momentum-ui-core':`${CHANGE_LOG_URL}/momentum-ui/master/core/CHANGELOG.md`,
  'momentum-ui-react':`${CHANGE_LOG_URL}/momentum-ui/master/react/CHANGELOG.md`,
  'momentum-ui-angular':`${CHANGE_LOG_URL}/momentum-ui/master/angular/CHANGELOG.md`
};

const config = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collabui',
  PORT: process.env.PORT || 3300,
  WP_URL: WP_URL,
  WP_OAUTH_URL: `${WP_URL}/?oauth=token`,
  WP_CONTENT_URL: `${WP_URL}/wp-json/wp/v2/pages`,
  WP_PAGES_URL: `${WP_URL}/wp-json/wp-api-pages/v2/pages`,
  WP_MENUS_URL: `${WP_URL}/wp-json/wp-api-menus/v2/menus`,
  WP_FORMS_URL: `${WP_URL}/wp-json/gf/v2`,
  WP_CHILD_PAGES_URL: `${WP_URL}/wp-json/wp-api-child-pages/v2/child-pages`,
  VARIATIONS: ['core', 'react', 'angular', 'angularjs'],
  WP_CLIENT_ID: process.env.WP_CLIENT_ID,
  WP_CLIENT_SECRET: process.env.WP_CLIENT_SECRET,
  CHANGE_LOG_URLS:CHANGE_LOG_URLS
};

export default config;
