/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/27/15
 */


var logger = require('./logger');

var msg = require('./msg');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function displayError(error){
  $("#contact_form_error").text(error);
  $("#contact_form_error").show();
}

function validateContactForm(cb){
  console.log( $("#contact_form_email").val().trim().length);
  if(!validateEmail( $("#contact_form_email").val())){
    displayError(msg.get("views.contact_us.errors.invalid_email",messages));
  }else if(!$("#contact_form_name").val() || $("#contact_form_email").val().trim().length === 0){
    displayError(msg.get("views.contact_us.errors.missing_name",messages));
  }else{
    cb();
  }

}

exports.bind = function () {
  $("#send_btn").on('click', function (e) {

    var msgLang = userLang || 'en';
    if(msgLang.indexOf('-')>=0){
      msgLang = msgLang.subString(0,msgLang.indexOf('-'));
    }

    validateContactForm(function(){
      $("#contact_form_error").hide();

      $("#contact_form").fadeOut(300);
      $(".sending_email").fadeIn(500);

      var data = JSON.stringify({
        email: $("#contact_form_email").val(),
        name: $("#contact_form_name").val(),
        desc: $("#contact_form_msg").val(),
        lang: msgLang
      });

      $.ajax({
        url: "https://3a6fd6wfe0.execute-api.us-east-1.amazonaws.com/prod/info-request",
        type: "POST",
        crossDomain: true,
        data: data,
        dataType: "json",
        success: function (response) {
          if (console && console.log) {
            console.log("done");
          }
          $(".sending_email").fadeOut(300);
          $(".email_sent").fadeIn(500);
        },
        error: function (xhr, status) {
          if (console && console.log) {
            console.log(xhr);
          }
          $(".sending_email").fadeOut(300);
          $(".email_sent").fadeIn(500);
        }
      });
    });
    e.preventDefault();
  });
};


