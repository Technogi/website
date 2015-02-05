(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
userLang = userLang.substr(0,userLang.indexOf('-'));
lang.set_lang(userLang, messages);


function findFirstByAttr(array, attr, value) {
  var result = [];
  console.log(array);
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] == value) {
        console.log(i);
        console.log(array);
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
      $('html, body').animate({ scrollTop: $('#' + $(e).attr('scroll_to')).offset().top-30 }, 'slow');
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

  $("#back_btn").click(function(){
    backToMain();
  });

  $(".language_selector").change(function(){
    lang.set_lang($(".language_selector").val(), messages);
  });

  $("#es_lang_btn").click(function(){
    lang.set_lang('es',messages);
  });

  $("#en_lang_btn").click(function(){
    lang.set_lang('en',messages);
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
  sendmail.bind();
});
$(window).scroll(adjust);
},{"./logger":2,"./msg":3,"./sendmail":4,"./templates":5}],2:[function(require,module,exports){
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
/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/27/15
 */

function sendmail(cb){
  setTimeout(function(){
    cb();
  },2000);
}

exports.bind=function(){
  $("#send_btn").on('click',function(e){
    $("#contact_form").fadeOut(300);
    $(".sending_email").fadeIn(500);
    sendmail(function(){
      $(".sending_email").fadeOut(300);
      $(".email_sent").fadeIn(500);
    });
    e.preventDefault();
  });
};



},{}],5:[function(require,module,exports){
module.exports = [require('./templates/it_consulting.js')[0],
                  require('./templates/project_landing.js')[0],
                  require('./templates/software_development.js')[0],
                  require('./templates/cloud.js')[0],
                  require('./templates/team.js')[0],
                  require('./templates/methodology.js')[0],
                  require('./templates/philosophy.js')[0]


];


},{"./templates/cloud.js":6,"./templates/it_consulting.js":7,"./templates/methodology.js":8,"./templates/philosophy.js":9,"./templates/project_landing.js":10,"./templates/software_development.js":11,"./templates/team.js":12}],6:[function(require,module,exports){
module.exports = [{
  "name":"cloud",
  "title":"Cloud",
  "subtitle":"Facilitamos tu migración y uso de la nube.",
  "description":"<p>Brindamos un servicio integral para empresas que desean "+
                "implementar su infraestructura de aplicaciones en la nube. "+
                "Nos especializamos en lo siguiente:</p>"+
                "<ul class='list'><li>Elección de la mejor nube, basada en precio, requerimientos y soporte.</li>"+
                "<li>Diagnóstico de aplicaciones (Validamos si las aplicaciones están "+
                  "preparadas para utilizar todo el potencial que ofrece la nube).</li>"+
                "<li>Adaptación y modificación de aplicaciones para hacerlas compatibles con la nube.</li>"+
                "<li>Acompañamiento en el proceso de migración.</li>"+
                "<li>Soporte Post Instalación.</li></ul>"+
                "<h3>El Proceso</h3>"+
                  "Dependiendo de la necesidad de cada cliente, podemos iniciar desde el "+
                  "paso 1 o integrarnos a su estrategia actual en implantación de "+
                  "infraestructura en la nube."+
                  "<h4>1. Diagnóstico inicial</h4>"+
                    "<ul class='list'><li>¿Tienes aplicaciones actualmente que quisieras subir a la nube?</li>"+
                    "<li>¿Quieres virtualizar aplicaciones existentes?</li>"+
                    "<li>¿Quieres centralizar tu operación?</li>"+
                    "<li>¿Quieres monitorear tus aplicaciones e infraestructura??</li></ul>"+
                  "<h4>2. Análisis de Madurez de aplicaciones existentes.</h4>"+
                    "<ul class='list'><li>¿Tienes aplicaciones actualmente que quisieras subir a la nube?</li>"+
                    "<li>¿Qué elementos tienes hoy en día?</li>"+
                    "<li>¿o Tus aplicaciones tienen la arquitectura idónea para ser desplegadas en la nube?</li></ul>"+
                  "<h4>3. Elección de proveedor ideal.</h4>"+
                    "<ul class='list'><li>¿Cuál es tu presupuesto?</li>"+
                    "<li>¿Qué tipo de servicio necesitas?</li>"+
                    "<li>¿Quieres hacer outsourcing del área de soporte?</li></ul>"+
                  "<h4>4. Migración de Aplicaciones.</h4>"+
                    "<ul class='list'><li>Preparamos tus aplicaciones para usar el potencial de la nube.</li>"+
                    "<li>Creamos un plan de migración para que tu operación no se interrumpa.</li></ul>"+
                "<h3>¿Quiénes son nuestros proveedores?</h3>"+
                "<ul class='table'><li>Rackspave</li><li>AWS</li><li>Heroku</li><li>Azure</li></ul>",
  "layout":"text"
}];
},{}],7:[function(require,module,exports){
module.exports = [{
  "name":"consulting",
  "title":"IT Consulting",
  "subtitle":"Hacemos consultoría IT",
  "description":"<h3>¿Qué ofrecemos?</h3>"+
                  "<ul class='list'><li>Reuniones de Definición y Planificación.</li>"+
                  "<li>Talleres para toma de requerimientos.</li>"+
                  "<li>Mejora de Procesos.</li>"+
                  "<li>Seguimiento y Control del Avance del Proyecto.</li>"+
                  "<li>Presupuestos para el Desarrollo.</li>"+
                  "<li>Desarrollo de componentes de una solución o solución completa.</li>"+
                  "<li>Documentación.</li>"+
                  "<li>Calendarización de releases.</li>"+
                  "<li>Instalación en Producción.</li>"+
                  "<li>Soporte Post Productivo.</li>"+
                  "<li>Capacitación sobre tecnologías y metodologías.</li></ul>",
  "layout":"text"
}];
},{}],8:[function(require,module,exports){
module.exports = [{
  "name":"methodology",
  "title":"Metodología",
  "subtitle":"Métodos simples y efectivos.",
  "description":"<p>Utilizamos las mejores prácticas del PMI y metodologías de desarrollo "+
                "ágil. Con esto logramos tener células de desarrollo autosuficientes que logran:"+
                "<ul class='list'><li>Conocer al cliente de manera muy cercana.</li>"+
                "<li>Mejora la comunicación.</li>"+
                "<li>Aumenta la productividad.</li></ul>"+
                "<p>Minimizamos el riesgo, haciendo un análisis preliminar de la "+
                "solución requerida, tratando de anticipar cualquier complicación. "+
                "Este riesgo se mitiga:</p>"+
                "<ul class='list'><li>Realizando validaciones de viabilidad técnica.</li>"+
                  "<li>Levantamiento de requerimientos.</li>"+
                  "<li>Revisión de Procesos de negocio.</li>"+
                  "<li>Entrevistas con sponsors.</li></li>"+
                  "<p>Aun así sabemos que es difícil prever todas las complicaciones, "+
                  "por lo cual nos mantenemos flexibles al cambio. Aquí es donde entra "+
                  "la parte ágil, donde respondemos a las nuevas necesidades del proyecto, "+
                  "en tiempo real.</p>",
  "layout":"text"
}];
},{}],9:[function(require,module,exports){
module.exports = [{
  "name":"philosophy",
  "title":"Filosofía",
  "subtitle":"en construcción",
  "description":"",
  "layout":"text"
}];

},{}],10:[function(require,module,exports){
module.exports = [{
  "name":"project_landing",
  "title":"Project Landing",
  "subtitle":"Te ayudamos a aterrizar la solución que necesitas.",
  "description":
    "<p>El iniciar un proyecto  de software no es una tarea fácil,"+
    " sobre todo cuando surgen las siguientes preguntas:</p>"+
      "<ul class='list'><li>¿Cuánto cuesta?</li><li>¿En cuánto tiempo estará listo?</li>"+
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
      "<ul class='list'><li>Validar si el proyecto es viable desde una etapa temprana.</li>"+
      "<li> Mitigar los riesgos inherentes a todo proyecto de software.</li>"+
      "<li>Saber cuánto te va a costar poner en marcha tu proyecto.</li>"+
      "<li>Conocer diversas alternativas para la implementación.</li>"+
      "<li>Darte las herramientas para que puedas concretar tu idea.</li>"+
      "<li>Total libertad para decidir con quién realizarás el desarrollo.</li></ul>"+
    "<h3>Enfocado a:</h3>"+
      "<ul class='list'><li>Proyectos con alta complejidad técnica.</li>"+
      "<li>Proyectos estratégicos.</li><li>Ideas Innovadoras.</li></ul>"+
    "<h3>¿Qué tipo de clientes contratan el Project Landing?</h3>"+
      "<ul class='list'><li>Proyectos complejos y ambiciosos.</li>"+
      "<li>Innovadores en Tecnología basada en software.</li>"+
      "<li>Innovadores en Modelos de Negocio que requieran una solución de software.</li></ul>"+
    "<h3>Experiencia</h3>"+
      "<ul class='list'><li>Creación del Plan de migración para la INTRANET de una Cámara "+
      "de Comercio en MX.</li>"+
      "<li>Creación de una plataforma de telecomunicaciones para VoIP.</li>"+
      "<li>  Renovación del sistema de evaluación en línea del Centro de Evaluaciones "+
      "más importante de México.</li>"+
      "<li>Creación del Plan de implementación para un portal de recursos humanos.</li>"+
      "<li>Definición de la plataforma de Lectura Rápida.</li></ul>",
  "layout":"text"
}];
},{}],11:[function(require,module,exports){
module.exports = [{
  "name":"software_development",
  "title":"Software Development",
  "subtitle":"We do Software Development",
  "description":"<h3>¿Qué desarrollamos?</h3>"+
                    "<ul class='list'><li>Aplicaciones Web y Empresariales.</li>"+
                    "<li>Aplicaciones Móviles.</li>"+
                    "<li>Integración de Sistemas.</li>"+
                    "<li>Componentes de Negocio.</li>"+
                    "<li>Prototipos para demostraciones y validación de ideas.</li></ul>"+
                  "<h3>¿Cómo?</h3>"+
                    "<p>El desarrollo de software presenta muchos desafíos en la "+
                    "actualidad. Se requieren soluciones flexibles, que maximicen la "+
                    "inversión en tecnología y que cumplan con la demanda constante de "+
                    "calidad y rapidez en los tiempos de entrega.</p>"+
                    "<p>En Technogi nos especializamos en cubrir todas estas necesidades.</p>"+
                    "<ul class='list'><li><b>Amplio portafolio de opciones.</b> Nuestra filosofía nos "+
                      "permite conocer las tecnologías más modernas e innovadoras y "+
                      "hacernos especialistas en cada una de ellas.</li>"+
                      "<li><b>Procesos de Calidad automatizados.</b> Con un desarrollo "+
                      "orientado a pruebas, y la utilización de sistemas de integración "+
                      "continua. Conocemos el estado de nuestro desarrollo en todo momento, "+
                      "lo cual nos permite tomar decisiones al momento.</li>"+
                      "<li><b>Visibilidad Total para el cliente. </b>En todo momento el cliente "+
                      "conoce el estado actual de su desarrollo, utilizando reportes y "+
                      "pizarrones de control.</li>"+
                      "<li><b>Productos Palpables.</b> Con ciclos de desarrollo cortos y en "+
                      "comunicación constante. Creamos software funcional que el cliente puede "+
                      "ver y validar desde etapas muy temprana del proyecto, lo cual evita desvíos "+
                      "con respecto a la idea original.</li>"+
                      "<li><b>Supervisión de Expertos.</b> Nuestro equipo de arquitectos "+
                      "establece los lineamientos para cada proyecto y sienta las bases para "+
                      "que el equipo produzca de manera ágil y sin contratiempos. Al final de "+
                      "cada entrega, se realizan validaciones nuevamente para garantizar que se "+
                      "están siguiendo todos los lineamientos establecidos.</li></ul>"+
                    "<p>Además cada uno de nuestros integrantes del equipo tiene un "+
                    "perfil responsable y comprometido, lo cual nos ayuda a tener células "+
                    "de desarrollo auto administradas, que impulsan la productividad y "+
                    "permiten tener un uso eficiente de los recursos que manejan los proyectos.</p>"+
                    "<p>Mantenemos informado al cliente en todo momento sobre el avance del "+
                    "desarrollo y estimulamos la comunicación.</p>"+
                  "<h3>Tecnologías</h3>"+
                    "<ul class='table'><li>Angular JS</li><li>Java /Play Framework</li>"+
                    "<li>Groovy / Grails</li><li>Ruby /Rails</li><li>Scala /Play Framework</li>"+
                    "<li>Javascript</li><li>HTML5</li><li>CSS3</li><li>Foundation</li>"+
                    "<li>Bootstrap</li></ul>"+
                  "<h3>Bases de Datos</h3>"+
                    "<ul class='table'><li>&nbsp;Redis</li><li>MongoDB</li>"+
                    "<li>PostgreSQL</li><li>MySQL</li><li>Oracle</li>"+
                    "<li>MSSQLServer</li></ul>"+
                  "<h3>Herramientas</h3>"+
                    "<ul class='table'><li>Jenkins</li><li>Sonar</li>"+
                    "<li>Github</li><li>Bitbucket</li><li>Greenhopper</li>"+
                    "<li>Confluence</li><li>JIRA</li><li>Jetbrains</li><li>Eclipse</li>"+
                    "<li>Netbeans</li><li>Cordova / Phonegap</li></ul>"+
                  "<h3>Algunos de nuestros proyectos</h3>"+
                    "<ul class='table'><li>Angular JS</li><li>Java /Play Framework</li>"+
                    "<li>Groovy / Grails</li><li>Ruby /Rails</li><li>Scala /Play Framework</li>"+
                    "<li>Javascript</li><li>HTML5</li><li>CSS3</li><li>Foundation</li>"+
                    "<li>Bootstrap</li></ul>",
  "image":{"src":"http://placehold.it/350x350"},
  "layout":"text"
}];

},{}],12:[function(require,module,exports){
module.exports = [{
  "name":"team",
  "title":"Nuestro equipo",
  "subtitle":"en construcción",
  "description":"",
  "layout":"text"
}];
},{}]},{},[1]);
