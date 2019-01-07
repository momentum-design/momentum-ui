const path = require('path');
const { readFileSync } = require('fs');
const markdown = require('remark-parse');
const unified = require('unified');
const gitUrlParse = require('git-url-parse');
const { default: fetch } = require('node-fetch');
const cwd = process.cwd();
const packageFile = path.resolve(cwd, 'package.json');
const { name, repository } = require(packageFile);
const { full_name } = gitUrlParse(repository.url);
const releasesApi = `https://api.github.com/repos/${full_name}/releases`;
const releasesUrl = `https://github.com/${full_name}/releases`;
const GH_TOKEN = process.env.GH_TOKEN;
const webexTeams = require('ciscospark');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const releaseDate = `${year}-${month}-${day}`;


async function postPublish() {
  const changelog = readFileSync(path.resolve(cwd, 'CHANGELOG.md'), { encoding: 'utf8' });
  const releases = getReleasesFromChangelog(changelog);
  const unpublishedReleases = await getUnpublishedReleases(releases);

  return await Promise.all([publishReleasesToGithub(unpublishedReleases), sendMessageToTeams(unpublishedReleases)]);
}

function getReleasesFromChangelog(changelog) {
  const changelogLines = changelog.split('\n');
  const processor = unified().use(markdown, { commonmark: true });
  const mdAST = processor.parse(changelog).children;
  return mdAST
    .filter(heading => heading.type === 'heading' && (heading.children[0].type === 'link' || /[0-9]*\.[0-9]*\.[0-9]*/.test(heading.children[0].value)))
    .map(({ children }) => (children[0].children ? children[0].children[0] : children[0]))
    .map((heading, index, array) => ({
      version: `${name}@${heading.value.split(' ')[0]}`,
      content: changelogLines.slice(heading.position.start.line, index + 1 < array.length ? array[index + 1].position.start.line - 2 : undefined),
    }));
}

async function getUnpublishedReleases(releases) {
  const responses = await Promise.all(
    releases.map(async release => {
      const { ok } = await fetch(`${releasesApi}/tags/${release.version}`, {
        headers: {
          Authorization: ` token ${GH_TOKEN}`,
        },
      });
      return {
        release,
        ok,
      };
    })
  );
  return responses.filter(({ ok }) => !ok).map(({ release }) => release);
}

async function sendMessageToTeams(releases) {
  const spaceId = process.env.WEBEXTEAMS_SPACE_ID;
  const wtToken = process.env.WEBEXTEAMS_ACCESS_TOKEN;

  const teams = webexTeams.init({
    credentials: {
      authorization: {
        access_token: wtToken,
      },
    },
  });

  return await Promise.all(
    releases.map(release => {
      const { content, version } = release;
      const messageVersion = version.replace(`${name}@` , 'v');
      const encodedVersion = encodeURIComponent(version);
      const teamsMessage = `# ${name} \n` +
        `## [${messageVersion}](${releasesUrl}/tags/${encodedVersion}) (${releaseDate}) \n` +
        `${content.join('\n')}`;

      return teams.messages.create({
        markdown: teamsMessage,
        roomId: spaceId,
      });
    })
  );
}

async function publishReleasesToGithub(releases) {
  return (await Promise.all(
    releases.map(release =>
      fetch(releasesApi, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GH_TOKEN}`,
        },
        body: JSON.stringify({
          tag_name: release.version,
          name: release.version,
          body: release.content.join('\n'),
        }),
      })
    )
  )).forEach(res => console.log(res));
}

postPublish();
