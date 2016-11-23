$(init);
function init() {
  $("body").on('click', '#loginBtn', doLogin);
}
function doLogin() {

  $.ajax({
    type: "POST",
    url: "/login",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'usr': $("#usr").val(),
      'psd': $("#psd").val()
    }),
    success: function (data) {
      if (data.code == 500) {
        console.log("wrong");
      }
      if(data.code == 0){
        $.cookie('username',data.data.username, {expires: 30});
        $.cookie('password', data.data.password, {expires: 30});
        $.cookie('id',data.data._id, {expires:30});
        location.href = "/users/chat";
      }
    }
  });
}
