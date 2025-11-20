# Publishing @momentum-ui/web-components

This document describes how to publish a new version of the `@momentum-ui/web-components` package to npm.

## Prerequisites

- Ensure you have write access to the GitHub repository
- All changes are merged to the `main` branch
- Version number is updated in `package.json`

## Publishing Process

### 1. Update Version

Update the version in `web-components/package.json` (example shows next patch version at time of writing):

```json
{
  "version": "2.26.14"
}
```

Commit and push the version change to `main`.

### 2. Run the Publish Workflow

The publish workflow must be **manually triggered** from GitHub:

1. Go to the [Actions tab](https://github.com/momentum-design/momentum-ui/actions)
2. Select **"Publish Web Components"** workflow
3. Click **"Run workflow"**
4. Select the `main` branch
5. Click **"Run workflow"** button

### 3. What Happens

The workflow will:

1. **Build** the project (`yarn dist`)
2. **Create package** in `./publish` directory
3. **Publish to npm** (https://www.npmjs.com/package/@momentum-ui/web-components)
4. **Create and push a git tag** (format: `@momentum-ui/web-components@{version}`)

### 4. Verify Publication

- Check npm: https://www.npmjs.com/package/@momentum-ui/web-components
- Verify the git tag was created:
  ```bash
  git pull --tags
  git tag -l "@momentum-ui/web-components@*"
  ```

## Hotfix Releases

To create a hotfix from a previous release:

```bash
# Create a hotfix branch from the tag
git checkout -b hotfix/2.26.14 @momentum-ui/web-components@2.26.13

# Make your fixes and update version
# Then push and run the workflow
```

## Troubleshooting

### Workflow fails to publish

- Check that the version doesn't already exist on npm
- Ensure the git tag doesn't already exist

### Tag already exists

If the tag already exists locally or remotely, delete it first:

```bash
# Delete local tag
git tag -d @momentum-ui/web-components@2.26.14

# Delete remote tag
git push --delete origin @momentum-ui/web-components@2.26.14
```
