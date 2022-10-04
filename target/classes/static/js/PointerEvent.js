var PointerEvent = (function () {

    points = []

    function clearPoints(){
        points = [];
    }

    function getPoints(){
        return points;
    }

    function eventListener(){
        alert("Draw the points in the canvas and then click on save for show it!");
        const elem2 = document.getElementById('myCanvas');
        if (elem2!=undefined && elem2!==null){
            console.log(elem2);
            var elem = document.getElementById('myCanvas'),
                elemLeft = elem.offsetLeft,
                elemTop = elem.offsetTop,
                context = elem.getContext('2d'),
                elements = [];
            // Add event listener for `click` events.
            elem.addEventListener('click', function(event) {
                var x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;
                console.log(x, y);
                let tuple = [x,y];
                app.setPoints(tuple);
            }, false);

            // Add element.
            elements.push({
                colour: '#FFFFFF',
                width: 800,
                height: 300,
                top: 0,
                left: 0
            });

            // Render elements.
            elements.forEach(function(element) {
                context.fillStyle = element.colour;
                context.fillRect(element.left, element.top, element.width, element.height);
            });
        }
    }
    return {
        eventListener: eventListener,
        getPoints : getPoints
      };
})();