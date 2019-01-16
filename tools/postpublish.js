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
const GH_TOKEN = process.env.GITHUB_API_TOKEN;
const webexTeams = require('ciscospark');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const releaseDate = `${year}-${month}-${day}`;

async function postPublish() {
  const changelog = readFileSync(path.resolve(cwd, 'CHANGELOG.md'), { encoding: 'utf8' });
  const release = getReleaseFromChangelog(changelog);
  const unpublishedRelease = await getUnpublishedRelease(release);

  if (!unpublishedRelease.isReleased) {
    return await Promise.all([publishReleaseToGithub(unpublishedRelease.release), sendMessageToTeams(unpublishedRelease.release)]);
  }
}

function getReleaseFromChangelog(changelog) {
  const changelogLines = changelog.split('\n');
  const processor = unified().use(markdown, { commonmark: true });
  const mdAST = processor.parse(changelog).children;
  return mdAST
    .filter(heading => heading.type === 'heading' && (heading.children[0].type === 'link' || /[0-9]*\.[0-9]*\.[0-9]*/.test(heading.children[0].value)))
    .map(({ children }) => (children[0].children ? children[0].children[0] : children[0]))
    .map((heading, index, array) => ({
      version: `${name}@${heading.value.split(' ')[0]}`,
      content: changelogLines.slice(heading.position.start.line, index + 1 < array.length ? array[index + 1].position.start.line - 2 : undefined),
    }))[0];
}

async function getUnpublishedRelease(release) {
  const res = await fetch(`${releasesApi}/tags/${release.version}`, {
    headers: {
      Authorization: ` token ${GH_TOKEN}`,
    },
  });
  return {
    release,
    isReleased: res.ok
  }
}

async function sendMessageToTeams(release) {
  const spaceId = process.env.WEBEXTEAMS_SPACE_ID;
  const wtToken = process.env.WEBEXTEAMS_ACCESS_TOKEN;

  const teams = webexTeams.init({
    credentials: {
      authorization: {
        access_token: wtToken,
      },
    },
  });

  const { content, version } = release;
  const messageVersion = version.replace(`${name}@`, 'v');
  const encodedVersion = encodeURIComponent(version);
  const teamsMessage = `# ${name} \n` + `## [${messageVersion}](${releasesUrl}/tags/${encodedVersion}) (${releaseDate}) \n` + `${content.join('\n')}`;

  return teams.messages.create({
    markdown: teamsMessage,
    roomId: spaceId,
  });
}

async function publishReleaseToGithub(release) {
  return fetch(releasesApi, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
    },
    body: JSON.stringify({
      tag_name: release.version,
      name: release.version,
      body: release.content.join('\n'),
    }),
  });
}

postPublish();
