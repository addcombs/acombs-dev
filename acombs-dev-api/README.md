# acombs-dev API

Spring Boot API for acombs-dev (UI: `../acombs-dev-ui`). It has no database or authentication: it
serves a public health check, and endpoints added under `/api` are documented in Swagger UI
automatically.

## Requirements

- Java 21
- Maven 3.6.3 or later

## Configuration

The API runs without any settings. Optional environment variables (or `KEY=value` lines in an
untracked `.env` file in this directory):

| Variable | Purpose |
|---|---|
| `CORS_ALLOWED_ORIGINS` | Comma-separated browser origins allowed to call the health endpoint cross-origin, e.g. `https://acombs-dev.com`. Unset allows none. `deploy-api` sets it to the UI's domain. |

## Build and run

From this directory:

```powershell
mvn --batch-mode --no-transfer-progress verify   # build and run the unit tests
mvn spring-boot:run                              # run on http://localhost:8080
```

## Endpoints

| Method | Path | Behavior |
|---|---|---|
| `GET` | `/actuator/health` | `{"status":"UP"}`, without component details; the UI's footer polls it |

With the API running locally, open Swagger UI at `http://localhost:8080/swagger-ui.html` or
retrieve the generated OpenAPI JSON at `http://localhost:8080/v3/api-docs`. They document endpoints
under `/api` only, so they list nothing until some are added. When deployed they are served at the
API's own host, e.g. `https://api.acombs-dev.com/swagger-ui.html`.

The CORS rule above covers the health endpoint only. An endpoint added under `/api` that the
deployed UI calls needs its own CORS mapping (e.g. a `WebMvcConfigurer`), since the UI and API are
served from different hosts.
