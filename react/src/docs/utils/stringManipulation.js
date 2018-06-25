import { startCase, toLower} from 'lodash';

export const mkTitleCase = str => startCase(toLower(str));

export const rmWhiteSpace = str => str.replace(/\s/g, '');

export const rmDash = str => str.replace(/-/g, '');
