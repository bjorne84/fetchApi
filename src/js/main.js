// Wrap every letter in a span
var textWrapper = document.querySelector('.ml10 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: 2})
  .add({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 1300,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml10',
    opacity: 100,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });



  anime.timeline({loop: 2})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 100,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });