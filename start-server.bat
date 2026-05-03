@echo off
REM ===============================================
REM  Lance un serveur web local pour tester le site
REM  Double-clique sur ce fichier pour demarrer
REM ===============================================

cd /d "%~dp0"

echo.
echo ===============================================
echo   Serveur local Antoine Balesi - Portfolio
echo ===============================================
echo.

REM Detection automatique du runtime disponible
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur Python sur http://localhost:8000
    echo.
    echo Ouvre ton navigateur a l'adresse :
    echo    http://localhost:8000/index.html
    echo.
    echo Appuie sur Ctrl+C pour arreter le serveur.
    echo ===============================================
    echo.
    start "" "http://localhost:8000/index.html"
    python -m http.server 8000
    goto :end
)

where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur Python sur http://localhost:8000
    echo.
    start "" "http://localhost:8000/index.html"
    py -m http.server 8000
    goto :end
)

where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur Node sur http://localhost:8000
    echo.
    start "" "http://localhost:8000/index.html"
    npx --yes http-server -p 8000 -c-1
    goto :end
)

echo.
echo [ERREUR] Aucun runtime detecte (Python ou Node.js).
echo.
echo Solutions :
echo   1. Installe Python depuis https://www.python.org/downloads/
echo      (coche "Add Python to PATH" pendant l'installation)
echo   2. OU installe Node.js depuis https://nodejs.org/
echo   3. OU installe l'extension "Live Server" dans VS Code
echo.
pause

:end
