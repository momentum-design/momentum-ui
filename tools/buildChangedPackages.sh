#!/bin/bash
set -euo pipefail

base_ref="${BUILD_BASE_REF:-}"

if [ -z "$base_ref" ]; then
  if [ "${CIRCLE_BRANCH:-}" = "main" ] && git rev-parse --verify HEAD^ >/dev/null 2>&1; then
    base_ref="HEAD^"
  elif git rev-parse --verify origin/main >/dev/null 2>&1; then
    base_ref="$(git merge-base origin/main HEAD || true)"
  elif git rev-parse --verify HEAD^ >/dev/null 2>&1; then
    base_ref="HEAD^"
  fi
fi

if [ -z "$base_ref" ]; then
  echo "No comparison commit is available; building all legacy packages."
  yarn lerna run build:lib --concurrency 1
  exit 0
fi

changed_files="$(git diff --name-only "$base_ref" HEAD)"

if [ -z "$changed_files" ]; then
  echo "No files changed since $base_ref; skipping legacy package builds."
  exit 0
fi

build_all=false
while IFS= read -r changed_file; do
  case "$changed_file" in
    .circleci/*|.nvmrc|lerna.json|package.json|yarn.lock|tools/*)
      build_all=true
      break
      ;;
  esac
done <<< "$changed_files"

if [ "$build_all" = true ]; then
  echo "Shared build infrastructure changed; building all legacy packages."
  yarn lerna run build:lib --concurrency 1
  exit 0
fi

package_dirs=(charts core icons icons-rebrand react tokens utils)
lerna_args=(lerna run build:lib --concurrency 1)
affected_packages=()

for package_dir in "${package_dirs[@]}"; do
  if grep -q "^${package_dir}/" <<< "$changed_files"; then
    package_name="$(node -p "require('./${package_dir}/package.json').name")"
    lerna_args+=(--scope "$package_name")
    affected_packages+=("$package_name")
  fi
done

if [ "${#affected_packages[@]}" -eq 0 ]; then
  echo "No buildable legacy packages changed; skipping legacy package builds."
  exit 0
fi

echo "Building changed packages and their dependencies/dependents: ${affected_packages[*]}"
lerna_args+=(--include-dependencies --include-dependents)
yarn "${lerna_args[@]}"
