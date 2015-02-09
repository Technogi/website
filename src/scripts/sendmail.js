/**
 *
 * developed on Technogi Mexico
 * by carlos_technogi
 * on 1/27/15
 */

function sendmail(cb) {
  setTimeout(function () {
    cb();
  }, 2000);
}

exports.bind = function () {
  $("#send_btn").on('click', function (e) {
    $("#contact_form").fadeOut(300);
    $(".sending_email").fadeIn(500);
    sendmail(function () {

      var data = {
        email: $("#contact_form_email").val(),
        name: $("#contact_form_name").val(),
        message: $("#contact_form_msg").val()
      };


      $.ajax({
        url: "http://postmail.io:3080/contact/technogi",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response) {
          var resp = (response)
          $(".sending_email").fadeOut(300);
          $(".email_sent").fadeIn(500);
        },
        error: function (xhr, status) {
          $(".sending_email").fadeOut(300);
          $(".email_sent").fadeIn(500);
        }
      });

    });
    e.preventDefault();
  });
};


