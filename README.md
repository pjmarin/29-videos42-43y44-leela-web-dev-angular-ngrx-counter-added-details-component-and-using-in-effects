Despues de haber instalado @ngrx/router-store, hemos vuelto a implementar la persistencia de datos en el front (funcionalidad de estar logado)
utilizando localStorage, ya que al utilizar la store, se pierden los datos al actualizar o refrescar la pagina.

Hemos implementado en el router de la store un serializer, que es una forma de coger solo los datos que nos interesan (en nuestro caso cogemos 
"url", "params" y "queryParams"), porque el router por defecto de ngrx es muy amplio y hay que buscar  los datos a unos niveles de profundidad grandes

Hemos agragado un componente "details", y un service "getPostById". Cuando refrescamos la pagina mantenemos los datos del post actual a traves del servicio, 
llamando a getPostById cada vez que refrescamos




