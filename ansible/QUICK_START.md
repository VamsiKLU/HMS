# Quick Start - Ansible Deployment Check

## Issue: Command Syntax Error

The error you're seeing is because Ansible is trying to parse the inventory file incorrectly. Here's how to fix it:

## Step 1: Update Inventory File

Edit `ansible/inventory/hosts.yml` and replace the placeholder with your actual server:

```yaml
production:
  hosts:
    hms-server:
      ansible_host: YOUR_SERVER_IP_HERE    # ← Change this
      ansible_user: ubuntu                  # ← Change if different
      ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

## Step 2: Test Inventory

```bash
cd /mnt/c/HMS/ansible
ansible-inventory -i inventory/hosts.yml --list
```

## Step 3: Test Connection

```bash
ansible production -i inventory/hosts.yml -m ping
```

## Step 4: Run Deployment

**Correct command syntax:**
```bash
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml --limit production
```

**OR use the script:**
```bash
./check-deployment.sh production
```

## Common Issues

### 1. "Unable to parse inventory"
- Make sure YAML syntax is correct (spaces, not tabs)
- Check that `ansible_host` has a real IP/hostname

### 2. "No hosts matched"
- Use `--limit production` instead of `-l production`
- Or check inventory with: `ansible-inventory -i inventory/hosts.yml --list`

### 3. "Permission denied (publickey)"
- Check SSH key: `ls -la ~/.ssh/id_rsa`
- Set permissions: `chmod 600 ~/.ssh/id_rsa`
- Test SSH: `ssh -i ~/.ssh/id_rsa ubuntu@YOUR_SERVER_IP`

### 4. "World writable directory" warning
- This is a WSL mount issue, safe to ignore
- Or run from a non-mounted directory

## Test with Localhost (No Server Needed)

If you want to test on your local machine:

```bash
ansible-playbook playbooks/deploy.yml -i inventory/hosts.yml --limit local
```

This will deploy to localhost (requires Docker on your WSL system).

