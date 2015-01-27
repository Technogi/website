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


