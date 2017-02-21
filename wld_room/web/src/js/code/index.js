window.onload= function() {
            $(".submit").hide();
            $(".comment textarea").click(function () {
                $(".submit").show();
            });

            $('.comment-zw').on('click','.glyphicon',function(){
                //获得被评论人昵称
                var user_name = $(this).parents(".ct-center").prev().find('.user_name').html();
                $(this).parents(".ct-top").find(".comment_reply").show();
                $(this).parents(".ct-top").find(".to_name").text("回复 : " + user_name);

                //获得record_id
                var record_id = $(this).parents(".ct-top").find('.record_id').text();

                //获得评论人昵称
                var name = $('#user-name').text();

                $(this).parents(".ct-top").find(".submit a").click(function(){

                    //获得评论信息
                    var txt = $(this).parents(".ct-top").find(".commentst textarea").val();

                    $.ajax({
                        url: "index.php?r=comment/after",    //请求的url地址
                        //dataType: "json",   //返回格式为json
                        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                        data:{'user_name':user_name,'to_user_name':name,'comment_id':record_id,'comment_txt':txt},
                        type: "post",   //请求方式
                        success: function() {
                            alert("成功！");
                            window.location.reload();
                        },
                        error: function() {
                            //请求出错处理
                            alert("出错！");
                        }
                    });
                });
            });

            //当用户登入时获取用户的名称
            $.ajax({
                url: "/index.php?r=user/index",    //请求的url地址
                //dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (data) {
                    //请求成功时处理
                    if (data != "") {
                        console.log("---------------------")
                        console.log("用户名为" + data)
                        console.log("---------------------")
                        $("#denglu").hide();
                        $("#user-name").text(data);

                        //设置用户访问权限
                        $.ajax({
                            url: "index.php?r=user/role",    //请求的url地址
                            //dataType: "json",   //返回格式为json
                            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                            type: "post",   //请求方式
                            data: {'name': $("#user-name").text()},
                            success: function (data) {
                                if (JSON.parse(data).role < 11) {
                                    swal({
                                        title: "你的权限不够，请向王老迪申请权限后再来访问！",
                                        type: "error",
                                        showCancelButton: false,
                                        closeOnConfirm: false,
                                        confirmButtonText: "确定",
                                        confirmButtonColor: "#6ffabc"
                                    }, function () {
                                        location.href = "index.html";
                                    })
                                }
                            }
                        });

                    } else {
                        console.log("没有用户登录")
                        $("#dengchu").hide();
                    }

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        }

        //评论JS代码 
          $(".submit").click(function(){
          var txt = $('.panel-body textarea').val();
          var name = $('#user-name').text();
          $.ajax({
              url: "/index.php?r=comment/run",    //请求的url地址
              //dataType: "json",   //返回格式为json
              async: true, //请求是否异步，默认为异步，这也是ajax重要特性
              data:{'comment_txt':txt,'comment_name':name,'comment_id':_id},
              type: "post",   //请求方式
              success: function() {
                    alert("成功！");
                    window.location.reload();
              },
              error: function() {
                  //请求出错处理
                  alert("出错！");
              }
          });
      });