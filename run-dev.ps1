$ErrorActionPreference = "Stop"
Write-Host "Starting AppOwnsData Project from $PSScriptRoot" -ForegroundColor Cyan

# Check if we are in the right directory
if (-not (Test-Path "$PSScriptRoot\AppOwnsDataWebApi")) {
    Write-Error "Could not find AppOwnsDataWebApi. Are you running this from the project root?"
}

# Start Backend in a new window
Write-Host "Launching Backend (dotnet run)..." -ForegroundColor Green
Start-Process dotnet -ArgumentList "run --project AppOwnsDataWebApi" -WorkingDirectory $PSScriptRoot

# Start Frontend in the current window
Write-Host "Launching Frontend (npm run dev)..." -ForegroundColor Green
# Using --prefix to run npm script from the root without changing directory
npm run dev --prefix AppOwnsDataReactClient
