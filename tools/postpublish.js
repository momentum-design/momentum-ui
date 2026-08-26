const path = require('path');
const { readFileSync } = require('fs');
const cwd = process.cwd();
const packageFile = path.resolve(cwd, 'package.json');
const { name, repository } = require(packageFile);
const repositoryUrl = typeof repository === 'string' ? repository : repository.url;
const repositoryMatch = repositoryUrl.match(/github\.com[/:]([^/]+)\/([^/#]+?)(?:\.git)?$/);
if (!repositoryMatch) {
  throw new Error(`Unsupported GitHub repository URL: ${repositoryUrl}`);
}
const fullName = `${repositoryMatch[1]}/${repositoryMatch[2]}`;
const releasesApi = `https://api.github.com/repos/${fullName}/releases`;
const releasesUrl = `https://github.com/${fullName}/releases`;
const GH_TOKEN = process.env.GITHUB_API_TOKEN;

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
  const releaseHeadings = changelogLines
    .map((line, index) => ({ index, match: line.match(/^# \[?(\d+\.\d+\.\d+(?:-[^\]\s]+)?)/) }))
    .filter(({ match }) => match);

  if (!releaseHeadings.length) {
    throw new Error(`No release heading found in ${path.resolve(cwd, 'CHANGELOG.md')}`);
  }

  const current = releaseHeadings[0];
  const next = releaseHeadings[1];
  return {
    version: `${name}@${current.match[1]}`,
    content: changelogLines.slice(current.index + 1, next ? next.index : undefined),
  };
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

  const { content, version } = release;
  const messageVersion = version.replace(`${name}@`, 'v');
  const encodedVersion = encodeURIComponent(version);
  const teamsMessage = `# ${name} \n` + `## [${messageVersion}](${releasesUrl}/tags/${encodedVersion}) (${releaseDate}) \n` + `${content.join('\n')}`;

  const response = await fetch('https://webexapis.com/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${wtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ markdown: teamsMessage, roomId: spaceId }),
  });
  if (!response.ok) {
    throw new Error(`Webex message failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

async function publishReleaseToGithub(release) {
  const response = await fetch(releasesApi, {
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
  if (!response.ok) {
    throw new Error(`GitHub release failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

postPublish().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
