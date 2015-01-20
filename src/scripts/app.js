/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');
var lang = require('./msg');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

lang.set_lang('en',messages);

function hide_service_buttons(){
  $(".service_btn").hide();
}

function show_service_buttons(){
  $(".service_btn").show();
}

function reset(){
  hide_service_buttons();
}
function show_service_description(){
  $(".technogi_panel").mouseover(function(a){
    if($("#main_content_footer").hasClass('scrolled')){
      $(a.target).find("p.service_description").addClass('show_up').mouseleave(function(b){
        $(b.target).removeClass('show_up');
      });
    }
  });
  $(".technogi_panel").mouseleave(function(a){
    if($("#main_content_footer").hasClass('scrolled')){
      $(a.target).find("p.show_up").removeClass('show_up');

    }
  });
}
function adjust() {

  if ($(this).scrollTop() > 1) {
    $('header').addClass("sticky");
    $("#main_content_footer").addClass("scrolled");
    $("#mobile-header").addClass("scrolled");
    $(".menu_item").addClass("menu_item_scrolled");
    $("#main_content_footer .row div.medium-3").addClass('medium-6').removeClass('medium-3');
    show_service_buttons();
  }
  else {
    reset();
    $('header').removeClass("sticky");
    $("#main_content_footer").removeClass("scrolled");
    $("#mobile-header").removeClass("scrolled");
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
  show_service_description();
});
$(window).scroll(adjust);