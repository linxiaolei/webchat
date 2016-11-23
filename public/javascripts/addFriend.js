var username = $.cookie('username');
var uid = $.cookie('id');
$(init);
function init() {
  $('#username').text(username);
  $('#bigName span').text(username);
  $("#findList").collapse('show');
  $('body').on('click', '#addBtn' , doAddFriend);
}
//添加好友
function doAddFriend() {
  $.ajax({
      type: "POST",
      url: "/users/addFriend",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        'userId': uid,
        'username': $(".item p").text()
      }),
      success: function (data) {
          var itemArr = [];
          $("#findList").collapse('hide');
          itemArr.push('<li>');
          itemArr.push('<a herf="" class="toChat" id="'+data.data.friendId+'">');
          itemArr.push('<img src="/images/2.jpg">');
          itemArr.push('<span class="unreadMsg"></span>');
          itemArr.push('<span id="friendName">'+data.username.username+'</span>');
          itemArr.push('</a>');
          itemArr.push('</li>');
          $('#friend_list').append(itemArr.join(''));
      }
  });
}