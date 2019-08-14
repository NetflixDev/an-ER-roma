/**
 * This animation preset uses ff0000-ad-tech/ad-canvas package to animate canvas-rendered elements
 * See here for more details: https://github.com/ff0000-ad-tech/ad-canvas
 */
var Creative = function() {
  this.play = function() {
    console.log('Creative.play()');

    // Initialize animation
    TweenLite.set(View.endFrame.tuneIn, { alpha: 0 });
    TweenLite.set(View.endFrame.ftm, { alpha: 0 });
    TweenLite.set(View.endFrame.netflixLogo, { alpha: 0 });
    TweenLite.set(View.endFrame.cta, { alpha: 0 });

    // Iris animation
    var irisDelay = 0.5;
    var irisTime = 2;
    var irisLen = Math.max(adParams.adWidth, adParams.adHeight);
    View.endFrame.iris.tween.to(View.endFrame.iris.circle, irisTime, {
      delay: irisDelay,
      scale: irisLen * 0.05,
      ease: Power2.easeOut
    });
    View.endFrame.iris.tween.start();

    // Scale down background with iris wipe
    TweenLite.from(View.endFrame.background, irisTime, {
      delay: irisDelay,
      scale: 2,
      opacity: 0,
      ease: Power2.easeOut
    });

    // Bring in rest of endframe elements
    var ttDelay = 0.5 + irisDelay + Creative.irisOffscreenAnimPercent * irisTime;
    var endFrameFadeInDelay = ttDelay + 0.5;
    var endFrameTime = 0.8;

    TweenLite.from([View.endFrame.tt, View.endFrame.pedigree], endFrameTime, {
      alpha: 0,
      delay: ttDelay
    });

    TweenLite.delayedCall(endFrameFadeInDelay, function() {
      View.endFrame.netflixLogo.play();
      TweenLite.to(View.endFrame.tuneIn, endFrameTime, { alpha: 1 });
      TweenLite.to(View.endFrame.ftm, endFrameTime, { alpha: 1 });
      TweenLite.to(View.endFrame.netflixLogo, endFrameTime, { alpha: 1 });
      TweenLite.to(View.endFrame.cta, endFrameTime, { alpha: 1 });
    });
  };
};

// percentage of iris animation that has to elapse before content underneath is completely visible
Creative.irisOffscreenAnimPercent = 0.3;
Creative.usesCanvasIris = true;
Creative.irisColor = 'black';

// how long zoom animates for (in seconds)
Creative.zoomDuration = 1.7;

// how much to scale the keyart intro frame
Creative.zoomAmount = 5;
