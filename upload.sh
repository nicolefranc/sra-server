#!/bin/sh

# bin/upload.sh -- final revision

curl $1 \
  -F operations='{ "query": "mutation ($file: Upload!) { singleUpload(file: $file) { uri filename mimetype encoding } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@$2
