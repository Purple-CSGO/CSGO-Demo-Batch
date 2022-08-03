# pkg打包，7z压缩

pkg test.js -o ./build/test -t linux,win,macos

7z a ./dist/test-win.7z ./build/test-win.exe

7z a ./dist/test-linux.7z ./build/test-linux

7z a ./dist/test-macos.7z ./build/test-macos