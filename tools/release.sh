#!/bin/bash
set -e

root=$(pwd)
changed=$( lerna changed -p --toposort -l)

if [ $? -eq 1 ]
then
  echo "No changed packages found"
  exit 0
else

  lerna version --no-git-tag-version --yes --conventional-prerelease=vue,charts

  echo "Publish changed packages"

  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory
    echo $directory

    if [[ $directory == *"angular/src/lib" ]]; then
      cd ../../
      yarn prepublishOnly
      cd ./dist/\@momentum-ui/angular
      npx publish
    else
      yarn prepublishOnly
      npx publish
    fi
  done

  commitMessage=""
  tags=""

  # Create commit message
  for i in $changed;
  do
    directory="$(echo $i | cut -d':' -f1)"
    cd $directory

    if [[ $directory == *"angular/src/lib" ]]; then
      cd ../../dist/\@momentum-ui/angular
    fi

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
  git push origin master --follow-tags

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
    if [[ $directory == *"angular/src/lib" ]]; then
      cd ../../
    fi
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
