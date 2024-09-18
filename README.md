## Pasos para ejecutar el proyecto

1. Clonar el repositorio.

2. Abrir el proyecto dentro de la consola de comandos CMD y ejecutar el comando `npm i` para instalar las dependencias.

3. Ejecutar el comando `npm run start` para ejecutar el proyecto en modo local.

## Puede probar el proyecto de 3 formas:

    1. Postman:
    	Realizar una solicitud GET a los diferentes endpoints:
    		1.1 Listado de 100 pokemon: http://localhost:3000/api/pokemon

    		1.2 Listado de un pokemon por ID: http://localhost:3000/api/pokemon/5

    		1.3 Listado de un pokemon y sus tipos por ID: http://localhost:3000/api/pokemonAndTypes/5

    2. Swagger:
    	Abrir el navegador en la ruta http://localhost:3000/api

    3. Servidor Heroku:
    	Realizar una solicitud GET a los diferentes endpoints:
    		1.1 Listado de 100 pokemon: https://api-connector-pokemon-cbe2e4118ccb.herokuapp.com/api/pokemon

    		1.2 Listado de un pokemon por ID: https://api-connector-pokemon-cbe2e4118ccb.herokuapp.com/api/pokemon/5

    		1.3 Listado de un pokemon y sus tipos por ID: https://api-connector-pokemon-cbe2e4118ccb.herokuapp.com/api/pokemonAndTypes/5
