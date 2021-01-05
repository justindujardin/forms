#!/bin/bash
set -e

# Make the virtualenv only if the folder doesn't exist
DIR=.env
if [ ! -d "${DIR}" ]; then
  virtualenv .env -p python3
fi

. .env/bin/activate
pip install --upgrade pip
echo "Installing/updating requirements..."
pip install -e .[dev]

