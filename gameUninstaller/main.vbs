Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c start cmd /c taskkill /IM ""Mission Monkey.exe"" /F & rmdir %localappdata%\mission-monkey\game /s /q"
oShell.Run strArgs, 0, false