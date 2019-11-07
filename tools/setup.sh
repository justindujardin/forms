#!/bin/bash
set -e
echo "Setting up all apps..."
libraries="typescript python"
for library in $libraries
do
   echo "=== Setting up: $library"
   (cd libraries/$library && sh tools/setup.sh)
done
