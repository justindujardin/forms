#!/bin/bash
echo "Building all apps..."
set -e
libraries="typescript python"
for library in $libraries
do
   echo "=== Building: $library"
   (cd libraries/$library && sh tools/build.sh)
done
