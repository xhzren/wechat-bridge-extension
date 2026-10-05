#Requires -Version 5.1
<#
.SYNOPSIS
  Start the standalone WeChat bridge service.

.DESCRIPTION
  The bridge talks to the WeChat iLink bot API directly and is the single
  consumer of the account's polling cursor. Run exactly one instance per
  WeChat account, and do not run it alongside a weixin-mcp daemon.

  Credentials are read from:
    1. ~/.weixin-mcp/accounts/*.json
    2. ~/.wechat-acp/token.json

.EXAMPLE
  .\start-bridge.ps1
  .\start-bridge.ps1 -Port 8080
#>
param(
    [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$entry = Join-Path $here 'server.mjs'

Write-Host ''
Write-Host '=== WeChat Bridge (standalone) ===' -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath $entry)) {
    Write-Host "[FAIL] missing $entry" -ForegroundColor Red
    exit 1
}

# Install dependencies on first run.
if (-not (Test-Path -LiteralPath (Join-Path $here 'node_modules'))) {
    Write-Host '[..] installing dependencies...' -ForegroundColor Gray
    & npm install --omit=dev
    if ($LASTEXITCODE -ne 0) {
        Write-Host '[FAIL] npm install failed' -ForegroundColor Red
        exit 1
    }
}

# Warn if a weixin-mcp daemon owns the same account cursor.
$daemon = Get-NetTCPConnection -LocalPort 3001 -State Listen -ErrorAction SilentlyContinue
if ($daemon) {
    Write-Host '[WARN] something is listening on :3001 (weixin-mcp daemon?).' -ForegroundColor Yellow
    Write-Host '       Two pollers on one WeChat account will steal messages.' -ForegroundColor Yellow
    Write-Host '       Stop the daemon before continuing.' -ForegroundColor Yellow
    Write-Host ''
}

$env:BRIDGE_PORT = [string]$Port
Write-Host "[..] starting on http://127.0.0.1:$Port" -ForegroundColor Gray
Write-Host ''

try {
    & node $entry
}
finally {
    Write-Host ''
    Write-Host '[..] bridge stopped.' -ForegroundColor Gray
}