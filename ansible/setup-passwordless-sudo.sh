#!/bin/bash

# Setup passwordless sudo for current user
# Run this once to avoid entering sudo password every time

set -e

USER=$(whoami)

echo "Setting up passwordless sudo for user: $USER"
echo ""
echo "You'll need to enter your sudo password once:"
echo ""

# Add user to sudoers with NOPASSWD
echo "$USER ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/$USER

# Set correct permissions
sudo chmod 0440 /etc/sudoers.d/$USER

echo ""
echo "✅ Passwordless sudo configured!"
echo "You can now run Ansible without --ask-become-pass"
echo ""
echo "Test it:"
echo "  sudo -n true && echo 'Passwordless sudo works!' || echo 'Still needs password'"

