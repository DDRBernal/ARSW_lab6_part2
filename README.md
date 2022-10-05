#### Escuela Colombiana de Ingeniería
#### Procesos de desarrollo de software - PDSW
#### Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3. Parte II.



![image](https://user-images.githubusercontent.com/46855679/192689497-226e50a0-9c54-4ed2-805e-0796bf545b15.png)

1. Agregue al canvas de la página un manejador de eventos que permita capturar los 'clicks' realizados, bien sea a través del mouse, o a través de una pantalla táctil. Para esto, tenga en cuenta [este ejemplo de uso de los eventos de tipo 'PointerEvent'](https://mobiforge.com/design-development/html5-pointer-events-api-combining-touch-mouse-and-pen) (aún no soportado por todos los navegadores) para este fin. Recuerde que a diferencia del ejemplo anterior (donde el código JS está incrustado en la vista), se espera tener la inicialización de los manejadores de eventos correctamente modularizado, tal [como se muestra en este codepen](https://codepen.io/hcadavid/pen/BwWbrw).

2. Agregue lo que haga falta en sus módulos para que cuando se capturen nuevos puntos en el canvas abierto (si no se ha seleccionado un canvas NO se debe hacer nada):
	1. Se agregue el punto al final de la secuencia de puntos del canvas actual (sólo en la memoria de la aplicación, AÚN NO EN EL API!).
	2. Se repinte el dibujo.

3. Agregue el botón Save/Update. Respetando la arquitectura de módulos actual del cliente, haga que al oprimirse el botón:
	1. Se haga PUT al API, con el plano actualizado, en su recurso REST correspondiente.
	2. Se haga GET al recurso /blueprints, para obtener de nuevo todos los planos realizados.
	3. Se calculen nuevamente los puntos totales del usuario.

	Para lo anterior tenga en cuenta:

	* jQuery no tiene funciones para peticiones PUT o DELETE, por lo que es necesario 'configurarlas' manualmente a través de su API para AJAX. Por ejemplo, para hacer una peticion PUT a un recurso /myrecurso:

	```javascript
    return $.ajax({
        url: "/mirecurso",
        type: 'PUT',
        data: '{"prop1":1000,"prop2":"papas"}',
        contentType: "application/json"
    });
    
	```
	Para éste note que la propiedad 'data' del objeto enviado a $.ajax debe ser un objeto jSON (en formato de texto). Si el dato que quiere enviar es un objeto JavaScript, puede convertirlo a jSON con: 
	
	```javascript
	JSON.stringify(objetojavascript),
	```
	* Como en este caso se tienen tres operaciones basadas en _callbacks_, y que las mismas requieren realizarse en un orden específico, tenga en cuenta cómo usar las promesas de JavaScript [mediante alguno de los ejemplos disponibles](http://codepen.io/hcadavid/pen/jrwdgK).

4. Agregue el botón 'Create new blueprint', de manera que cuando se oprima: 
	* Se borre el canvas actual.
	* Se solicite el nombre del nuevo 'blueprint' (usted decide la manera de hacerlo).
	
	Esta opción debe cambiar la manera como funciona la opción 'save/update', pues en este caso, al oprimirse la primera vez debe (igualmente, usando promesas):

	1. Hacer POST al recurso /blueprints, para crear el nuevo plano.
	2. Hacer GET a este mismo recurso, para actualizar el listado de planos y el puntaje del usuario.

El primer paso es buscar un autor que ya exista como se muestra en la imagen.

![image](https://user-images.githubusercontent.com/46855679/193969696-cb413d2c-ff11-457f-a916-9adea6715a0c.png)

Ahora para agregar un blueprint al autor buscado anteriormente damos click en "create new blueprint", nos saldra un pequeño mensaje indicando que podemos pintar el nuevo blueprint clickeando en el canvas los puntos que deseemos.

![image](https://user-images.githubusercontent.com/46855679/193969947-21fb0a85-cdbf-4cb3-a668-77cf654e156a.png)

Una vez hayamos clickeado los puntos en el canvas, damos click en *Save/update* colocaremos el nombre de nuestro blueprint a agreagar o modificar.

![image](https://user-images.githubusercontent.com/46855679/193970242-a6297e8a-4915-4de1-942c-73bb476c9dd3.png)

Luego se pintara nuestro blueprint.

![image](https://user-images.githubusercontent.com/46855679/193969839-f9bfe5f9-c806-48b5-9063-342d822d97f6.png)


5. Agregue el botón 'DELETE', de manera que (también con promesas):
	* Borre el canvas.
	* Haga DELETE del recurso correspondiente.
	* Haga GET de los planos ahora disponibles.

Si queremos borrar un blueprint del autor, solamente basta con dar click en delete.

![image](https://user-images.githubusercontent.com/46855679/193970764-5ac44b18-b78c-482a-a095-c65048ecfd4c.png)

Ponemos el nombre del blueprint que queremos borrar y listo!

![image](https://user-images.githubusercontent.com/46855679/193970893-eafe71f1-8559-46b3-9b5b-9d59fa43b3f4.png)

![image](https://user-images.githubusercontent.com/46855679/193970938-567d3c85-e240-4378-a369-bab33c2ad884.png)

![image](https://user-images.githubusercontent.com/46855679/193970981-ada6a6be-b94b-4d4f-8477-f5fb47bf2771.png)

### Criterios de evaluación

1. Funcional
	* La aplicación carga y dibuja correctamente los planos.
	* La aplicación actualiza la lista de planos cuando se crea y almacena (a través del API) uno nuevo.
	* La aplicación permite modificar planos existentes.
	* La aplicación calcula correctamente los puntos totales.
2. Diseño
	* Los callback usados al momento de cargar los planos y calcular los puntos de un autor NO hace uso de ciclos, sino de operaciones map/reduce.
	* Las operaciones de actualización y borrado hacen uso de promesas para garantizar que el cálculo del puntaje se realice sólo hasta cando se hayan actualizados los datos en el backend. Si se usan callbacks anidados se evalúa como R.
	
