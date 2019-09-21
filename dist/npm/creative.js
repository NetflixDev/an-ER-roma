/**
 * This animation preset uses ff0000-ad-tech/ad-canvas package to animate canvas-rendered elements
 * See here for more details: https://github.com/ff0000-ad-tech/ad-canvas
 */
var Creative = function() {
  // percentage of iris animation that has to elapse before content underneath is completely visible
  var irisOffscreenAnimPercent = 0.3;

  // indicates whether to use canvas-rendered iris
  this.usesCanvasIris = true;

  this.play = function() {
    console.log('Creative.play()');

    // Initialize animation
    TweenLite.set(View.endFrame.headline, { alpha: 0 });
    TweenLite.set(View.endFrame.netflixLogo, { alpha: 0 });
    TweenLite.set(View.endFrame.cta, { alpha: 0 });

    // Iris animation
    var irisDelay = Creative.irisDelay;
    var irisDuration = Creative.irisDuration;
    var irisLen = Math.max(adParams.adWidth, adParams.adHeight);
    View.endFrame.iris.tween.to(View.endFrame.iris.circle, irisDuration, {
      delay: irisDelay,
      scale: irisLen * 0.05,
      ease: Power2.easeOut
    });
    View.endFrame.iris.tween.start();

    // Scale down background with iris wipe
    TweenLite.from(View.endFrame.background, irisDuration, {
      delay: irisDelay,
      scale: 2,
      opacity: 0,
      ease: Power2.easeOut
    });

    // Bring in rest of endframe elements
    var ttDelay = 0.5 + irisDelay + irisOffscreenAnimPercent * irisDuration;
    var endFrameFadeInDelay = ttDelay + 0.5;
    var endFrameTime = 0.8;

    TweenLite.from([View.endFrame.tt, View.endFrame.pedigree], endFrameTime, {
      alpha: 0,
      delay: ttDelay
    });

    TweenLite.delayedCall(endFrameFadeInDelay, function() {
      View.endFrame.netflixLogo.play();
      TweenLite.to(View.endFrame.headline, endFrameTime, { alpha: 1 });
      TweenLite.to(View.endFrame.netflixLogo, endFrameTime, { alpha: 1 });
      TweenLite.to(View.endFrame.cta, endFrameTime, { alpha: 1 });
    });
  };
};

// time to delay start of iris animation (in seconds)
Creative.irisDelay = 0.5;

// how long iris expansion lasts
Creative.irisDuration = 2;

// color of iris screen
Creative.irisColor = 'black';

// how long zoom animates for (in seconds)
Creative.zoomDuration = 1.7;

// how much to scale the keyart intro frame
Creative.zoomAmount = 5;
