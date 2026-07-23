# Dinleti Security Policy

## Supported version

Security fixes are applied to the current production version and the active release branch only.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities publicly in GitHub issues.

Report privately to the repository owner with:

- affected URL, build or commit
- reproduction steps
- expected and actual behavior
- impact assessment
- screenshots or logs with personal data and secrets removed

## Response targets

- Critical: acknowledge within 1 business day
- High: acknowledge within 2 business days
- Medium/Low: acknowledge within 5 business days

## Security rules

- Secrets, API keys and tokens must never be committed to the repository.
- Production source maps must remain disabled.
- Sensitive decision logic and AI prompts must not be shipped in the client bundle.
- Logs must not contain personal data, authentication tokens or uploaded content.
- A security regression failure blocks production release.

## Key rotation

When a secret is suspected to be exposed:

1. Revoke or rotate it immediately.
2. Review provider and deployment logs.
3. Remove it from repository history where necessary.
4. Redeploy affected environments.
5. Record the incident and preventive action in a private security log.
