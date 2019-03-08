
# Contributing

We'd love for you to contribute to our source code and to make Colla b UI even better than it is today! Below are the guidelines to follow.

## Table of Contents

- [Questions, Issues or Ideas](#question)
  - [Issues](#issue)
  - [Features](#feature)
- [Requirements](#requirements)
- [Development Environment](#environment)
- [Commit Guidelines](#commit)
- [Submitting a Code Review](#code-review)

## <a name="question"></a> Got a Question, Issue or Idea?

If you have questions about how to use a component or element in Collab-UI, please look through the documentation first. If you still need help, please direct your questions to the Toolkit Q&A Webex Teams space. [Request an Invite to the Teams space](mailto:toolkit-info@cisco.com?subject=CollabUI%20Q%26A%20Webex%20Teams%20space&body=Please%20add%20me%20to%20the%20CollabUI%20Q%26A%20Webex%20Teams%20space)

### <a name="issue"></a> Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository](https://github.com/collab-ui/collab-ui/issues).  Even better you can submit a Pull Request
with a fix.

### Guidelines to report an Issue

Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues. Please provide the following information to increase the chances of your issue being dealt with quickly:

*   **Overview of the Issue** - Explain what issue you are seeing and attach a screenshot if possible.
*   **Motivation for or Use Case** - Explain why this is a bug
*   **Collab-UI Version(s)** - What library(ies) and version(s) are you using?
*   **Browsers and Operating System** - Which browsers did you find the problem on?
*   **Reproduce the Error** - Provide a live example (using [CodeSandbox](https://codesandbox.io/) or [StackBlitz](https://stackblitz.com/)) or a unambiguous set of steps.
*   **Related Issues** - Has a similar issue been reported before?
*   **Suggest a Fix** - If you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)


### <a name="feature"></a> Want a Feature?

You can request a new feature by requesting it in our [Toolkit Q&A Webex Teams space](mailto:toolkit-info@cisco.com?subject=CollabUI%20Q%26A%20Webex%20Teams%20space&body=Please%20add%20me%20to%20the%20CollabUI%20Q%26A%20Webex%20Teams%20space). If you would like to implement a new feature then consider what kind of change it is:

*   **Major Changes** that you wish to contribute to the project should be discussed first in our [Toolkit Q&A Webex Teams space](mailto:toolkit-info@cisco.com?subject=CollabUI%20Q%26A%20Webex%20Teams%20space&body=Please%20add%20me%20to%20the%20CollabUI%20Q%26A%20Webex%20Teams%20space) so that we can better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
*   **Small Changes** can be crafted and submitted to our [GitHub Repository](https://github.com/collab-ui/collab-ui-angular/pulls) as a Pull Request.

## <a name="requirements"></a> Requirements

To contribute to @collab-ui, you need to have [>=Node 8.10.0](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed globally on your machine.

## <a name="environment"></a> Setting Up Your Local Development Environment

### Setup your repository
* `git clone git@github.com:collab-ui/collab-ui.git`
* `origin` should be the above collab-ui repo  (`git remote -v` to see remote details)
* You should work from a fork of the project.  From the GitHub repository, click on the Fork button on the upper right-hand side to fork.
* Add the fork as a remote to the project:  `git remote add <username> https://github.com/<username>/collab-ui.git`  (replace <username> with your username)

### Installing the project

*   install node.js version &gt;=v 8.0.0: [http://nodejs.org/download/](http://nodejs.org/download/)
*   install [Yarn](https://yarnpkg.com/en/) globally if you do not already have it on your machine: `npm install yarn -g`
*   Run package managers in the cloned project to pull dependencies: `yarn install && yarn bootstrap`

### Libraries

Check out the individual CONTRIBUTING docs for the library that you wish to contribute to for library specific instructions:
- [@collab-ui/core](/core/CONTRIBUTING.md)
- [@collab-ui/react](/react/CONTRIBUTING.md)
- [@collab-ui/angular](/angular/CONTRIBUTING.md)



## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Angular change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

Footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update change log to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **chore**: Other changes that don't modify `src` or `test` files

### Scope
The scope could be anything specifying place of the commit change. For example
`Compiler`, `ElementInjector`, etc.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

**Referencing issues** Closed bugs should be listed on a separate line in the footer prefixed with "Closes" keyword like this:

`Closes #234`

or in case of multiple issues:

`Closes #123, Closes #245, Closes #992`

## <a name="code-review"></a> Submitting a Code Review

*   Before pushing to a PR, always use `git pull --rebase`
*   After git pulls, run `yarn bootstrap:clean` at the repo root (collab-ui) to make sure to pull new dependencies.
(For setting up your [local environment, see above](#environment).)

Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/collab-ui/collab-ui-angular/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit-message-format). Adherence to the [commit message conventions](#commit-message-format)
  is required because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Build your changes locally to ensure all the tests pass:

    ```shell
    yarn build
    ```

* Push your branch to GitHub:

    ```shell
    git push <username> my-fix-branch
    ```

* In GitHub, send a pull request to `collab-ui/collab-ui:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the @collab-ui test suite to ensure tests are still passing.
  * Commit your changes to your branch (e.g. `my-fix-branch`).
  * Push the changes to your GitHub repository (this will update your Pull Request).

* If the PR gets too outdated we may ask you to rebase and force push to update the PR:

    ```shell
    git rebase master -i
    git push <username> my-fix-branch -f
    ```

*WARNING. Squashing or reverting commits and forced push thereafter may remove GitHub comments
on code that were previously made by you and others in your commits.*

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push <username> --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```




