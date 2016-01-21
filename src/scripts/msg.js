var lang = navigator.language;

exports.set_lang=function(_lang,msgs){
  lang = _lang || navigator.language;
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
    if(node.getAttribute("placeholder")){
      node.setAttribute("placeholder",property(msgs,lang+"."+node.getAttribute("msg")));
    }else{
      node.innerText = property(msgs,lang+"."+node.getAttribute("msg"));
      node.textContent = node.innerText;
    }
  }
  window.userLang = lang;

};

exports.get=function(msg,msgs){
  return property(msgs,lang+"."+msg);
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

