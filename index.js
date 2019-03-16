import { TimelineMax, Power2 } from 'gsap/all';
import jquery from "jquery";

window.$ = window.jQuery = jquery;

// declare actors
const $canvas = $('.canvas');
const $yellow = $('#bar-yellow');
const $stones = $('[id^=stone-]');
const $backgrounds = $('[id^=bg]');
const $stoneSettings = $('[id$=setting]');
const $lines = $('[id^=line]');
const $squares = $('[id^=square]');

function clearStage() {
  let clearTl = new TimelineMax();

  clearTl
    .set($backgrounds, {y: `+=500`})
    .set($yellow, {x:  `+=650`})
    .set($squares, {y: `+=500`})
    .set($lines, {y: `+=500`, onComplete: showContainer})

  return clearTl;
}

function animateScene() {
  let animateSceneTl = new TimelineMax({repeat: -1});

  animateSceneTl
    .staggerTo($stones, 0.6, {y: `-=400`, ease: Power2.easeInOut, delay: 4}, 0.15)
    .set($stones, {y: 0, autoAlpha: 0})
    .set($stoneSettings, {y: 0, autoAlpha: 0})
    .staggerTo($backgrounds, 0.8, {y: `-=1000`, ease: Power2.easeInOut,}, 0.15)
    .staggerTo($squares, 0.3, {y: 200, ease: Power1.easeInOut}, 0.07, `-=1.1`)
    .staggerTo($squares, 0.2, {y: -500, ease: Power2.easeInOut}, 0.06, `-=0.7`)
    .staggerTo($lines, 0.4, {y: -500, ease: Power2.easeInOut}, 0.02, `-=1`)
    .staggerTo($stones, 0.01, {autoAlpha: 1}, 0.05, `-=0.6`)
    .to($yellow, 0.6, {x: `-=1300`, ease: Power2.easeInOut}, `-=0.3`)
    .to($stoneSettings, 0, {autoAlpha: 1}, `-=0.3`)

  return animateSceneTl;
}

function showContainer() {
  $canvas.css('display', 'block');
}

function init() {
  let masterTl = new TimelineMax();

  // TODO: add child timelines to master timeline
  masterTl
    .add(clearStage(), 'clear-scene-stage')
    .add(animateScene(), 'animate-scene');
}

init();