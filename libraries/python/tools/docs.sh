#!/bin/bash
set -e
ROOT=../..
echo "Building documentation for (python)"

modules="index"
for module in $modules
do
   echo " -- Generating docs for: $module"
   pydocmd simple mort_jams+ mort_jams.$module++ > $ROOT/docs/python/$module.md
done
