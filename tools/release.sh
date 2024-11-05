#!/bin/bash
set -e

root=$(pwd)
changed=$( lerna changed -p --toposort -l)

if [ $? -eq 1 ]
then
  echo "No changed packages found"
  exit 0
else

  lerna version --no-git-tag-version --yes --conventional-prerelease=charts

  echo "Publish changed packages"

  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory
    echo $directory

    yarn prepublishOnly
    npx publish
  done

  commitMessage=""
  tags=""

  # Create commit message
  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory

    tagPackage="$(echo $i | cut -d':' -f2)"
    tagVersion=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')
    echo $tagVersion
    tag="$tagPackage@$tagVersion"
    echo $tag
    commitMessage="$commitMessage
    $tag"
    tags="$tags $tag"
  done

  # Create git commit
  git add -A
  git status
  git commit -m "chore(release): [skip ci]" -m "$commitMessage"

  # Push commit to GitHub
  git push origin main --follow-tags

  # Add tags and push to GitHub
  for tag in $tags;
  do
    echo "adding tag $tag"
    git tag $tag -m "$tag"
    git push origin $tag
  done


  # Run CDN Publish scripts
  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory

    yarn ci:publishCDN
  done


  # Run Post Publish scripts
  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory
    yarn ci:postpublish
  done

fi
