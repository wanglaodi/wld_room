
var M1 = Backbone.Model.extend({});
var C1 = Backbone.Collection.extend({
    model:M1,
    url:"/index.php?r=essays/index"
});
var Ep = new C1();
var V1 = Backbone.View.extend({
    tagName:  "li",
    template:_.template($("#writing").html()),
    render:function() {
       this.$el.html(this.template(this.model.toJSON()));
       return this;
    }
});

var Vi1 = Backbone.View.extend({
    el:$("body"),
    initialize:function() {
        this.listenTo(Ep, "add", this.addOne);
        Ep.fetch({
            method:"get",
        });
    },
    addOne: function(todo) {
        var view = new V1({model: todo});
        this.$(".info-ct ul").append(view.render().el);
        },
})
var Writing = new Vi1();