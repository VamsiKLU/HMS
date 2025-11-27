#!/bin/bash

# Deployment script that handles sudo password
# Usage: ./DEPLOY_WITH_SUDO.sh

set -e

INVENTORY="inventory/hosts.yml"

echo "🚀 Deploying HMS Application..."
echo ""
echo "Note: You may be prompted for your sudo password"
echo ""

# Run with --ask-become-pass to prompt for sudo password
ansible-playbook playbooks/deploy.yml \
    -i "$INVENTORY" \
    --limit production \
    --ask-become-pass \
    -v

echo ""
echo "✅ Deployment complete!"

