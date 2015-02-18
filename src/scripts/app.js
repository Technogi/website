/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');
var lang = require('./msg');
var sendmail = require('./sendmail');


var templates = require('./templates');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

var userLang = navigator.language || navigator.userLanguage;
userLang = userLang.substr(0, userLang.indexOf('-'));
lang.set_lang(userLang, messages);


function findFirstByAttr(array, attr, value) {
  var result = [];
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] == value) {
      return array[i];
    }
  }
  return undefined;
}

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
    $(".language_selector").hide();
  }
  else {
    $(".language_selector").show();
    reset();
  }
}

function buildTemplate(template, callback) {
  $("#page .layout").hide();
  $("#page #layout_" + template.layout).show();
  $("#page #layout_" + template.layout + " #title").html(template.title);
  $("#page #layout_" + template.layout + " #subtitle").html(template.subtitle);
  $("#page #layout_" + template.layout + " #description").html(template.description);
  if (template.layout == "text-image") {
    $("#page #layout_" + template.layout + " #image").attr("src", template.image.src);
  }
  if (callback) {
    callback();
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

function backToMain() {

  $("#back_btn").removeClass("show");
  $("#mobile_back_btn").removeClass("show");
  $("#page").removeClass("show");
  $("body").css("overflow", "auto");
  location.hash="";
  $(".technogi_panel").removeClass('show_up');
  setTimeout(function () {
    $("#page").scrollTop(0);
  }, 1000);
}

function start_carousel() {
  display_carousel_element(0, $(".display-element"));
}

function binds() {
  $("[scroll_to]").each(function (i, e) {
    $(e).click(function () {
      backToMain();
      $('html, body').animate({ scrollTop: $('#' + $(e).attr('scroll_to')).offset().top - 30 }, 'slow');
      return false;
    });
  });

  $("[show]").each(function (i, e) {
    $(e).click(function () {
      $('html, body').animate({ scrollTop: "10px"}, 'slow');
      var show_template = $(e).attr("show");
      location.hash = "#"+show_template;
      var template = findFirstByAttr(templates, "name", show_template);
      $("#back_btn").addClass("show");
      $("#mobile_back_btn").addClass("show");
      $("#page").addClass("show");
      $(".subpage_info").hide();
      $("#" + show_template + "-subpage").show();
      $("body").css("overflow", "hidden");
      $("#page").focus();
      /*buildTemplate(template,function(){
       scroll();
       $("#page").addClass("show");
       $("body").css("overflow","hidden");
       $("#page").focus();
       });*/
      return false;
    });
  });

  $("#back_btn").click(function () {
    backToMain();
  });
  $("#mobile_back_btn").click(function () {
    backToMain();
  });

  $(".language_selector").change(function () {
    lang.set_lang($(".language_selector").val(), messages);
  });

  $("#es_lang_btn").click(function () {
    lang.set_lang('es', messages);
  });

  $("#en_lang_btn").click(function () {
    lang.set_lang('en', messages);
  });

}

function startup_slider() {
  var el = document.getElementById("submit_btn_i");
  el.onmousedown = function (e) {
    var original_position = e.x;
    document.onmousemove = function (e) {
      console.log(e.x - original_position);
      el.style['margin-left'] = (e.x - original_position) + "px";
      console.log(el.style.left);
    };
    document.onmouseup = function (e) {
      console.log("mouseup");
      el.parentNode.onmousemove = function () {
      };
      document.onmousemove = function () {
      };
    };
  };
  el.addEventListener("touchstart", function (e) {
    var original_position = e.x;
    document.addEventListener("touchmove", function (e) {
      el.style['margin-left'] = (e.x - original_position) + "px";
    });
    document.addEventListener("touchleave", function () {
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

 window.onhashchange = function() {
    if(location.hash.length<=0){
      backToMain();
    }
  };

$(function(){
  adjust();
  binds();
  start_carousel();
  show_service_description();
  sendmail.bind();

/**
  $("#first_load").animate({
    width: [ "toggle", "swing" ],
    height: [ "toggle", "swing" ],
    opacity: "toggle"
  }, 2000, "ease", function() {
    $( this ).after( "<div>Animation complete.</div>" );
  });**/
});


$(window).scroll(adjust);