#!/bin/bash
set -e

root=$(pwd)
changed=$( lerna changed -p --toposort -l)

lerna version --no-push --yes
git status

for i in $changed;
do
echo $i
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  # npm publish
done

git add .
git status
git commit --amend --no-edit
git push origin master --follow-tags
git status

for i in $changed;
do
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  yarn ci:postpublish
done
