var uid = $.cookie('id');
var socket = io();
var fid;
$(init);
function init() {
    socket.emit('login', uid)

    $('body').on('click', '.toChat' , doChat);
    $('body').on('click','#sendBtn',doSend);
    $('body').on('change','#image',doSendImage);
    $('body').on('paste','#messageInput',doPaste);

    socket.on('newMsg', function(id,msg) {
        displayNewMsg(id, msg);
    });
    socket.on('newImg', function(id,img) {
          displayNewImg(id, img);
    });
}

function displayNewMsg(user, msg) {

     msg=displayEmoji(msg);

    $("#v"+fid).append('<li class="'+(user === "me" ? "me" : "other")+'">'+
        '<div class="time">'+
        '<span>time</span>'+
        '</div>'+
        '<div class="msg">'+
        '<img src="/images/2.jpg" class="img-rounded">'+
        '<p>'+msg+'</p>'+
        '</div>'+
        '</li>'
    );
    $("#v"+fid).scrollTop($("#v"+fid)[0].scrollHeight);
}

//选择好友进行聊天
function doChat() {
    fid = $(this).attr('id');
    var fname = $(this).find("#friendName").text();
    $("#chatObj p").text(fname);
    setUnreadMsg();
    $(".historyMsg").prepend('<ul class="chatContent" id="v'+fid+'"></ul>');
    $(".historyMsg .chatContent").hide();
    $("#v"+fid).show();
    initMsg();
}

//选择好友聊天时，初始化与好友的聊天记录
function initMsg() {
    $.ajax({
        type: "POST",
        url: "/users/initMsg",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            'userId': uid,
            'fid': fid
        }),
        success: function (data) {
            for(var i=0; i<data.length;i++) {
                var fromID=data[i].from;
                var toId=data[i].to;
                if(uid == fromID) {
                    if(fid==toId) {
                        if(data[i].content.indexOf(';base64,')!=-1){
                            displayNewImg('me',data[i].content);
                        }else{
                            displayNewMsg('me', data[i].content);
                        }
                    }
                } else if(fid == fromID) {
                    if(uid ==toId){
                        if(data[i].content.indexOf(';base64,')!=-1){
                            displayNewImg(fid,data[i].content);
                        }else{
                            displayNewMsg(fid, data[i].content);
                        }
                    }
                } else {
                    console.log("the news chat with others");
                }
            }
        }
  });
}

function doSend() {
    var msg=$('#messageInput').val();
    $('#messageInput').val('');
    socket.emit('private message',uid,fid,msg);
    displayNewMsg('me', msg);
    return false;
}

//更改未读消息
function setUnreadMsg(){
    $.ajax({
        type: "POST",
        url: "/users/setUnreadMsg",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            'userId': uid,
            'fid':fid
        }),
        success: function (data) {
            $('#'+fid).find('.unreadMsg').html('0');
            $('#'+fid).find('.unreadMsg').hide();
            $('#'+fid).find('#friendName').css('margin-left','10px');
        }
    });
}

//判断消息中是不是有表情，有就更改msg
function displayEmoji(msg){
  var reg = /\[emoji:\d+\]/g;
  var match;
  var emojiIndex;
  var result=msg;
  //用正则表达式来判断这条消息里面有没有表情的信息
  while(match = reg.exec(msg)){
      emojiIndex=match[0].slice(7,-1);
      result=result.replace(match[0], '<img src="/emoji/'+emojiIndex+'.gif">');
  }
  return result;
}

//发送图片
function doSendImage(){
  var file = this.files[0],
  reader = new FileReader();
  
  reader.onload = function(e) {
      socket.emit('sendImg',uid,fid, e.target.result);
      displayNewImg('me',e.target.result);
  };
  reader.readAsDataURL(file);
}

//图片的显示
function displayNewImg(user,img){
    $("#v"+fid).append('<li class="'+(user === "me" ? "me" : "other")+'">'+
        '<div class="time">'+
        '<span>time</span>'+
        '</div>'+
        '<div class="msg">'+
        '<img src="/images/2.jpg" class="img-rounded">'+
        '<img class="ownImg" src="'+img+'"/>'+
        '</div>'+
        '</li>'
    );
    $("#v"+fid).scrollTop($("#v"+fid)[0].scrollHeight);
}

//ctrl+v粘贴之后发送图片
function doPaste(e){
    var clipboardData = e.originalEvent.clipboardData;
    if(clipboardData) {
        for(var i = 0; i < clipboardData.items.length; i++) {
            var c = clipboardData.items[i];
            var file = c.getAsFile();
            var reader = new FileReader();
            reader.onload = function(e) {
                socket.emit('sendImg',uid,fid,e.target.result);
                displayNewImg('me',e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }
}
