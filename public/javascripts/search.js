$(init);
function init() {
  socket=io();
  $('body').on('click', '#searchBtn' , doSearchFriend);

}
function doSearchFriend(){
  $.ajax({
    type: "POST",
    url: "/Search",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      'keyword': $('#keyword').val()
    }),
    success: function (data) {
      for(var i=0;i<data.length;i++){
        var itemArr = [];
        itemArr.push('<li class="item">');
        itemArr.push(' <p>'+data[i].username+'</p>');
        itemArr.push('<a class="btn" id="addBtn">添加</a>');
        itemArr.push('</li>');
        $('#findList').append(itemArr.join(''));
      }
    }
  });
}
