require('dotenv').config();
const WP_URL = process.env.WP_URL || 'https://wp.momentum.design';
const GITHUB_CONTENT_URL = process.env.GITHUB_CONTENT_URL || 'https://raw.githubusercontent.com/momentum-design';

const CHANGE_LOG_URLS = {
  'momentum-ui-icons':`${GITHUB_CONTENT_URL}/momentum-ui/master/icons/CHANGELOG.md`,
  'momentum-ui-core':`${GITHUB_CONTENT_URL}/momentum-ui/master/core/CHANGELOG.md`,
  'momentum-ui-react':`${GITHUB_CONTENT_URL}/momentum-ui/master/react/CHANGELOG.md`,
  'momentum-ui-angular':`${GITHUB_CONTENT_URL}/momentum-ui/master/angular/CHANGELOG.md`
};

const COMPONENT_LIST_URLS = {
  'core':`${GITHUB_CONTENT_URL}/momentum-ui/master/core/data/components.json`,
  'react':`${GITHUB_CONTENT_URL}/momentum-ui/master/react/src/app/ComponentList.js`,
  'angular':`${GITHUB_CONTENT_URL}/momentum-ui/master/angular/src/lib/public_api.ts`,
  'vue':`${GITHUB_CONTENT_URL}/momentum-ui/master/vue/components.json`
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
  CHANGE_LOG_URLS: CHANGE_LOG_URLS,
  COMPONENT_LIST_URLS: COMPONENT_LIST_URLS
};

export default config;
