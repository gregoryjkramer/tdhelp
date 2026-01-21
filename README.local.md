# Local Dev Guide (Vite + Web API)

This repo renders Power BI reports via a Vite React client and a .NET 6 Web API.
The SPA signs in with MSAL, calls the API for an embed token, and then embeds
the report using `powerbi-client`.

## Quickstart

1) Configure local env for the React client:

```bash
cp AppOwnsDataReactClient/.env.local.example AppOwnsDataReactClient/.env.local
```

Edit `AppOwnsDataReactClient/.env.local`:
- `VITE_API_BASE_URL` should match the Web API URL (default: `https://localhost:5001`)
- `VITE_PBI_WORKSPACE_ID` and `VITE_PBI_REPORT_ID` are the report to embed

2) Start the API:

```bash
dotnet run --project AppOwnsDataWebApi
```

3) Start the Vite client:

```bash
npm run dev --prefix AppOwnsDataReactClient
```

4) Open the Vite URL (usually `http://localhost:5173/`) and sign in.

## How it works

- The Vite client (`AppOwnsDataReactClient`) uses MSAL to sign in and acquire a
  user access token for the Web API (`PowerBiLoginRequest`).
- The SPA calls `GET /api/EmbedToken` (or `GET /api/Embed`) on the Web API.
- The Web API (`AppOwnsDataWebApi`) uses a service principal certificate
  configured in `AppOwnsDataWebApi/appsettings.json` to call Power BI and
  generate an embed token for the report.
- The SPA uses the embed token + `embedUrl` to render the report via
  `powerbi-client`.

## Common issues

- Certificate missing: `AppOwnsDataWebApi/Services/TokenManager.cs` looks up the
  certificate thumbprint in the CurrentUser certificate store.
- Wrong IDs: if `VITE_PBI_WORKSPACE_ID` or `VITE_PBI_REPORT_ID` are invalid,
  the API will return 500 or 404.
- CORS: the Vite dev server proxies `/api` to the Web API in
  `AppOwnsDataReactClient/vite.config.ts`.
