  $(".index-code").hide();
  $(".index-user").hide();
  $(".navs-1").click(function(){
        $(".navs-2").removeClass('active');
        $(".navs-3").removeClass('active');
        $(".navs-1").addClass("active")
        $(".index-txt").show();
        $(".index-code").hide();
        $(".index-user").hide();
  })
  $(".navs-2").click(function(){
        $(".navs-1").removeClass('active');
        $(".navs-2").addClass("active");
        $(".navs-3").removeClass('active');
        $(".index-code").show();
        $(".index-txt").hide();
        $(".index-user").hide();
  })
  $(".navs-3").click(function(){
        $(".navs-1").removeClass('active');
        $(".navs-2").removeClass('active');
        $(".navs-3").addClass("active");
        $(".index-code").hide();
        $(".index-txt").hide();
        $(".index-user").show();
  })


  //设置删除
  $(".index-txt").on('click','tbody .del',function(e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id' + id);

         $.ajax({
              type: 'post',
              data:{'id':id},
              url: '/index.php?r=delete/essay'
          })
         .done(function (results) {
              if (results.success) {
                  if (tr.length > 0) {
                      tr.remove();
                  }
              }
          })
         window.location.reload();
  })
  $(".index-code").on('click','tbody .del',function(e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id' + id);

         $.ajax({
             type: 'post',
             data:{'id':id},
             url: '/index.php?r=delete/learn'
          })
         .done(function (results) {
              if (results.success) {
                  if (tr.length > 0) {
                      tr.remove();
                  }
              }
          })
         window.location.reload();
  })
  $(".index-user").on('click','tbody .del',function(e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id' + id);

         $.ajax({
             type: 'post',
             data:{'id':id},
             url: '/index.php?r=delete/user'
          })
         .done(function (results) {
              if (results.success) {
                  if (tr.length > 0) {
                      tr.remove();
                  }
              }
          })
         window.location.reload();
  })


  //当用户登入时获取用户的名称
  $.ajax({
      url: "/index.php?r=user/index",    //请求的url地址
      //dataType: "json",   //返回格式为json
      async: true, //请求是否异步，默认为异步，这也是ajax重要特性
      type: "GET",   //请求方式
      success: function(data) {
          //请求成功时处理
          var data = data;
          //设置用户访问权限
          $.ajax({
              url: "/index.php?r=user/role",    //请求的url地址
              //dataType: "json",   //返回格式为json
              async: true, //请求是否异步，默认为异步，这也是ajax重要特性
              type: "post",   //请求方式
              data: {'name': data},
              success: function(data) {
                  if(JSON.parse(data).role < 52){
                      swal({
                          title: "你的权限不够，请向王老迪申请权限后再来访问！",
                          type: "error",
                          showCancelButton: false,
                          closeOnConfirm: false,
                          confirmButtonText: "确定",
                          confirmButtonColor: "#6ffabc"
                      },function(){
                          location.href = "index.html";
                      })
                  }
              }
          });
      }
  });
