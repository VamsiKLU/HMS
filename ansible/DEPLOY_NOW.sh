#!/bin/bash

# Quick deployment script - fixes command syntax issues
# Usage: ./DEPLOY_NOW.sh [production|local]

set -e

ENV=${1:-production}
INVENTORY="inventory/hosts.yml"

echo "🚀 Deploying HMS to $ENV environment..."
echo ""

# Fix: Use --limit instead of -l to avoid parsing issues
ansible-playbook playbooks/deploy.yml \
    -i "$INVENTORY" \
    --limit "$ENV" \
    -v

echo ""
echo "✅ Deployment complete!"

