
   //验证用户的表单填入
var validator;
$(document).ready(function () {
    $.validator.setDefaults({
        debug: true
    });

    validator = $("#defaultForm").validate({
        rules: {
            username: {
                //required: true,
                required: true,
                minlength: 2,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16
            }
        },
        messages: {
            username: {
                required: "必须填写用户名",
                minlength: "用户名最小为2位",
                maxlength: "用户名最大为10位",
                rangelength: "用户名应该在2-10位"
            },
            password: {
                required: "必须填写密码",
                minlength: "密码最小为6位",
                maxlength: "密码最大为16位"
            }
        }
    });


    $("#user-signup").click(function () {
        if($("#defaultForm").valid()){
            //注册时用户信息提示
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
                        if(data == 0){
                            swal({
                                title: "这条用户名已经存在了，快去登录吧，亲！",
                                type: "error",
                                showCancelButton: false,
                                closeOnConfirm: false,
                                confirmButtonText: "确定",
                                confirmButtonColor: "#6ffabc"
                            },function(){
                                location.href = "signin.html";
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
                                location.href ="signin.html";
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
                            location.href = "signup.html";
                        })
                    }
                });
        }else{
            swal({
                title: "填写出错，王老迪表示很鄙视你",
                type: "error",
                showCancelButton: false,
                closeOnConfirm: false,
                confirmButtonText: "确定",
                confirmButtonColor: "#6ffabc"
            },function(){
                location.href = "/signup.html";
            })
        }
    });
});