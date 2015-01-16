/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');
var msgs = require('./translations');
var anim = require('./animations');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

var headerOffset = 40;
var main_logo_width = parseInt($("#main_logo").width());
var top_bar_height = parseInt($(".top-bar").height());
var top_bar_padding_top = parseInt($(".top-bar").css("padding-top"));
var browser = (navigator && navigator.userAgent)?navigator.userAgent:'OTHER';
var isChrome = browser.indexOf("Chrome")>=0;

function adjust_background(a,b){
    var scroll_top = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.backgroundPositionY=scroll_top+"px";

}
function resize_header () {

  log("resizing header");
  var scroll_top = window.pageYOffset || document.documentElement.scrollTop;

  if(scroll_top < 0){
    $(".top-bar").css("padding-top", top_bar_padding_top);
    $(".top-bar").height(top_bar_height);
    $("#main_logo").width(main_logo_width);
  }else{
    if(parseInt($(".top-bar").css("padding-top"))> 0){
      $(".top-bar").css("padding-top", top_bar_padding_top - scroll_top/20);
    }
    if($(".top-bar").height()>= 45){
      $(".top-bar").height(top_bar_height - scroll_top/20);
    }

    if($("#main_logo").width()>=200){
      $("#main_logo").width(main_logo_width -  scroll_top/2);
    }
  }
}

function navigate_to(anchor) {
  $(document.body).animate({
    scrollTop: $('#' + anchor).offset().top
  }, 500, function () {
    resize_header();
  });
  return false;
}

function initLang(t) {
  window.tt = t;
  //console.log(i18n.t("about_us.summary", { name: '', escapeInterpolation: false })); // -> Not escaped <tag>
  $("body").i18n();
}
function setSpanish() {
  log('setting es');
  i18n.setLng('es', initLang);
}

function setEnglish() {
  log('setting en');
  i18n.setLng('en', initLang);
}
log('Starting app');

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

$(document).foundation({
  "magellan-expedition": {
    active_class: 'active',     // specify the class used for active sections
    threshold: headerOffset,    // how many pixels until the magellan bar sticks, 0 = auto
    destination_threshold: 20,  // pixels from the top of destination for it to be considered active
    throttle_delay: 50,         // calculation throttling to increase framerate
    fixed_top: 0,               // top distance in pixels assigend to the fixed element on scroll
    offset_by_height: true      // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
  },orbit:{
    slide_number: false,
    circular: true,
    bullets: false,
    navigation_arrows: false,
    timer_speed: 5000,
    pause_on_hover: false,
    before_slide_change:function(a,b,c){
      console.log("BEFORE");
      console.log(a);
      console.log(b);
      console.log(c);
    },
    after_slide_change:function(a,b,c) {
      console.log("AFTER");
      console.log(a);
      console.log(b);
      console.log(c);
    }
  }
});

log('Starting i18n');
i18n.init({resStore:msgs},initLang);

if(isChrome){
  $(window).load(function () {
    $(window).scroll(resize_header);
   // $(window).scroll(adjust_background);
  });
}


resize_header();

anim.start();