@echo off
chcp 65001 >nul
REM Start the standalone WeChat bridge service.
REM Usage: start-bridge.bat [port]
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-bridge.ps1" %1