 var M11 = Backbone.Model.extend({});
            var C11 = Backbone.Collection.extend({
                model:M11,
                url:"/index.php?r=comment/get"
            });
            var Ep1 = new C11();
            var V11 = Backbone.View.extend({
                template:_.template($("#codeComment").html()),
                render:function() {
                    Model = this.model.toJSON();
                    templates = this.template(Model);
                    this.$el.html(templates);
                    return this;
                }
            });

            var Vi11 = Backbone.View.extend({
                el:$("body"),
                initialize:function() {
                    this.listenTo(Ep1, "add", this.addOne);
                    Ep1.fetch({
                        method:"post",
                        data:{
                            id: _id
                        },
                        success: function (data) {
                            if(data.toJSON() != ""){
                                $(".comment-no").hide();
                            }
                        }
                    });
                },
                addOne: function(todo) {
                    var view = new V11({model: todo});
                    this.$(".comment-zw").append(view.render().el);
                }
            })

            var mystr = this.location.href;
            var _id =  lookup("id");
            var asd = new Vi11();

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
