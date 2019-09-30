// how long zoom animates for (in seconds)
var ZOOM_DURATION = 1.7;

// how much to scale the keyart intro frame
var ZOOM_AMOUNT = 5;

// time to delay start of iris animation (in seconds)
var IRIS_DELAY = 0.5;

// how long iris expansion lasts
var IRIS_DURATION = 2;

// color of iris screen
var IRIS_COLOR = 'black';

// how long it takes for endframe elements to fade in (in seconds)
var FADE_DURATION = 0.8;

/**
 * This animation preset uses ff0000-ad-tech/ad-canvas package to animate canvas-rendered elements
 * See here for more details: https://github.com/ff0000-ad-tech/ad-canvas
 */
var Creative = function() {
  // percentage of iris animation that has to elapse before content underneath is completely visible
  var irisOffscreenAnimPercent = 0.3;

  this.play = function() {
    console.log('Creative.play()');

    // Initialize animation
    TweenLite.set(View.endFrame.tuneIn, { alpha: 0 });
    TweenLite.set(View.endFrame.ftm, { alpha: 0 });
    TweenLite.set(View.endFrame.netflixLogo, { alpha: 0 });
    TweenLite.set(View.endFrame.cta, { alpha: 0 });

    // Iris animation
    var irisLen = Math.max(adParams.adWidth, adParams.adHeight);
    View.endFrame.iris.tween.to(View.endFrame.iris.circle, IRIS_DURATION, {
      delay: IRIS_DELAY,
      scale: irisLen * 0.05,
      ease: Power2.easeOut
    });
    View.endFrame.iris.tween.start();

    // Scale down background with iris wipe
    TweenLite.from(View.endFrame.background, IRIS_DURATION, {
      delay: IRIS_DELAY,
      scale: 2,
      opacity: 0,
      ease: Power2.easeOut
    });

    // Bring in rest of endframe elements
    var ttDelay = 0.5 + IRIS_DELAY + irisOffscreenAnimPercent * IRIS_DURATION;
    var endFrameFadeInDelay = ttDelay + 0.5;

    TweenLite.from([View.endFrame.tt, View.endFrame.pedigree], FADE_DURATION, {
      alpha: 0,
      delay: ttDelay
    });

    TweenLite.delayedCall(endFrameFadeInDelay, function() {
      View.endFrame.netflixLogo.play();
      TweenLite.to(View.endFrame.tuneIn, FADE_DURATION, { alpha: 1 });
      TweenLite.to(View.endFrame.ftm, FADE_DURATION, { alpha: 1 });
      TweenLite.to(View.endFrame.netflixLogo, FADE_DURATION, { alpha: 1 });
      TweenLite.to(View.endFrame.cta, FADE_DURATION, { alpha: 1 });
    });
  };
};

// indicates whether to use canvas-rendered iris
Creative.usesCanvasIris = true;

// attaching to Creative class since container looks there for intro zoom properties
Creative.zoomDuration = ZOOM_DURATION;
Creative.zoomAmount = ZOOM_AMOUNT;
// also for iris color
Creative.irisColor = IRIS_COLOR;
