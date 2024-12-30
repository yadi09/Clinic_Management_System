#!/bin/bash

# Step 1: Add all changes
git add .

# Step 2: Prompt for a commit message
echo "Enter your commit message: "
read commit_message

# Step 3: Commit with the entered message
git commit -m "$commit_message"

# Step 4: Push to the current branch
git push

# Step 5: Notify the user
echo "Changes have been successfully pushed!"
