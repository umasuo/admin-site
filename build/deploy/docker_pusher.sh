#! /bin/bash

set -e

echo "============= push docker image ====================================="
echo ${TRAVIS_BRANCH}
echo "====================================================================="
export BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
    echo $TRAVIS_BRANCH; else
    echo $TRAVIS_PULL_REQUEST_BRANCH;
    fi)
echo ${BRANCH}
echo "====================================================================="
if [ "$BRANCH" = "master" ] || [ "$BRANCH" = "dev" ]; then
  docker login --username="$DOCKER_USERNAME" --password="$DOCKER_PASSWORD";
  docker push evacloud/developer-site;
fi
echo "============= end push docker image ================================="
