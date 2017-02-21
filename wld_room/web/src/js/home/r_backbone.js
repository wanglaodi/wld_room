   var subset;
var slide;

var M = Backbone.Model.extend({});
var C = Backbone.Collection.extend({
  model:M,
  url:"/index.php?r=learn/run"
});
var Ep = new C();
var V = Backbone.View.extend({
  
  template:_.template($("#practice").html()),
  render:function() {
     Model = this.model.toJSON();

     title = Model.title;
     functions = Model.functions;
     title1 = $("#slide-1").find("h2").text();
     title2 = $("#slide-2").find("h2").text();
     title3 = $("#slide-3").find("h2").text();

     if(title === title1)
     {
          t = "slide-1";
          var t2 = add(t,functions);
          t2 = t2.substring(1,t2.length);
     }
     if(title === title2)
     {
          t = "slide-2";
          var t2 = add(t,functions);
          t2 = t2.substring(1,t2.length);
     }
     if(title === title3)
     {
          t = "slide-3";
          var t2 = add(t,functions);
          t2 = t2.substring(1,t2.length);
     }

  templates = this.template(Model);
  templates = templates.replace("@subset", t2);
  templates = templates.replace("@slide", t);
  this.$el.html(templates);
  return this;
  }
});

var Vi = Backbone.View.extend({
  el:$("body"),
  initialize:function() {
      this.listenTo(Ep, "add", this.addOne);
      Ep.fetch({
          method:"get",
      });
  },
  addOne: function(learn) {
      var view = new V({model: learn});
      this.$(".sld").append(view.render().el);
  },
})
var Practice = new Vi();