#!/usr/bin/env sh

echo "registry ${NPM_REGISTRY_URL}" > "${MS_HOME}/.yarnrc"
echo "_auth ${NPM_REGISTRY_TOKEN}" >> "${MS_HOME}/.yarnrc"