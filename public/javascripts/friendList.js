var uid = $.cookie('id');

$(init);
function init() {
  initFriendList();
}
function initFriendList(){
  $.ajax({
    type: "POST",
    url: "/users/getFriendList",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      'userId': uid
    }),
    success: function (data) {
      for(var i=0;i<data.length;i++){
        var itemArr = [];
        $("#findList").collapse('hide');
        itemArr.push('<li>');
        itemArr.push('<a herf="" class="toChat" id="'+data[i].friendId._id+'">');
        itemArr.push('<img src="/images/2.jpg">');
        itemArr.push('<span class="unreadMsg">0</span>');
        itemArr.push('<span id="friendName">'+data[i].friendId.username+'</span>');
        itemArr.push('</a>');
        itemArr.push('</li>');
        $('#friend_list').append(itemArr.join(''));
      }
      unreadMsg();
    }
  });
}
function unreadMsg() {
  $.ajax({
    type: "POST",
    url: "/users/unreadMsg",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      'userId': uid
    }),
    success: function (data) {
      for(var i=0;i<data.length;i++){
        $('#'+data[i].from).find('.unreadMsg').show();
        $('#'+data[i].from).find('#friendName').css('margin-left','0');
        var j=$('#'+data[i].from).find('.unreadMsg').html();
        $('#'+data[i].from).find('.unreadMsg').html(parseInt(j)+1);
      }
    }
  });
}


