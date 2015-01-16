/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

$(window).scroll(function() {
  if ($(this).scrollTop() > 1){
    $('header').addClass("sticky");
    $("#main_content_footer").addClass("scrolled");
    $("#mobile_header_img").addClass("scrolled");
    $(".menu_item").addClass("menu_item_scrolled");
    $("#main_content_footer .row div.medium-3").addClass('medium-6').removeClass('medium-3');
  }
  else{
    $('header').removeClass("sticky");
    $("#main_content_footer").removeClass("scrolled");
    $("#mobile_header_img").removeClass("scrolled");
    $(".menu_item").removeClass("menu_item_scrolled");
    $("#main_content_footer .row div.medium-6").addClass('medium-3').removeClass('medium-6');
  }
});