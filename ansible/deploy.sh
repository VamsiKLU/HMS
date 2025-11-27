#!/bin/bash

# HMS Ansible Deployment Script
# Usage: ./deploy.sh [environment] [--vault]

set -e

ENVIRONMENT=${1:-production}
VAULT_FLAG=""

if [[ "$*" == *"--vault"* ]]; then
    VAULT_FLAG="--ask-vault-pass"
fi

echo "🚀 Deploying HMS to $ENVIRONMENT environment..."

# Check if Ansible is installed
if ! command -v ansible-playbook &> /dev/null; then
    echo "❌ Ansible is not installed. Please install it first:"
    echo "   pip install ansible"
    exit 1
fi

# Check if inventory file exists
if [ ! -f "inventory/hosts.yml" ]; then
    echo "❌ Inventory file not found at inventory/hosts.yml"
    exit 1
fi

# Run deployment
ansible-playbook playbooks/deploy.yml \
    -i inventory/hosts.yml \
    -l "$ENVIRONMENT" \
    $VAULT_FLAG

echo "✅ Deployment completed!"

