  //ajax 传值给后台查询验证用户
  $("#user-signin").click(function(){
        $.ajax({
                url: "/index.php?r=user/signin",    //请求的url地址
                //dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "POST",   //请求方式
                data:{'name':$('#signupName').val(),'password':$('#signupPassword').val()},
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
                                location.href = "/src/html/index.html";
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
                        window.location.reload();
                    })
                }
        });
})