#!/bin/bash

# Quick script to check Ansible deployment status
# Usage: ./check-deployment.sh [host]

set -e

HOST=${1:-production}
INVENTORY="inventory/hosts.yml"

echo "🔍 Checking Ansible deployment status for: $HOST"
echo ""

# Test inventory parsing
echo "1. Testing inventory file..."
ansible-inventory -i "$INVENTORY" --list -l "$HOST" 2>&1 || {
    echo "❌ Inventory file has issues. Please update ansible/inventory/hosts.yml with your server details."
    echo ""
    echo "Example:"
    echo "  hms-server:"
    echo "    ansible_host: 192.168.1.100"
    echo "    ansible_user: ubuntu"
    echo "    ansible_ssh_private_key_file: ~/.ssh/id_rsa"
    exit 1
}

echo "✅ Inventory file is valid"
echo ""

# List hosts
echo "2. Available hosts in '$HOST' group:"
ansible-inventory -i "$INVENTORY" --list -l "$HOST" | grep -A 5 "\"$HOST\"" || echo "No hosts found in $HOST group"
echo ""

# Test connection (if not localhost)
if [ "$HOST" != "local" ]; then
    echo "3. Testing SSH connection..."
    ansible "$HOST" -i "$INVENTORY" -m ping || {
        echo "❌ Cannot connect to hosts. Check:"
        echo "   - Server IP address in inventory/hosts.yml"
        echo "   - SSH key permissions: chmod 600 ~/.ssh/id_rsa"
        echo "   - Network connectivity to server"
        exit 1
    }
    echo "✅ SSH connection successful"
    echo ""
fi

# Check if Docker is installed
echo "4. Checking Docker installation on target..."
ansible "$HOST" -i "$INVENTORY" -m command -a "docker --version" || {
    echo "⚠️  Docker not installed. Deployment will install it."
}
echo ""

# Check if services are running (if already deployed)
echo "5. Checking if services are already running..."
ansible "$HOST" -i "$INVENTORY" -m shell -a "cd /opt/hms 2>/dev/null && docker compose ps || echo 'Not deployed yet'" || true
echo ""

echo "✅ Pre-deployment checks complete!"
echo ""
echo "To deploy, run:"
echo "  ansible-playbook playbooks/deploy.yml -i $INVENTORY --limit $HOST"

