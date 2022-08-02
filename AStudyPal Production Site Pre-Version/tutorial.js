const width = window.innerWidth;

if (width > 1080){
  document.getElementById("Android").style.display="none";
  document.getElementById("IOS").style.display="none";
  startAnimation();
}
else {
  document.getElementById("animation").style.display="none";
  document.getElementById("WIN").style.display="none";
  document.getElementById("MAC").style.display="none";
  document.getElementById("LIN").style.display="none";

  document.getElementById("w").style.display="none";
  document.getElementById("m").style.display="none";
  document.getElementById("l").style.display="none";
  document.getElementById("a").style.display="block";

  document.getElementById("a-title").style.fontSize="7vw";
}

function startAnimation() {
  const FlitePath = {
    curviness: 1.25,
    autoRotate: false,
    values: [
      {x: 100, y: -20},
      {x: 120, y: -40},
      {x: 140, y: -100},
      {x: 140, y: -280},
      {x: -140, y: -260},
      {x: -140, y: -100},
      {x: -120, y:-40},
      {x: 0, y: -150}
    ]
  };

  console.log(FlitePath);

  const tween = new TimelineLite();

  tween.add(
    TweenLite.to('.wized-png', 1, {
      bezier: FlitePath,
      ease: Power1.easeInOut
    })
  );

  const controller = new ScrollMagic.Controller();

  const scenery = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 1000,
    triggerHook: 0
  })
  .setTween(tween)
  // .addIndicators()
  .setPin('.animation')
  .addTo(controller)
}
