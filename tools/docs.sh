#!/bin/bash
echo "Generating documentation for all apps..."
set -e
libraries="typescript python"
for library in $libraries
do
   echo "=== Generating Documentation: $library"
   (cd libraries/$library && sh tools/docs.sh)
done
