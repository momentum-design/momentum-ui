#!/bin/bash
set -e

root=$(pwd)
changed=$( lerna changed -p --toposort -l)

lerna version --no-push --yes

for i in $changed;
do
echo $i
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  npm publish
done

git add .
git commit --amend --no-edit

git push --follow-tags

for i in $changed;
do
  directory="$(echo $i | cut -d':' -f1)"
  cd $directory
  yarn ci:postpublish
done
