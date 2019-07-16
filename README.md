#  JavaScript QR Scanner Library Comparison

In this repository I'd like to develop a web application which allows one to compare various
JavaScript QR scanner libraries.

The libraries that will be compared are:

- https://github.com/nimiq/qr-scanner
- https://github.com/cozmo/jsQR
- https://github.com/davidshimjs/qrcodejs
- https://cirocosta.github.io/qcode-decoder
- https://github.com/LazarSoft/jsqrcode
- https://github.com/schmich/instascan
- https://github.com/andrastoth/webcodecamjs
- https://github.com/sinchang/qrcode-parser
- https://github.com/cirocosta/qcode-decoder
- https://github.com/jbialobr/JsQRScanner
- https://github.com/yushulx/zxing-cpp-emscripten

…and possibly others if I come across any.

I might need to remove some if it turns out they use different ones under the hood.

My thinking right now is that it will be done by letting the user start a web camera session
(using `getUserMedia`) and recording each frame from that session that I can get for a short
while (say maximum of 15 seconds). Then each library will go in and process the same input
frame image sequence one by one and this web application will collect this information for
each frame: did it find a QR code, was the QR code matched correctly (has the expected value)
and how long did it take to match the code in the image.

The user will also be able to select which camera they want to use so that on mobile devices
they can use both the selfie camera and the actual camera.

The web application will also offset doing the matching live, where each frame will be processed
by each library and then they all move to a next frame so they all see the same frames.

These two modes are distinct because they will skew the results in a certain sense. The slower
libraries will cause faster libraries to get less frames than they otherwise could (not to
mention they will all get less frames than if it was just that single library processing each
frame) which might cause libraries to miss the codes they would otherwise see (the first match
might come in later or it may work out that during motion frames with less blur will be skipped
as libraries are all processing).

The differences might be minimal and this mode makes sense to be offered because that's the
easiest one to do (and it will look cool to render the stats in real time), but I need to
also offer the mode where the footage is analysed after being recorded so libraries can also
showcase their abilities on less laggy streams and I can show how well each one does across a
full stream.

Additionally, there will be demo videos in the repository for the situations where a user is
not easily able to obtain a footage of a QR code but wants to see the results associated with
a footage so they can judge how each library performs and relate it to the footage they expect
they would have.

I will provide demo footage from a laptop web cam and from low-end and high-end phone cameras
(both user and environment facing).

The app will also have an entry flow where you select if you want test the current device's
camera or if you want it to be a configurable QR target (display code with user provided text
and configured complexity) and will test it on a different device. In the latter case the web
app will help you out by showing a URL QR code to itself so that you can scan that and have
the app open on the test device ready in the scan mode.
