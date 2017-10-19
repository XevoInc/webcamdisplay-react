# Webcamdisplay-react
Display all your connected webcams on a single webpage.
Great for usability testing recordings and screencasts, stopwatch is included.

## Requirements
- A connected webcam / videoinput (wow!) and works with multiple cameras
- A modern browser with [mediaDevices Web API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

## Features
- Resizable and draggable timer
- Resizable and draggable webcam feeds
- Works offline

## Capture
- use any screensharing app like skype to broadcast 
- Mac-users can use pre-installed quicktime to capture via "screencast" recording. Start Quicktime Player and choose `File/New Screen Recording`

## Tech
- Based on the awesome [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- Also includes a workflow for [electron](https://electron.atom.io/)

## Demo
See it working in action: [Click here](https://hamsterbacke23.github.io/webcamdisplay-react/)

## Local
1) Clone it 
2) If you are using an https server then you need to make sure that the SSL key
and certificate are in /certificates/server.key and server.cert respectively.
This directory is ignored and you should not check it in
3) Then load the modules and start the server
4) Note that for local browsers on MacOS High Sierra at least, Safari does not
seem to work with http://localhost:3000 but this works fine with Google Chrome

```
yarn install
npm start
```

