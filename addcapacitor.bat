ECHO on
npm install @capacitor/core @capacitor/android @capacitor/ios @capacitor-community/electron
PAUSE
set /P appname="Enter App Name: "
set /P id="Enter App ID [com.name.name]: "
cap init appname id --web-dir=build
PAUSE
npm run build
PAUSE
cap add android
cap add ios
cap add @capacitor-community/electron
cap sync
PAUSE