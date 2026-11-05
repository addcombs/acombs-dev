# acombs-dev

The site at https://acombs-dev.com: an Angular UI (`acombs-dev-ui`) and a Spring Boot API on AWS
Lambda (`acombs-dev-api`) at https://api.acombs-dev.com, both behind CloudFront. It is public, with
no sign-in, accounts or database; the API serves a health check and is ready for endpoints to be
added. See each folder's README for details.

`project.json` holds the only per-app settings: name, AWS profile and region, domain and theme
colors. The PowerShell scripts in `scripts\` derive every AWS resource name from it. Their logs go
to `logs\` and the IDs AWS assigns to `state\` (both git-ignored).

The domain's DNS is hosted in Route 53. The site and API use alias A/AAAA records to their
CloudFront distributions, since the root domain cannot have a CNAME.

## Set up

1. `scripts\start-all.ps1` - theme palettes, build, tests, and the app at http://localhost:4200/
2. `scripts\build-lambda.ps1`, `scripts\deploy-api.ps1`, then `scripts\create-function-url.ps1` -
   the API on Lambda
3. `scripts\request-certificate.ps1` - add the validation CNAMEs it prints to the Route 53 zone and
   re-run it until both certificates are issued
4. `scripts\create-ui-bucket.ps1`, `scripts\create-cloudfront.ps1`,
   `scripts\create-api-cloudfront.ps1`, `scripts\deploy-ui.ps1`
5. In Route 53: alias A and AAAA records for the host and `api.` host to the CloudFront domains the
   scripts print

After that, `scripts\build-lambda.ps1` then `scripts\deploy-api.ps1`, and `scripts\deploy-ui.ps1`
deploy changes, and `scripts\test-all.ps1` runs both apps' tests.
