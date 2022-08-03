# pkg打包，7z压缩

pkg match.js -o ./build/match -t linux,win,macos

7z a ./dist/match-win.7z ./build/match-win.exe

7z a ./dist/match-linux.7z ./build/match-linux

7z a ./dist/match-macos.7z ./build/match-macos


pkg event.js -o ./build/event -t linux,win,macos

7z a ./dist/event-win.7z ./build/event-win.exe

7z a ./dist/event-linux.7z ./build/event-linux

7z a ./dist/event-macos.7z ./build/event-macos