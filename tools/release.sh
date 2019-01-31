#!/bin/bash
set -e

root=$(pwd)
changed=$( lerna changed -p --toposort -l)

lerna version --no-git-tag-version --yes
git status

echo "Publish changed packages"

for i in $changed;
do
echo $i
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  npm publish
done

git status

commitMessage=""
tags=""

# Create commit message
for i in $changed;
do
  tagPackage="$(echo $i | cut -d':' -f2)"
  tagVersion="$(echo $i | cut -d':' -f3)"
  tag="$tagPackage@$tagVersion"
  commitMessage="$commitMessage
  $tag"
  tags="$tags $tag"
done

# Create git commit
git add .
git status
git commit -m "chore(release): [skip ci]" -m "$commitMessage"

# Add tags to commit
for tag in $tags;
do
  echo "adding tag $tag"
  git tag $tag
done

# Push commit and tags to GitHub
git push origin master --follow-tags
git status

# Run Post Publish scripts
for i in $changed;
do
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  yarn ci:postpublish
done
