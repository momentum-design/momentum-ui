import _ from 'lodash';

export const mkTitleCase = str => _.startCase(_.toLower(str));

export const rmWhiteSpace = str => str.replace(/\s/g, '');

export const rmDash = str => str.replace(/-/g, '');
