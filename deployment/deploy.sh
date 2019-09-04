#!/usr/bin/env bash
set -e

git clone https://wroclawjug:${github_token}@github.com/wroclawjug/wroclawjug.github.io.git

set -x
cd wroclawjug.github.io
rm -r losowarka/*
cp -a ../dist/* losowarka/
git add -A
git commit -m "Update losowarka" || true
git push
