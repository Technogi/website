/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

function adjust() {

  if ($(this).scrollTop() > 1) {
    $('header').addClass("sticky");
    $("#main_content_footer").addClass("scrolled");
    $("#mobile_header_img").addClass("scrolled");
    $(".menu_item").addClass("menu_item_scrolled");
    $("#main_content_footer .row div.medium-3").addClass('medium-6').removeClass('medium-3');
  }
  else {
    $('header').removeClass("sticky");
    $("#main_content_footer").removeClass("scrolled");
    $("#mobile_header_img").removeClass("scrolled");
    $(".menu_item").removeClass("menu_item_scrolled");
    $("#main_content_footer .row div.medium-6").addClass('medium-3').removeClass('medium-6');
  }
}


function display_carousel_element(index, elements) {
  $(elements[index]).slideDown(1000,function () {
    setTimeout(function () {
      $(elements[index]).slideUp(1000,function(){
        index = (index === elements.length - 1) ? 0 : index + 1;
        display_carousel_element(index, elements);
      });
    }, 5000);
  });
}

function start_carousel() {
  display_carousel_element(0, $(".display-element"));
}

$(window).load(function () {
  adjust();
  start_carousel();
});
$(window).scroll(adjust);