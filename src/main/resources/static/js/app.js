var app = (function () {

  let authorName = "";
  let author;
  let points = [];

    function setPoints(tuple){
        points.push(tuple);
    }

    function getPoints(){
        return points;
    }
    /**
     * This function obtains the name of the author typed in the search bar
     * also evaluate if the name is not valid or doesn't exists
     * if is valid, will add the data of the author in the table
     */
    function getNameAuthorBlueprints() {
       author = $("#author").val();
       if (author === "") {
           alert("Incorrect name !");
       } else {
           apiclient.getBlueprintsByAuthor(author, (req, resp) => {
               createTableData(resp);
           });
       }
    }

    /**
     * This function obtains the name of the author typed in the search bar
     * also evaluate if the name is not valid or doesn't exists
     * if is valid, will draw the lines with the given points
     */
    function getBlueprintsByNameAndAuthor(author,name) {
       if (author === "") {
           alert("Incorrect name !");
       } else {
        apiclient.getBlueprintsByNameAndAuthor(author,name, (req, resp) => {
        console.log(resp);
             draw(resp);
         });
       }
    }

    /**
     * This function obtains the name of the author typed in the search bar
     * also evaluate if the name is not valid or doesn't exists
     * if is valid, will draw the lines with the given points
     */
    function draw(data){
        const points = data.points;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        ctx.beginPath();
        for (let i = 0; i<points.length-1 ; i++){
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i+1].x, points[i+1].y);
            ctx.stroke();
        }
    }

    /**
     * This function obtains the name of the author typed in the search bar
     * also evaluate if the name is not valid or doesn't exists
     * if is valid, will draw the lines with the given points
     */
    function createTableData(data) {
        let table = $("#fl-table tbody");
        table.empty();
        if (data !== undefined) {
          $("#author-name").text(author + "'s " + "blueprints:");
          const datanew = data.map((blueprint) => {
              return {
                  name: blueprint.name,
                  puntos: blueprint.points.length
              }
          });
          datanew.forEach(({name, puntos}) => {
          table.append(
                          `<tr>
                            <td>${name}</td>
                            <td>${puntos}</td>
                          `
                          +"<td> <button onclick= app.getBlueprintsByNameAndAuthor('"+$("#author").val()+"','"+name+"')>Open</button></td></tr>"
                      );
                  })
          const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
          $("#totalPoints").text(totalPuntos);
        } else {
            alert("Author dont found!");
            $("#author-name").empty();
            $("#totalPoints").empty();
        }
    }

    function addBlueprint(){
        author = $("#author").val();
        let bpname = prompt('Insert the name of the new bpname');

        apiclient.addBlueprint(parseString(points),author,bpname, (req, resp) => {
            window.setTimeout(function(){
                getBlueprintsByNameAndAuthor(author,resp);
            }, 600);
        });
        points=[];
        getNameAuthorBlueprints();
    }

    function 

    //"{'x':140,'y':140},{'x':115,'y':115}"
    function parseString(array){
        let string = "";
        for (let i = 0; i<array.length; i++){
            string += "{'x':"+array[i][0] +",'y':"+array[i][1]+"}" ;
            if (i!=array.length-1) string+=",";
        }
        return string;
    }

    function updateBlueprint() {
        let bp = [{"x":140,"y":140},{"x":115,"y":115}];
        author = $("#author").val();
        let bpname = "firstBlueprint";
        apiclient.updateBlueprint(author,bpname, (req, resp) => {
           getBlueprintsByNameAndAuthor(author,resp);
        });
    }

    function deleteBlueprint() {
        author = $("#author").val();
        let bpname = prompt('Insert the name of the blueprint you want to delete');
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        apiclient.deleteBlueprint(author,bpname, (req, resp) => {
        });
        getNameAuthorBlueprints();
    }

  return {
    getNameAuthorBlueprints: getNameAuthorBlueprints,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    updateBlueprint: updateBlueprint,
    deleteBlueprint: deleteBlueprint,
    setPoints : setPoints,
    getPoints : getPoints,
    addBlueprint : addBlueprint,
    deleteBlueprint : deleteBlueprint
  };

})();