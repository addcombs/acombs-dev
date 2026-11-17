# acombs-dev

The site at https://acombs-dev.com: an Angular UI (`acombs-dev-ui`) and a Spring Boot API on AWS
Lambda (`acombs-dev-api`), with one CloudFront distribution that serves the UI and sends `/api/*`,
`/actuator/*` and the API docs to the API. It is public, with no sign-in, accounts or database; the
API serves a health check and is ready for endpoints to be added. See each folder's README for
details.

`project.json` holds the only per-app settings: name, display name, AWS profile and region, domain
and theme colors. `"accounts": false` makes it a site without sign-in, so it has no user pool,
database login or migrations. `template.keep` lists the files this site keeps as its own when it is
brought up to date with `template-0` (its API and UI build files, without the sign-in libraries, and
its router setup).

`infra\` is a CDK app (TypeScript) with every AWS resource the site runs on: the UI and deploy
buckets, the API's function, `live` alias and function URL, the distribution and its Route 53 alias
records (the root domain cannot have a CNAME), and the role GitHub Actions deploys with.
`scripts\provision.ps1` deploys it; the scripts' logs go to `logs\` (git-ignored).

GitHub Actions (`.github/workflows/ci.yml`) builds and tests the UI, the API and the infra code on
every push to `main` and every pull request, and checks the theme palettes match `project.json`.
Pushes to `main` that pass then deploy the UI and the API code. To deploy without pushing, run the
workflow from the repository's Actions tab (CI > Run workflow). The deploy never changes the stack
or the function's settings; after changing `project.json` or `infra\`, run `scripts\provision.ps1`
again.

## Set up

The site was created from `template-0`; bring it up to date with the template's
`scripts\sync-from-template.ps1 -Target ..\acombs-dev`.

1. `scripts\provision.ps1` - the GitHub repository's deploy role, the stack, the UI's settings and
   the first deploy
2. `scripts\start-all.ps1` - theme palettes, build, tests, and the app at http://localhost:4200/

After that, each push to `main` deploys. `scripts\start-all.ps1` builds and tests both apps locally
before starting them.
