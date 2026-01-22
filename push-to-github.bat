@echo off
echo ========================================
echo PhishGuard AI - Push to GitHub
echo ========================================
echo.
echo Your repository: https://github.com/Hafsah-Khathoon/PhishGuard-ai
echo.

pause

echo.
echo Step 1: Initializing git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: PhishGuard AI - Complete full-stack application with enhanced features"

echo.
echo Step 4: Adding remote repository...
git remote add origin https://github.com/Hafsah-Khathoon/PhishGuard-ai.git

echo.
echo Step 5: Setting branch to main...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
echo.
echo You will be prompted for your GitHub credentials.
echo If you have 2FA enabled, use a Personal Access Token as password.
echo.
pause

git push -u origin main

echo.
echo ========================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Code pushed to GitHub!
    echo.
    echo Next steps:
    echo   1. Go to: https://github.com/Hafsah-Khathoon/PhishGuard-ai
    echo   2. Go to Settings ^> Pages
    echo   3. Select "GitHub Actions" as source
    echo   4. Your site will deploy automatically!
    echo.
    echo Your site will be live at:
    echo   https://Hafsah-Khathoon.github.io/PhishGuard-ai/
) else (
    echo There was an error pushing to GitHub.
    echo.
    echo Common issues:
    echo   - Authentication failed: Use Personal Access Token
    echo   - Repository not found: Check repository name
    echo   - Permission denied: Verify you have push access
    echo.
    echo Get help at: https://docs.github.com/en/get-started
)
echo ========================================
echo.
pause
