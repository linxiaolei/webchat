$(init);
function init() {
  $("body").on('click', '#adduserBtn', doRegister);
}

function doRegister() {

  $.ajax({
    type: "POST",
    url: "/register",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'newTel': $("#newTel").val(),
      'newUsr': $("#newUsr").val(),
      'newPwd': $("#newPwd").val()
    }),
    success: function (data) {
      if (data.code == 500) {
        console.log("wrong");
      }
      if(data.code == 0){//如果成功存到cookie里面
        location.href = "/login";
      }
    }
  });
}
