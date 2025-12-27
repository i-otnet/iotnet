#!/bin/bash

# Update all submodules to latest main branch
git submodule update --remote --merge

# Check if there are changes
if [[ -n $(git status --porcelain) ]]; then
    git add -A
    git commit -m "chore: update submodules to latest main"
    git push
    echo "✓ Submodules updated and pushed"
else
    echo "✓ Submodules already up to date"
fi
