# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tenacious Data** (tenaciousdata.help) - A Power BI App-Owns-Data embedding solution for multi-tenant environments. Embeds Power BI reports in custom applications without requiring end-user Power BI licenses.

## Build & Development Commands

### React Client (AppOwnsDataReactClient)
```bash
npm install                              # Install dependencies
npm run dev                              # Start Vite dev server (localhost:5173)
npm run build                            # TypeScript + Vite production build
npm run lint                             # ESLint checks
npm run preview                          # Preview production build
```

### Web API (AppOwnsDataWebApi)
```bash
dotnet run --project AppOwnsDataWebApi   # Starts on https://localhost:5001
                                         # Swagger UI at /swagger
```

### Full Stack Development
```powershell
.\run-dev.ps1                            # PowerShell: launches both API and client
```

Or manually in separate terminals:
1. `dotnet run --project AppOwnsDataWebApi`
2. `npm run dev --prefix AppOwnsDataReactClient`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  AppOwnsDataReactClient (React + TypeScript + Vite + MUI)   │
│  Routes: / (LandingPage) → /app (Dashboard + PowerBIEmbed)  │
└─────────────────────────┬───────────────────────────────────┘
                          │ /api/* proxied via vite.config.ts
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  AppOwnsDataWebApi (.NET 8)                                 │
│  Key endpoint: GET /api/EmbedToken?workspaceId=X&reportId=Y │
│  Uses service principal to generate Power BI embed tokens   │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
   ┌─────────────────┐        ┌──────────────────┐
   │ SQL Server      │        │ Power BI Service │
   │ AppOwnsDataDB   │        │ (REST API)       │
   └─────────────────┘        └──────────────────┘
```

### Key Projects
- **AppOwnsDataReactClient** - Active frontend (React 18, TypeScript, Vite, Material-UI)
- **AppOwnsDataWebApi** - .NET 8 API for embed token generation
- **AppOwnsDataShared** - Shared models and EF Core DbContext
- **AppOwnsDataAdmin** - .NET 6 admin portal for tenant management (secondary)
- **AppOwnsDataClient** - Legacy Webpack client (deprecated)

### Embed Flow
1. React client loads Dashboard → renders PowerBIEmbed component
2. PowerBIEmbed calls `GET /api/EmbedToken` with workspace/report IDs
3. WebApi uses service principal credentials to call Power BI REST API
4. Embed token returned to client
5. `powerbi-client` library renders report using token

## Configuration

### React Client (.env.local)
```
VITE_API_BASE_URL=https://localhost:5001
VITE_PBI_WORKSPACE_ID=<workspace-guid>
VITE_PBI_REPORT_ID=<report-guid>
```

### Web API (appsettings.json)
Service principal credentials in `ServicePrincipalApp` section, workspace/report IDs in `Workspaces` array.

## Key Files

| File | Purpose |
|------|---------|
| `AppOwnsDataReactClient/src/components/PowerBIEmbed.tsx` | Power BI embedding logic |
| `AppOwnsDataWebApi/Controllers/EmbedTokenController.cs` | Embed token endpoint |
| `AppOwnsDataWebApi/Services/PowerBiServiceApi.cs` | Power BI API wrapper |
| `AppOwnsDataReactClient/vite.config.ts` | Dev proxy configuration |

## Tech Stack

- **Frontend**: React 18, TypeScript 5.3, Vite 5, MUI 5, powerbi-client, Axios
- **Backend**: .NET 8, Entity Framework Core 6, Microsoft.PowerBI.Api
- **Database**: SQL Server
- **Auth**: Service principal (certificate-based) for Power BI API calls

## Deployment

- **Production**: Azure Static Web Apps + Azure App Service
- **CI/CD**: GitHub Actions (`.github/workflows/`)
- **Replit**: Configured via `.replit` file
