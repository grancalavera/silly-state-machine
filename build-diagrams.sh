#!/usr/bin/env bash

rm -rf ./docs/diagrams/*
mkdir -p docs/diagrams

for src in ./docs/src/*; do
  if [ ! -d "$src" ]; then

    diagram=$(sed 's/```.*//g' < "${src}")
    pathname="${src##*/}"
    destination="./docs/diagrams/${pathname%.*}"

    echo "${diagram}" | yarn mmdc -o "${destination}.svg"
    echo "${diagram}" | yarn mmdc -o "${destination}.png"
  fi
done
