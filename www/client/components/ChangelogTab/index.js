import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

class ChangelogTab extends React.PureComponent {
  render() {
    const { content } = this.props;

    let renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
      if (level <= 2) {
        const regexVersion = /(\d+)\.(\d+)\.(\d+)/g;
        const regexDate = /(\d{4})-(\d{1,2})-(\d{1,2})/g;
        const regexDateWithBrackets = /\((\d{4})-(\d{1,2})-(\d{1,2})\)/g;

        const matchVersion = text.match(regexVersion);
        const matchDate = text.match(regexDate);

        if (matchVersion) {
          const date = matchDate[0];

          return (
            `<h1>
              ${text.replace(regexDateWithBrackets, '')}
            </h1>
            <div class="docs-changelog__date"/>
              ${date}
            </div>`
          );
        } else {
          return (
            `<h${level}>
              ${text}
            </h${level}>`
          );
        }
      } else if (level == 3) {
        return (
          `<h${level} 
            class="docs-changelog__type--${
              text
              .toLowerCase()
              .replace(/[^\w]+/g, '-')
            }"
          >
            ${text}
          </h${level}>`
        );
      } else {
        return (
          `<h${level}>
            ${text}
          </h${level}>`
        );
      }
    };

    const html = marked(content, { renderer: renderer });

    return (
      /* eslint-disable react/no-danger */
      <div
        className="docs-content__column docs-changelog"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      /* eslint-enable react/no-danger */
    );
  }
}

ChangelogTab.propTypes = {
  content: PropTypes.string,
};

ChangelogTab.defaultProps = {
  content: '',
};

ChangelogTab.displayName = 'ChangelogTab';

export default ChangelogTab;