#!/bin/bash
set -e
echo "Testing all apps..."
libraries="typescript python"
for library in $libraries
do
   echo "=== Testing: $library"
   (cd libraries/$library && sh tools/test.sh)
done
