#!/usr/bin/env bash
# link to bin/wordle-helper from /usr/local/bin

# this should be run from repo root
# (the paths this uses are relative to that)

set -euo pipefail

target_bin="/usr/local/bin/wordle-helper"

yarn build

ln -s "$PWD/bin/wordle-helper" "$target_bin"
