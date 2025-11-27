# Ansible Deployment for HMS

This directory contains Ansible playbooks and roles for deploying the HMS (Hospital Management System) application.

## Prerequisites

1. **Ansible installed** (version 2.9+)
   ```bash
   pip install ansible
   ```

2. **SSH access** to target server(s)
   - SSH key configured
   - User with sudo privileges

3. **Target server requirements:**
   - Ubuntu/Debian or RHEL/CentOS
   - Internet connectivity to pull Docker images

## Quick Start

### 1. Configure Inventory

Edit `inventory/hosts.yml` and update with your server details:

```yaml
all:
  children:
    production:
      hosts:
        hms-server:
          ansible_host: your-server-ip-or-hostname
          ansible_user: ubuntu
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

### 2. Configure Variables (Optional)

Edit `group_vars/all.yml` or `group_vars/production.yml` to customize:
- Ports
- Database credentials
- JWT secret
- CORS origins
- Backend URL

### 3. Deploy

```bash
# Deploy to production
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml -l production

# Deploy to staging
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml -l staging

# Deploy to specific host
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml -l hms-server
```

## Using Ansible Vault for Secrets

For production, use Ansible Vault to encrypt sensitive data:

```bash
# Create encrypted vault file
ansible-vault create group_vars/production/vault.yml

# Edit vault file
ansible-vault edit group_vars/production/vault.yml

# View vault file
ansible-vault view group_vars/production/vault.yml
```

Example vault.yml:
```yaml
vault_db_password: secure_password_here
vault_db_root_password: secure_root_password_here
vault_jwt_secret: secure_jwt_secret_here
```

Then reference in `group_vars/production.yml`:
```yaml
db_password: "{{ vault_db_password }}"
db_root_password: "{{ vault_db_root_password }}"
jwt_secret: "{{ vault_jwt_secret }}"
```

Deploy with vault:
```bash
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml -l production --ask-vault-pass
```

## Playbook Structure

```
ansible/
├── ansible.cfg              # Ansible configuration
├── inventory/
│   └── hosts.yml           # Server inventory
├── playbooks/
│   └── deploy.yml          # Main deployment playbook
├── roles/
│   ├── prerequisites/      # Install Docker, dependencies
│   ├── deploy/             # Deploy application
│   └── verify/             # Verify deployment
└── group_vars/
    ├── all.yml             # Default variables
    └── production.yml      # Production overrides
```

## Roles

### prerequisites
- Updates system packages
- Installs Docker and Docker Compose
- Configures Docker service
- Adds user to docker group

### deploy
- Creates project directory
- Copies docker-compose.yml
- Pulls latest Docker images
- Starts all services
- Waits for health checks

### verify
- Checks backend API endpoint
- Checks frontend endpoint
- Displays container status
- Shows service health

## Common Tasks

### Check deployment status
```bash
ansible hms-server -i inventory/hosts.yml -m shell -a "docker ps"
```

### View logs
```bash
ansible hms-server -i inventory/hosts.yml -m shell -a "cd /opt/hms && docker compose logs --tail=100"
```

### Restart services
```bash
ansible hms-server -i inventory/hosts.yml -m shell -a "cd /opt/hms && docker compose restart"
```

### Update and redeploy
```bash
# Pull latest images and restart
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml -l production
```

### Rollback
```bash
# Stop services
ansible hms-server -i inventory/hosts.yml -m shell -a "cd /opt/hms && docker compose down"

# Start previous version (if tagged)
ansible hms-server -i inventory/hosts.yml -m shell -a "cd /opt/hms && docker compose up -d"
```

## Troubleshooting

### Connection Issues
- Verify SSH key: `ssh -i ~/.ssh/id_rsa user@server`
- Check firewall rules
- Verify ansible_user has sudo privileges

### Docker Issues
- Check Docker service: `systemctl status docker`
- Verify user in docker group: `groups`
- Check Docker Compose: `docker compose version`

### Service Issues
- Check logs: `docker compose logs`
- Verify ports: `netstat -tulpn | grep -E '3000|9091|3307'`
- Check health: `docker compose ps`

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Deploy with Ansible
  run: |
    ansible-playbook ansible/playbooks/deploy.yml \
      -i ansible/inventory/hosts.yml \
      -l production \
      --ask-vault-pass
  env:
    ANSIBLE_VAULT_PASSWORD: ${{ secrets.ANSIBLE_VAULT_PASSWORD }}
```

## Security Best Practices

1. **Never commit secrets** - Use Ansible Vault
2. **Use SSH keys** - Disable password authentication
3. **Limit sudo access** - Use specific sudoers rules
4. **Firewall rules** - Only expose necessary ports
5. **Regular updates** - Keep Docker and images updated
6. **Backup database** - Regular MySQL backups

## Support

For issues or questions, check:
- Application logs: `docker compose logs`
- Ansible verbose mode: `ansible-playbook ... -vvv`
- Server logs: `/var/log/`

