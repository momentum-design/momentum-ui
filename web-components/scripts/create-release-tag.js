/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Creates and pushes a Git tag based on the current package.json version
 * This script should be run after publishing to NPM to mark the exact commit
 * that corresponds to the published version.
 */
function createReleaseTag() {
  try {
    // Read version and name from package.json
    const packageJsonPath = path.join(__dirname, "../package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const version = packageJson.version;
    const packageName = packageJson.name;
    const tagName = `${packageName}@${version}`;

    console.log(`\nPackage: ${packageName}`);
    console.log(`Version: ${version}`);
    console.log(`Creating tag: ${tagName}...\n`);

    // Check if tag already exists locally
    try {
      execSync(`git rev-parse ${tagName}`, { stdio: "pipe" });
      console.log(`Tag ${tagName} already exists locally.`);
      console.log("To recreate the tag, delete it first with: git tag -d " + tagName);
      process.exit(1);
    } catch (_error) {
      // Tag doesn't exist, continue
    }

    // Create annotated tag
    execSync(`git tag -a ${tagName} -m "${tagName}"`, { stdio: "inherit" });
    console.log(`Created tag ${tagName}`);

    // Push tag to remote
    console.log(`\nPushing tag to remote...`);
    execSync(`git push origin ${tagName}`, { stdio: "inherit" });

    console.log(`\nSuccessfully created and pushed tag ${tagName}`);
    console.log(`\nYou can now:`);
    console.log(`   - View the tag: git show ${tagName}`);
    console.log(`   - Create a branch from it: git checkout -b branch-name ${tagName}`);
    console.log(`   - View on GitHub: https://github.com/momentum-design/momentum-ui/releases/tag/${tagName}\n`);
  } catch (error) {
    console.error("\nFailed to create release tag:", error.message);
    console.error("\nPossible issues:");
    console.error("  - Not in a Git repository");
    console.error("  - No Git remote configured");
    console.error("  - Authentication required for push");
    console.error("  - Tag already exists on remote\n");
    process.exit(1);
  }
}

createReleaseTag();
