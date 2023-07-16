Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c start cmd /c taskkill /IM ""Mission Monkey.exe"" /F && start cmd /c rmdir %localappdata%\mission-monkey\game /s /q && start cmd /c reg delete HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\MissionMonkey /f"
oShell.Run strArgs, 0, false