
apiclient=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115},{"x":140,"y":140},{"x":140,"y":140}],"name":"gear2"}];
	mockdata["jay"] = [
	 {author:"jay","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"firsblueprint"},
	 {author:"jay","points":[{"x":70,"y":110},{"x":200,"y":110},{"x":135,"y":170},{"x":70,"y":110},{"x":205,"y":110}],"name":"TriangleZaZ"}]

	return {
		getBlueprintsByAuthor:function(authname,callback){

           const get_request = $.get({
                url: "/blueprints/" + authname,
                contentType: "application/json",
            });
            get_request.then(function (data) {
                callback(data, data);
              }, function (error) {
                alert("The author doesn't exists !")
              }
            );

		},

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            const get_request = $.get({
                url: "/blueprints/"+authname+"/"+bpname,
                contentType: "application/json",
            });
            get_request.then(function(data) {
                if (data===[]){callback(null,null)}
                callback(data,data);
                }, function(error){
                    alert("The author or the blueprint name doesn't exists !");
                }
            );
		},

		updateBlueprint:function(callback){
		    let points = app.getPoints();
		    let author = "jay1";
		    let bpname = "anotherBlueprint1";
		    let newauthor = "jay2";
		    let newbpname = "putblueprinttest";
            const put_request = $.ajax({
                url: "/blueprints/"+author+"/"+bpname,
                type: "PUT",
                data: '{"points":'+JSON.stringify(points)+',"bpname":'+bpname+',"author":'+author+'}',
                contentType: "application/json",
//                success: function (data) {
//                    $.getScript(useSelectedModule, function () {
//                        api.getBlueprintsByAuthor(author, (req, resp) => {
//                            app.parceroData(resp);
//                        });
//                    });
//                }
            });
            console.log(put_request);
            put_request.then(function (data) {
                callback(data);
              }, function (error) {
                alert("The author doesn't exists !")
              }
            );
        },

        addBlueprint:function(points,author,bpname,callback){
            console.log(points);
            const put_request = $.ajax({
                url: "/blueprints/"+author+"/"+bpname+"/"+points,
                type: "POST",
                data: '{"points":'+JSON.stringify(points)+',"bpname":'+bpname+',"author":'+author+'}',
                contentType: "application/json",
            }); callback(null,bpname,bpname);
        }
	}

})();

