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

lang.set_lang('en', messages);

function hide_service_buttons() {
  $(".service_btn").hide();
}

function show_service_buttons() {
  $(".service_btn").show();
}

function reset() {
  hide_service_buttons();
  $('header').removeClass("sticky");
  $("#main_content_footer").removeClass("scrolled");
  $("#mobile-header").removeClass("scrolled");
  $(".menu_item").removeClass("menu_item_scrolled");
  $("#main_content_footer .row div.medium-6").addClass('medium-3').removeClass('medium-6');
}

function show_service_description() {
  $(".technogi_panel").mouseover(function (a) {
    if ($("#main_content_footer").hasClass('scrolled')) {
      $(a.target).find("p.service_description").addClass('show_up').mouseleave(function (b) {
        $(b.target).removeClass('show_up');
      });
    }
  });
  $(".technogi_panel").mouseleave(function (a) {
    if ($("#main_content_footer").hasClass('scrolled')) {
      $(a.target).find("p.show_up").removeClass('show_up');

    }
  });
}

function scroll() {
  $('header').addClass("sticky");
  $("#main_content_footer").addClass("scrolled");
  $("#mobile-header").addClass("scrolled");
  $(".menu_item").addClass("menu_item_scrolled");
  $("#main_content_footer .row div.medium-3").addClass('medium-6').removeClass('medium-3');
  show_service_buttons();
}

function adjust() {

  if ($(this).scrollTop() > 1) {
    scroll();
  }
  else {
    reset();
  }
}


function display_carousel_element(index, elements) {
  $(elements[index]).slideDown(1000, function () {
    setTimeout(function () {
      $(elements[index]).slideUp(1000, function () {
        index = (index === elements.length - 1) ? 0 : index + 1;
        display_carousel_element(index, elements);
      });
    }, 5000);
  });
}

function start_carousel() {
  display_carousel_element(0, $(".display-element"));
}

function binds() {
  $("[scroll_to]").each(function (i, e) {
    $(e).click(function () {
      $("#page").removeClass("show");
      $('html, body').animate({ scrollTop: $('#' + $(e).attr('scroll_to')).offset().top }, 'slow');
      return false;
    });
  });

  $("[show]").each(function (i, e) {
    $(e).click(function () {
      scroll();
      $("#page").addClass("show");
      return false;
    });
  });

  $("#send_btn").click(function () {
    console.log("CLICK");
    $.ajax
    ({
      type: "POST",
      url: "https://api.mailgun.net/v2/mailgun.technogi.com.mx/messages",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic api:key-f2e9ad587f5f1df3bc3820a81b4d8c8d"
      },
      data: {
        from: 'inforequest@technogi.com.mx',
        to: 'carlos@technogi.com.mx',
        subject: 'Information Request',
        text: 'este es el mensaje'
      },
      success: function () {
        alert('Thanks for your comment!');
      }
    });
  });


}

function startup_slider() {
  var el = document.getElementById("submit_btn_i");
  el.onmousedown=function(e){
    var original_position = e.x;
    document.onmousemove=function(e){
      console.log(e.x-original_position);
      el.style['margin-left'] = (e.x-original_position)+"px";
      console.log( el.style.left );
    };
    document.onmouseup =function(e){
      console.log("mouseup");
      el.parentNode.onmousemove=function(){};
      document.onmousemove=function(){};
    };
  };
  el.addEventListener("touchstart",function(e){
    var original_position = e.x;
    document.addEventListener("touchmove",function(e){
      el.style['margin-left'] = (e.x-original_position)+"px";
    });
    document.addEventListener("touchleave",function(){
    });
  });
  /*
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  log("initialized.");*/
}

$(window).load(function () {
  adjust();
  binds();
  start_carousel();
  show_service_description();
});
$(window).scroll(adjust);