#  JavaScript QR Scanner Library Comparison

In this repository I'd like to develop a web application which allows one to compare various
JavaScript QR scanner libraries.

The libraries that will be compared are:

- https://github.com/cozmo/jsQR
- https://github.com/LazarSoft/jsqrcode
- https://github.com/schmich/instascan

(These libraries have already been placed in the repository with stub exports.)

- https://github.com/andrastoth/webcodecamjs
- https://github.com/jbialobr/JsQRScanner
- https://github.com/yushulx/zxing-cpp-emscripten

(These are yet to be added.)

…and possibly others if I come across any.

Not used:

- https://github.com/nimiq/qr-scanner (uses Cozmo's jsQR)
  - I didn't notice it before I implemented it so there is an implementation in
  - Somehow this manages to catch less stuff than Cozmos despite wrapping it?!
- https://github.com/sinchang/qrcode-parser (uses Cozmo's jsQR)
- https://github.com/cirocosta/qcode-decoder (uses JazarSoft's jsqrcode)

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

I will also attach approximate numbers for the devices I manage to test this on so it becomes
apparent if there are libraries which for example excel on desktop but do not on mobile etc.

Some libs offer a web worker integration as well so I should count those as two
entries I guess, one with and one without.

Also some libraries might depend on the continuous stream to improve their detection
rates so in order to account for that, aside from scanning individual frames,
I should also construct a video stream somehow (need the stored one not the live
one so probably capture live frames and they construct a video from them to a
`video` element and send that to the library?) and show entries for both performance
on a sequence of frames as well as on a stored video stream.

If the above is not possible or it is too hard or too unreliable (might not work
for all libraries for example since some might want a stream object directly),
then it might be wise to look into virtualizing the browser camera and playing
pre-recorded sequences.

https://webrtc.org/testing

This could be done in Puppeteer in addition to the live site functionalities.

- `--allow-file-access-from-files` allows `getUserMedia` to be called from `file://` URLs
- `--disable-gesture-requirement-for-media-playback` removes the need to tap a `video` element to start it playing on Android
- `--use-fake-ui-for-media-stream` avoids the need to grant camera/microphone permissions
- `--use-fake-device-for-media-stream` feeds a test pattern to `getUserMedia` instead of live camera input
- `--use-file-for-fake-video-capture=path/to/file.y4m` feeds a Y4M test file to `getUserMedia` instead of live camera input
  - https://wiki.multimedia.cx/index.php/YUV4MPEG2

I might also consider adding `@` version suffixes to directory names to support
testing multiple versions of the same library if there is a need for that in the
future.

## To-Do

### Hook up Instascan in some way which allows scanning `video` element

That is the only thing it will accept.
