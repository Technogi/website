(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/14/15
 */
var logger = require('./logger');
var lang = require('./msg');


var templates = require('./templates');

var log = logger.create('app:log', 'log');
var err = logger.create('app:err', 'error');

lang.set_lang('en', messages);


function findFirstByAttr(array, attr, value) {
  var result = [];
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] == value) {
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
  }
  else {
    reset();
  }
}

function buildTemplate(template,callback){
  $("#page .layout").hide();
  $("#page #layout_"+template.layout).show();
  $("#page #layout_"+template.layout+" #title").html(template.title);
  $("#page #layout_"+template.layout+" #subtitle").html(template.subtitle);
  $("#page #layout_"+template.layout+" #description").html(template.description);
  if(template.layout=="text-image"){
    $("#page #layout_"+template.layout+" #image").attr("src",template.image.src);
  }
  if(callback){
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

function backToMain(){
  $("#page").removeClass("show");
  $("body").css("overflow","auto");
}

function start_carousel() {
  display_carousel_element(0, $(".display-element"));
}

function binds() {
  $("[scroll_to]").each(function (i, e) {
    $(e).click(function () {
      backToMain();
      $('html, body').animate({ scrollTop: $('#' + $(e).attr('scroll_to')).offset().top }, 'slow');
      return false;
    });
  });

  $("[show]").each(function (i, e) {
    $(e).click(function () {
      var show_template = $(e).attr("show");
      console.log(show_template);
      var template = findFirstByAttr(templates,"name",show_template);
      buildTemplate(template,function(){
        scroll();
        $("#page").addClass("show");
        $("body").css("overflow","hidden");
        $("#page").focus();
      });
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


  $("#back_btn").click(function(){
    backToMain();
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
},{"./logger":2,"./msg":3,"./templates":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
exports.set_lang=function(lang,msgs){
  lang = lang || navigator.language;
  if(lang.indexOf('en')===0){
    lang = 'en';
  }else if(lang.indexOf('es')===0){
    lang = 'es';
  }else{
    lang = 'en';
  }
  var nodes = document.querySelectorAll('[msg]');
  for(var i = 0; i < nodes.length; i++){
    var node = nodes.item(i);
    node.innerText = property(msgs,lang+"."+node.getAttribute("msg"));
    node.textContent = node.innerText;
  }
};

function property(o,s){
  if(typeof s === 'undefined'){
    return '';
  }
  if(typeof o === 'undefined'){
    return s;
  }

  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      return s;
    }
  }
  return o;
}


},{}],4:[function(require,module,exports){
module.exports = [{
	"name":"consulting",
	"title":"IT Consulting",
	"subtitle":"We do IT Consulting",
	"description":"<p>Bacon ipsum dolor amet turducken brisket filet mignon meatloaf, chuck pancetta flank ham sausage strip steak chicken. Alcatra turducken chicken, beef ribs pancetta hamburger pork. Sirloin chicken chuck capicola. Landjaeger salami brisket, venison ribeye pork strip steak kielbasa pork loin rump pig andouille. Brisket ribeye corned beef salami jerky ground round sausage porchetta beef shoulder capicola biltong.</p>"+
									"<p>Kielbasa t-bone cupim, jowl sausage shankle fatback prosciutto andouille pig bacon. Bacon t-bone cow spare ribs cupim venison. Ground round cow shankle, frankfurter sausage pork filet mignon capicola jowl. Cupim pork belly ham hock turkey. Prosciutto flank picanha pork jowl alcatra kielbasa filet mignon pork belly. Chuck sirloin drumstick ham hock corned beef beef ribs kielbasa capicola jowl. Jerky fatback strip steak, beef bresaola ribeye venison turducken rump shank sausage brisket shoulder boudin.</p>"+
									"<p>Short ribs bresaola hamburger capicola pancetta tail alcatra pork belly. Boudin short loin bresaola kevin, salami pastrami leberkas venison filet mignon cow jowl meatloaf shoulder kielbasa. Capicola pork chop ground round tail cupim kevin turkey boudin bresaola. Spare ribs doner pig frankfurter. Picanha pancetta meatball tongue rump, drumstick cupim.</p>"+
									"<p>Bresaola landjaeger rump pancetta, bacon kevin pig shank pork chop sausage meatball jowl tenderloin ham. Shoulder turkey frankfurter ribeye cupim, beef ribs ham hock shank brisket sausage swine tail ground round landjaeger strip steak. Porchetta bacon chicken t-bone brisket shankle. Pancetta leberkas short ribs jowl capicola turkey alcatra doner porchetta. Salami tri-tip bacon spare ribs prosciutto cupim hamburger chicken pork belly turducken pancetta short ribs sirloin andouille sausage. Kevin venison sirloin kielbasa strip steak shoulder biltong pork chop jerky prosciutto shankle ham hock.</p>"+
									"<p>Bacon filet mignon shank, cupim turkey shankle ball tip fatback short loin shoulder. Short ribs turducken chicken picanha, kielbasa shoulder drumstick t-bone tail corned beef beef ribs pork chop ham andouille brisket. Rump kielbasa shankle chuck shoulder pork loin. Spare ribs chicken ball tip ribeye, ham cupim andouille jowl beef pork belly leberkas. Meatball jerky shoulder sausage t-bone porchetta corned beef picanha chuck jowl shank ground round tri-tip.</p>",
	"layout":"text"
},
{
	"name":"software_development",
	"title":"Software Development",
	"subtitle":"We do Software Development",
	"description":"<p>Bacon ipsum dolor amet turducken brisket filet mignon meatloaf, chuck pancetta flank ham sausage strip steak chicken. Alcatra turducken chicken, beef ribs pancetta hamburger pork. Sirloin chicken chuck capicola. Landjaeger salami brisket, venison ribeye pork strip steak kielbasa pork loin rump pig andouille. Brisket ribeye corned beef salami jerky ground round sausage porchetta beef shoulder capicola biltong.</p>"+
									"<p>Kielbasa t-bone cupim, jowl sausage shankle fatback prosciutto andouille pig bacon. Bacon t-bone cow spare ribs cupim venison. Ground round cow shankle, frankfurter sausage pork filet mignon capicola jowl. Cupim pork belly ham hock turkey. Prosciutto flank picanha pork jowl alcatra kielbasa filet mignon pork belly. Chuck sirloin drumstick ham hock corned beef beef ribs kielbasa capicola jowl. Jerky fatback strip steak, beef bresaola ribeye venison turducken rump shank sausage brisket shoulder boudin.</p>"+
									"<p>Short ribs bresaola hamburger capicola pancetta tail alcatra pork belly. Boudin short loin bresaola kevin, salami pastrami leberkas venison filet mignon cow jowl meatloaf shoulder kielbasa. Capicola pork chop ground round tail cupim kevin turkey boudin bresaola. Spare ribs doner pig frankfurter. Picanha pancetta meatball tongue rump, drumstick cupim.</p>"+
									"<p>Bresaola landjaeger rump pancetta, bacon kevin pig shank pork chop sausage meatball jowl tenderloin ham. Shoulder turkey frankfurter ribeye cupim, beef ribs ham hock shank brisket sausage swine tail ground round landjaeger strip steak. Porchetta bacon chicken t-bone brisket shankle. Pancetta leberkas short ribs jowl capicola turkey alcatra doner porchetta. Salami tri-tip bacon spare ribs prosciutto cupim hamburger chicken pork belly turducken pancetta short ribs sirloin andouille sausage. Kevin venison sirloin kielbasa strip steak shoulder biltong pork chop jerky prosciutto shankle ham hock.</p>"+
									"<p>Bacon filet mignon shank, cupim turkey shankle ball tip fatback short loin shoulder. Short ribs turducken chicken picanha, kielbasa shoulder drumstick t-bone tail corned beef beef ribs pork chop ham andouille brisket. Rump kielbasa shankle chuck shoulder pork loin. Spare ribs chicken ball tip ribeye, ham cupim andouille jowl beef pork belly leberkas. Meatball jerky shoulder sausage t-bone porchetta corned beef picanha chuck jowl shank ground round tri-tip.</p>",
	"image":{"src":"http://placehold.it/350x350"},
	"layout":"text-image"
},
{
	"name":"project_landing",
	"title":"Project Landing",
	"subtitle":"Te ayudamos a aterrizar la solución que necesitas.",
	"description":
		"<p>El iniciar un proyecto  de software no es una tarea fácil,"+
		" sobre todo cuando surgen las siguientes preguntas:</p>"+
			"<ul><li>¿Cuánto cuesta?</li><li>¿En cuánto tiempo estará listo?</li>"+
			"<li> ¿Cuáles son los riesgos?</li><li>¿Lo puedo hacer yo o tengo que contratar a alguien más?</li>"+
			"<li>Mi Proyecto es muy ambicioso, ¿Lo debo hacer?</li><li>¿Por dónde empiezo?</li></ul>"+

		"<h3>¿Qué es?</h3>"+
			"<p>El Project Landing es un servicio que lleva paso a paso  a cada cliente,"+
			" a entender cómo implementar su idea desde cero, o cómo mitigar los riesgos"+
			" inherentes a proyectos complejos de software.</p>"+

		"<h3>¿Cómo funciona?</h3>"+
			"<p>Realizamos un proceso cuidadoso donde hacemos lo siguiente:</p>"+
			"<h4>1.-Diagnóstico del Estado Actual.</h4>"+
				"<p>Definimos dónde estás y que nivel de madurez tiene tu proyecto."+ 
			"Con esto simplemente sacamos la radiografía.</p>"+
			"<h4>2.-Levantamiento de Requerimientos. </h4>"+
				"<p>Una vez que entendemos tu realidad, nos enfocamos a dónde quieres estar. "+
			"Documentamos todas las ideas que tienes en torno a tu proyecto y cómo has "+
			"visualizado que quieres concretarlo.</p>"+
			"<h4>3.-Análisis de la información.</h4>"+
				"<p>Nuestro grupo de expertos analistas, se sientan a analizar tu proyecto y "+
				"definen una serie de pasos que permitan darle forma a la idea. Entre las "+
				"actividades que ejecutamos aquí se encuentran:</p>"+
					"<ul class='list'><li>Creación de prototipos funcionales. <b>(Necesitas validar tu "+
						"idea con clientes potenciales? Te hacemos una versión para prueba de tu "+
						"sistema.</li>"+
						"<li>Validación de Viabilidad Técnica. Tu idea es innovadora y requiere "+
						"validar primero si el estado actual de la tecnología te permite alcanzarlo</li>"+
						"<li>Elección de Tecnología. Identificamos qué tecnología nos permite satisfacer "+
						 "la demanda de tu proyecto. Buscamos en nuestro portafolio de soluciones y herramientas."+
						 " Si es necesario investigar alguna tecnología nueva, para hacer posible tu proyecto."+
						 " Lo hacemos en esta fase."+
					"</li></ul>"+
				"<h4>4.-Diseño del Proyecto y Mapa de ruta.</h4>"+
				"<p>Una vez que contamos con toda la información y validamos que tu idea es "+
				"posible. Realizamos una cuidadosa planeación para llevarla a cabo. "+
				"Desde la etapa inicial hasta la puesta en producción y mantenimiento de la "+
				"solución.</p>"+
			"</div>"+
			"<p>Listo al final del Project Landing, tendrás toda la información necesaria "+
			"para que decidas si el proyecto es viable para ti, desde un aspecto financiero "+
			"y te damos todas las herramientas para que entiendas a qué te vas a enfrentar.</p>"+
			"<p>Opcionalmente, nosotros te podemos proveer el servicio de desarrollo del sistema. "+
			"Pero tú tendrás la libertad de buscar nuevos proveedores, pues tendrás todo lo que "+
			"necesitas para poner en marcha tu proyecto.</p>"+
		"<h3>Beneficios</h3>"+
			"<ul><li>Validar si el proyecto es viable desde una etapa temprana.</li>"+
			"<li> Mitigar los riesgos inherentes a todo proyecto de software.</li>"+
			"<li>Saber cuánto te va a costar poner en marcha tu proyecto.</li>"+
			"<li>Conocer diversas alternativas para la implementación.</li>"+
			"<li>Darte las herramientas para que puedas concretar tu idea.</li>"+
			"<li>Total libertad para decidir con quién realizarás el desarrollo.</li></ul>"+
		"<h3>Enfocado a:</h3>"+
			"<ul><li>Proyectos con alta complejidad técnica.</li>"+
			"<li>Proyectos estratégicos.</li><li>Ideas Innovadoras.</li></ul>"+
		"<h3>¿Qué tipo de clientes contratan el Project Landing?</h3>"+
			"<ul><li>Proyectos complejos y ambiciosos.</li>"+
			"<li>Innovadores en Tecnología basada en software.</li>"+
			"<li>Innovadores en Modelos de Negocio que requieran una solución de software.</li></ul>"+
		"<h3>Experiencia</h3>"+
			"<ul><li>Creación del Plan de migración para la INTRANET de una Cámara "+
			"de Comercio en MX.</li>"+
			"<li>Creación de una plataforma de telecomunicaciones para VoIP.</li>"+
			"<li>  Renovación del sistema de evaluación en línea del Centro de Evaluaciones "+
			"más importante de México.</li>"+
			"<li>Creación del Plan de implementación para un portal de recursos humanos.</li>"+
			"<li>Definición de la plataforma de Lectura Rápida.</li></ul>",
	"layout":"text"
}
];
},{}]},{},[1]);
