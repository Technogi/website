(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./logger":2}],2:[function(require,module,exports){
/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */

var logger_levels = ['debug', 'log', 'info', 'warn', 'error'];

if (typeof console === 'undefined') {
  console = {};
}

if (typeof console.debug === 'undefined') {
  console.debug = function () {
  };
}

if (typeof console.log === 'undefined') {
  console.log = function () {
  };
}

if (typeof console.info === 'undefined') {
  console.info = function () {
  };
}

if (typeof console.warn === 'undefined') {
  console.warn = function () {
  };
}

if (typeof console.error === 'undefined') {
  console.error = function () {
  };
}


var simple_logger = {
  create: function (name, level) {
    var t = function (msg) {
      console[t.level](t.msg + msg);
    };

    t.msg = (name || "anonymous")+": ";

    if (level instanceof Number) {
      if (level < 0 || level > 4) {
        level = 3;
      }
      t.level = logger_levels[level];
    } else if (level !== 'debug' && level !== 'log' && level !== 'info' && level !== 'warn' && level !== 'error') {
      t.level = 'warn';
    } else {
      t.level = level;
    }
    return t;
  }
};

exports.create = simple_logger.create;
},{}]},{},[1]);
