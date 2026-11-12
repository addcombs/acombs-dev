# acombs-dev

The site at https://acombs-dev.com: an Angular UI (`acombs-dev-ui`) and a Spring Boot API on AWS
Lambda (`acombs-dev-api`) at https://api.acombs-dev.com, both behind CloudFront. It is public, with
no sign-in, accounts or database; the API serves a health check and is ready for endpoints to be
added. See each folder's README for details.

`project.json` holds the only per-app settings: name, AWS profile and region, domain and theme
colors. The PowerShell scripts in `scripts\` derive every AWS resource name from it. Their logs go
to `logs\` (git-ignored).

The domain's DNS is hosted in Route 53. The site and API use alias A/AAAA records to their
CloudFront distributions, since the root domain cannot have a CNAME; the scripts write these and the
certificate validation records themselves.

## Set up

1. `scripts\start-all.ps1` - theme palettes, build, tests, and the app at http://localhost:4200/
2. `scripts\deploy-api.ps1` (builds, tests and creates the function), then
   `scripts\create-function-url.ps1` - the API on Lambda
3. `scripts\request-certificate.ps1` - the certificates, with their validation CNAMEs written to
   the Route 53 zone; it waits until both are issued
4. `scripts\create-ui-bucket.ps1`, `scripts\create-cloudfront.ps1`, `scripts\create-api-cloudfront.ps1`
   - the distributions, with alias A/AAAA records for the host and `api.` host in Route 53
5. Run the Deploy UI workflow from the repository's Actions tab (Run workflow) for the UI's first deploy

## Deploying

Pushing to `main` deploys automatically through GitHub Actions: `.github/workflows/deploy-ui.yml`
when `acombs-dev-ui` changes and `deploy-api.yml` when `acombs-dev-api` changes. Each runs the tests
first and deploys only if they pass; either can also be run by hand from the repository's Actions
tab. The API workflow updates the function's code only, so a change to its settings (environment
variables, memory, role) still needs `scripts\deploy-api.ps1`. `scripts\start-all.ps1` builds and
tests both apps locally before starting them.

The workflows sign in to AWS with GitHub's OIDC token as the `acombs-dev-github-deploy` IAM role,
so no AWS keys are stored in GitHub. The role trusts only pushes to `main` of
`addcombs/acombs-dev` (`.github/aws/trust-policy.json`) and can only upload the UI and API and
publish new versions of this app (`.github/aws/deploy-policy.json`). `sh .github/aws/create-role.sh`
(in Git Bash) creates the role, and the account-wide GitHub OIDC provider if it is missing; re-run it
after editing either policy file.
