$.ajax({
    url: "/index.php?r=user/index",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    beforeSend: function() {
        //请求前的处理
    },
    success: function(data) {
        //请求成功时处理
        console.log("---------------------")
        console.log("用户名为" + data.name)
        console.log("---------------------")
        $("#denglu").hide();
        $("#user-name").text(data.name);
    },
    complete: function() {
        //请求完成的处理
    },
    error: function() {
        //请求出错处理
        console.log("没有用户登录")
        $("#dengchu").hide();
    }
});