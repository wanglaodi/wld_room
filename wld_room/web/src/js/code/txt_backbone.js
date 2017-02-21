
var M1 = Backbone.Model.extend({});
var C1 = Backbone.Collection.extend({
    model:M1,
    url:"/index.php?r=gettxt/index"
});
var Ep = new C1();
var V1 = Backbone.View.extend({
    template:_.template($("#codeTxt").html()),
    render:function() {
       Model = this.model.toJSON();
       templates = this.template(Model);
       templates = templates.replace("@href-top", herf_top);
       templates = templates.replace("@href-bottom", herf_bottom);
       this.$el.html(templates);
       return this;
    }
});

var Vi1 = Backbone.View.extend({
    el:$("body"),
    initialize:function() {
        this.listenTo(Ep, "add", this.addOne);
        Ep.fetch({
            method:"post",
            data:{
              id: _id
            }
        });
    },
    addOne: function(todo) {
        var view = new V1({model: todo});
        this.$(".info-me-zw").append(view.render().el);
        },
})

var mystr = this.location.href;
var _id =  lookup("id");
var _id_top = parseInt(_id) + 1;
var _id_bottom = parseInt(_id) - 1;
var mystr1 = mystr.substr(0, mystr.indexOf('='));
var herf_top = mystr1 + "=" + _id_top;
var herf_bottom = mystr1 + "=" + _id_bottom;

var Writing = new Vi1();


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
