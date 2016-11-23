$(init)
var src;
var msg;
function init() {
  initEmoji();
  $('body').on('click','#showEmoji',doShowEmoji);
  $("#emojiWrapper img").click(function () {
     src=$(this).attr("src");
     msg=$("#messageInput").val();
    $("#messageInput").val(msg+"[emoji:"+src.slice(7,-4)+"]");
  });
  $('div').click(function () {
    if($(this).attr('id')=='emojiWrapper'){
      $('#emojiWrapper').show();
    } else {
      $('#emojiWrapper').hide();
    }
  });
}
function initEmoji() {
  for(var i=69;i>0;i--){
    $('#emojiWrapper').append(
      '<img src="/emoji/'+i+'.gif">'
    )
  }
}
function doShowEmoji() {
  $("#emojiWrapper").show();
}

