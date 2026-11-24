@echo off
cd /d "%~dp0prototype"
echo Open http://127.0.0.1:8765 in your browser.
echo Stop server: Ctrl+C
python -m http.server 8765 --bind 127.0.0.1
pause
