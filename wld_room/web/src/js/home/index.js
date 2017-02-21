 var apps;
var app;
// $(function(){
//      $.cookie("valuetxt",$('#valint').val(), { path: "/" })
//      alert($.cookie("valuetxt"));
// })


$("#btn-a").click(function(){
        alert($.cookie("valuetxt"));
 })

//设置宽度
 var a = $(".container").width();
$(".cn-container").css("width",a);


Compute(475,"#jumu","height");

function Compute(size,id,attribute)
{
    var width = $("body").width();
    size1 = width * size / 1920;
    $(id).css(attribute,size1+"px");
}

window.onresize = function(){
    Compute(475,"#jumu","height");
    $(".cn-container").css("width",a);
}


window.onload= function(){
     //获取首页文章长度
        $(".txt-i").each(function(){
            var leng = $(this).text().length;

            
            if(leng > 150){
                var num = $(this).html().substr(0,150);
                $(this).html(num + "……");
            }
        })
        
  }

//获取当天的天数时间
var time;
var year;
var month;
var day;
time = new Date();
year =  time.getFullYear();
month = time.getMonth() +1;
day = time.getDate();
$(".info-jm").append("<h1>"+ year +"年"+ month +"月"+ day +"日</h1>");


//暂停和播放音乐
$(".musics").click(function(){
    var audio = document.getElementById("audio");
    if(audio!==null){             
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(audio.paused) {                 
            audio.play();//audio.play();// 这个就是播放  
        }else{
            audio.pause();// 这个就是暂停
        }
     }
    $("#musics").hasClass("musics-xz")?$("#musics").removeClass("musics-xz"):$("#musics").addClass("musics-xz");
    $("#musics").hasClass("musics-xz")?$(".cn-container .cn-nav ul li a:hover span").css("display","none"):$(".cn-container .cn-nav ul li a:hover span").css("display","inline");
})

//判断列表数量，由后台添加，前台判断生成
function add(title,functionsName){
        if(title === "slide-1"){
                    var title1 = "#slide-1-1";
                    var t2 = "#slide-1-"
                }else if(title === "slide-2"){
                    var title1 = "#slide-2-1";
                    var t2 = "#slide-2-"
                }else if(title === "slide-3"){
                    var title1 = "#slide-3-1";
                    var t2 = "#slide-3-"
             }
        if( $("#"+title).find("nav").text() === "" )
            {
                $("#"+title).find("nav").append("<a href="+ title1 +">" + functionsName + "</a>")
                t2 = t2 + "1";
            }else{
                var t = $("#"+title+" nav").find("a").last().attr('href');
                var t1 = t.substring(9,t.length);
                t1++;
                t2 = t2 + t1;
                $("#"+title).find("nav").append("<a href="+ t2 +">" + functionsName + "</a>")
            }
            return t2;
}

//判断用户的登入和登出
//当用户登入时获取用户的名称
$.ajax({
        url: "/index.php?r=user/index",    //请求的url地址
        //dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        beforeSend: function() {
            //请求前的处理
        },
        success: function(data) {
            //请求成功时处理
            if(data != ""){
                console.log("---------------------")
                console.log("用户名为" + data)
                console.log("---------------------")
                $("#denglu").hide();
                $("#user-name").text(data);
            }else{
                console.log("没有用户登录")
                $("#dengchu").hide();
            }

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
});

//登录时用户信息提示
$("#user-signin").click(function(){
        $.ajax({
                url: "/index.php?r=user/signin",    //请求的url地址
//                                  dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "POST",   //请求方式
                data:{'name':$('#signinName').val(),'password':$('#signinPassword').val()},
                beforeSend: function() {
                    //请求前的处理
                },
                success: function(data) {
                    //请求成功时处理
                    // 0：没有用户，1：登录正确 ， 2：密码错误
                    if(data == 0){
                         swal({ 
                                title: "没有这个用户名丫，亲！", 
                                type: "error", 
                                showCancelButton: false, 
                                closeOnConfirm: false, 
                                confirmButtonText: "确定", 
                                confirmButtonColor: "#6ffabc"
                            },function(){
                                location.href = "signup.html";
                            })
                    }else if(data == 1){
                        swal({ 
                                title: "登录正确", 
                                type: "success", 
                                showCancelButton: false, 
                                closeOnConfirm: false, 
                                confirmButtonText: "确定", 
                                confirmButtonColor: "#6ffabc"
                            },function(){
                                window.location.reload(true);
                            })
                    }else if(data == 2){
                        swal({ 
                                title: "你是猪吗？密码都不记得", 
                                type: "error", 
                                showCancelButton: false, 
                                closeOnConfirm: false, 
                                confirmButtonText: "确定", 
                                confirmButtonColor: "#6ffabc"
                            },function(){
                                location.href = "signin.html";
                            })
                    }
                },
                complete: function() {
                    //请求完成的处理
                },
                error: function() {
                    //请求出错处理
                    swal({ 
                        title: "出错了，快联系王老迪", 
                        type: "error", 
                        showCancelButton: false, 
                        closeOnConfirm: false, 
                        confirmButtonText: "确定", 
                        confirmButtonColor: "#6ffabc"
                    },function(){
//                                            location.href = "/";
                    })
                }
        });
})
 //注册时用户信息提示
$("#user-signup").click(function(){

    $.ajax({
        url: "/index.php?r=user/signup",
         //请求的url地址
        //dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "post",   //请求方式
        data:{'name':$('#signupName').val(),'password':$('#signupPassword').val()},
        success: function(data) {
//                              //请求成功时处理
//                              // 0：没有用户，1：登录正确 ， 2：密码错误
             alert(data)
            if(data == 0){
                swal({
                    title: "这条用户名已经存在了，快去登录吧，亲！",
                    type: "error",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#6ffabc"
                    },function(){
                         location.href = "/signin.html";
                })
            }else if(data == 1){
                 swal({
                    title: "注册成功,快去登录吧，亲!",
                    type: "success",
                    showCancelButton:false,
                    closeOnConfirm:false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#6ffabc"
                    },function(){
                        location.href ="/signin.html";
                    })
            }
        },
//                            complete: function() {
//                                //请求完成的处理
//                            },
      error: function() {
            //请求出错处理
            swal({
                title: "出错了，快联系王老迪",
                type: "error",
                showCancelButton: false,
                closeOnConfirm: false,
                confirmButtonText: "确定",
                confirmButtonColor: "#6ffabc"
            },function(){
             location.href = "/";
            })
       }
    });
 })