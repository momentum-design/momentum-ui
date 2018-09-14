#!/usr/bin/env bash
set -e

# Where webpack is going to stick the compiled files.
BUILD_FOLDER=dist

# S3 Configuration
S3_FLAGS="--region $AWS_S3_REGION --acl public-read --delete"

# Sync
aws s3 sync $BUILD_FOLDER $AWS_S3_BUCKET $S3_FLAGS

#Invalidate cache
aws cloudfront create-invalidation --distribution-id $AWS_DISTRIBUTION_ID --paths "/*"
