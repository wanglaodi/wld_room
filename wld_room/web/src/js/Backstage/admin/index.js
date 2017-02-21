  $(".index-code").hide();
  $(".navs-1").click(function(){
        $(".navs-2").removeClass('active');
        $(".navs-1").addClass("active");
        $(".index-txt").show();
        $(".index-code").hide();
  });
  $(".navs-2").click(function(){
        $(".navs-1").removeClass('active');
        $(".navs-2").addClass("active");
        $(".index-code").show();
        $(".index-txt").hide();
  });

  //设置表单验证


  //得到参数
  var mystr = this.location.href;
  var _id =  lookup("id");

  function lookup(x) {
        var index1 = mystr.indexOf(x);
        var index = x.length;
        var index_1 = mystr.indexOf("&", index1);
        if (index_1 == -1) {
            index_1 = mystr.length;
        }
        var index1s = mystr.substring(index1 + index + 1, index_1);
        return index1s;
   }

  //调用更新文章接口，拿到从list页面post过来的数据;
  $.ajax({   
       url:'/index.php?r=update/essay',
         type:'post',   
         data:{
              id: _id
          },
      dataType: "json",   //返回格式为json
        async : false,
        error:function(){   
           console.log('error');   
         },   
        success:function(data){
            $("#inputPic").val(data.pic);
            $("#inputName").val(data.name);
            $("#inputYear").val(data.year);
            $("#inputMonth").val(data.month);
            $("#inputDay").val(data.day);
            $("#inputTitle").val(data.title);
            $("#inputTxt").val(data.txt);
            $("#inputTag").val(data.tag);
            $("#inputNum").val(data.num);
            $("#indexID").val(data._id);
        }
  });

  //调用更新学习接口，拿到从list页面post过来的数据;
  $.ajax({   
       url:'/index.php?r=update/learn',
         type:'post',   
         data:{
              id: _id
          },
        async : false,
        error:function(){   
           console.log('error'); 
         },   
        success:function(data){   
            $("#inputFunctions").val(data.functions);
            $("#inputExperience").val(data.experience);
            $("#inputAddress").val(data.address);
            $("#indexCodeID").val(data._id);
        }
  });

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