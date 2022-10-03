var app = (function () {

  let authorName = "";
  let author;

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
           apimock.getBlueprintsByAuthor(author, (req, resp) => {
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
        apimock.getBlueprintsByNameAndAuthor(author,name, (req, resp) => {
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

  return {
    getNameAuthorBlueprints: getNameAuthorBlueprints,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
  };

})();