# Snyk Security Setup Guide

## Overview
Snyk is integrated into the Employee Education Platform to provide continuous security monitoring for:
- Frontend dependencies (npm packages)
- Backend dependencies (Python packages)
- Docker images
- Code vulnerabilities

## Quick Start

### 1. Authenticate with Snyk

First, you need to authenticate Snyk CLI with your account:

```bash
snyk auth
```

This will open a browser window to authenticate. If you don't have a Snyk account:
1. Go to https://snyk.io/
2. Sign up for free (supports GitHub login)
3. Complete authentication

### 2. Test for Vulnerabilities

**Frontend (Next.js):**
```bash
cd frontend
npm run snyk:test
```

**Backend (Python):**
```bash
cd backend
snyk test --file=requirements.txt
```

**Docker Images:**
```bash
# Test frontend Dockerfile
snyk test --docker frontend/Dockerfile

# Test backend Dockerfile
snyk test --docker backend/Dockerfile
```

### 3. Monitor Your Project

To continuously monitor your project on Snyk dashboard:

**Frontend:**
```bash
cd frontend
npm run snyk:monitor
```

**Backend:**
```bash
cd backend
snyk monitor --file=requirements.txt
```

## Available Commands

### Frontend Commands (package.json)
- `npm run snyk:test` - Test for vulnerabilities
- `npm run snyk:monitor` - Monitor on Snyk dashboard
- `npm run snyk:protect` - Apply patches/protections

### CLI Commands
```bash
# Test all projects
snyk test --all-projects

# Test with specific severity threshold
snyk test --severity-threshold=high

# Generate HTML report
snyk test --json | snyk-to-html -o report.html

# Test for license issues
snyk test --license

# Ignore specific vulnerability
snyk ignore --id=SNYK-JS-AXIOS-1234567

# Fix vulnerabilities automatically (where possible)
snyk fix
```

## GitHub Integration

### Setup GitHub Actions (Already Configured)

The `.github/workflows/snyk-security.yml` file is configured to:
- Run on every push to main/develop
- Run on pull requests
- Run weekly on Monday at midnight UTC
- Scan frontend, backend, and Docker images

### Add Snyk Token to GitHub

1. Get your Snyk API token:
   - Login to https://app.snyk.io/
   - Go to Account Settings → General
   - Copy your API token

2. Add to GitHub:
   - Go to your repository on GitHub
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `SNYK_TOKEN`
   - Value: (paste your Snyk token)
   - Click "Add secret"

## Snyk Dashboard

After running `snyk monitor`, view your project at:
https://app.snyk.io/

Features available:
- Real-time vulnerability alerts
- Dependency tree visualization
- Fix recommendations
- License compliance checking
- Integration with Jira, Slack, etc.

## Severity Levels

Snyk categorizes vulnerabilities by severity:

| Severity | Priority | Action Required |
|----------|----------|-----------------|
| **Critical** | P1 | Fix immediately |
| **High** | P2 | Fix within 1 week |
| **Medium** | P3 | Fix within 1 month |
| **Low** | P4 | Consider fixing |

## Common Issues & Solutions

### Issue: "Snyk token not found"
**Solution:** Run `snyk auth` to authenticate

### Issue: "No vulnerable paths found"
**Solution:** Great! Your dependencies are secure

### Issue: "Rate limit exceeded"
**Solution:** Wait or upgrade to paid plan for higher limits

### Issue: "Cannot find manifest file"
**Solution:** Ensure you're in the correct directory with package.json or requirements.txt

## Best Practices

1. **Run before commits:**
   ```bash
   # Add to pre-commit hook
   cd frontend && npm run snyk:test
   ```

2. **Fix critical issues first:**
   ```bash
   snyk test --severity-threshold=critical
   ```

3. **Keep dependencies updated:**
   ```bash
   # Frontend
   cd frontend && npm update
   
   # Backend
   cd backend && pip install --upgrade -r requirements.txt
   ```

4. **Review license compliance:**
   ```bash
   snyk test --license
   ```

5. **Enable automated PRs:**
   - In Snyk dashboard, enable "Automatic fix pull requests"
   - Snyk will create PRs to fix vulnerabilities automatically

## Integration with VS Code

Install Snyk VS Code extension:
1. Open VS Code
2. Go to Extensions
3. Search for "Snyk Security"
4. Install and authenticate

Features:
- Real-time vulnerability scanning
- Inline code analysis
- Fix suggestions in IDE

## Snyk CLI Reference

```bash
# Test current directory
snyk test

# Test specific file
snyk test --file=package.json

# Test all projects in monorepo
snyk test --all-projects

# Generate JSON output
snyk test --json > results.json

# Test with custom policy
snyk test --policy-path=.snyk

# Update Snyk CLI
npm install -g snyk@latest

# Check Snyk version
snyk --version

# Get help
snyk help
snyk help test
```

## Continuous Monitoring

### Weekly Scans
The GitHub Action runs weekly to catch new vulnerabilities in existing dependencies.

### Real-time Monitoring
When you run `snyk monitor`, Snyk will:
- Check for new vulnerabilities daily
- Send email alerts for new issues
- Update dashboard in real-time

### Slack Integration
1. Go to Snyk dashboard
2. Settings → Integrations
3. Connect Slack
4. Choose notification preferences

## Cost

Snyk offers:
- **Free:** Up to 200 tests/month, unlimited monitoring
- **Team:** $52/month - More tests, priority support
- **Enterprise:** Custom pricing - Advanced features

For this project, the **free tier is sufficient** for:
- Development and testing
- Personal projects
- Small teams (up to 5 developers)

## Support & Resources

- Snyk Documentation: https://docs.snyk.io/
- Snyk Blog: https://snyk.io/blog/
- Community: https://community.snyk.io/
- Support: support@snyk.io

## Current Status

- ✅ Snyk CLI installed globally
- ✅ Frontend scripts added to package.json
- ✅ .snyk policy file created
- ✅ GitHub Actions workflow configured
- ⏳ Authentication pending (run `snyk auth`)
- ⏳ Initial scan pending

## Next Steps

1. Run `snyk auth` to authenticate
2. Test frontend: `cd frontend && npm run snyk:test`
3. Test backend: `cd backend && snyk test --file=requirements.txt`
4. Review results and fix critical vulnerabilities
5. Set up monitoring: `npm run snyk:monitor`
6. Add SNYK_TOKEN to GitHub secrets
7. Enable GitHub Actions workflow

---

**Last Updated:** November 14, 2025
**Snyk Version:** Latest
**Project:** Employee Education Platform



