# Api PeliValoración

## Esta es una api para calificar películas y series con la persona más especial de tu vida, esta pensanda para los amantes del entretenimiento y que disfrutan analizar cada detalle de una película o serie.

# Caracteristicas Principales

- Autentificación de usurios, para que la opinion de cada uno sea unica y no se mezcle con la de otra persona
- Vinculación de parejas, para que solo tu pareja pueda ver tus calificaciones y tu puedas ver las de tu pareja
- Amplio catalogo de peliculas y series, para que puedas encontrar la pelicula o serie que quieras calificar gracias a la API externa de TMDB
- Sistema de calificaciones, para que puedas calificar cada pelicula o serie con un puntaje del 1 al 10
- Sistema de comentarios, para que puedas dejar comentarios en cada pelicula o serie
- Optimización de consultas a la API de TMDB, gracias a Redis

# Tecnologias Utilizadas

- Node.js
- Typescript
- Express
- MongoDB
- Bcrypt
- Jsonwebtoken
- Swagger
- Mongoose
- EJS
- Redis

# Estructura del proyecto

- src
  - modules
    - auth
    - couple
    - coupleMovies
    - movies
    - user
  - shared
    - config
    - db
    - middlewares
    - swagger
    - types
    - utils
  - views
  - app.ts
  - index.ts
  - tmdb.ts
- .env
- .gitignore
- README.md
- package.json
- tsconfig.json

# Instalación

git clone https://github.com/jahdiel/PeliValoracion.git
npm install
npm run dev

# Configuración del Entorno

crea un archivo .env en la raiz del proyecto y agrega las siguientes variables:

API_KEY=tu_api_key_de_tmdb
MONGO_URL="mongodb://localhost:27017/peli_valoracion"
JWT_SECRET=tu_jwt_secret
REDIS_URL=tu_redis_url
REDIS_TOKEN=tu_redis_token

# ENDPOINTS Principales

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

GET /api/couple/getCode
POST /api/couple/validate
PUT /api/couple/:id
GET /api/couple/:id
DELETE /api/couple/:id

GET /api/movies/search
GET /api/movies/now-playing
GET /api/movies/top-rated
GET /api/movies/popular

POST /api/coupleMovies/
POST /api/coupleMovies/couple/:coupleId/movie/:movieId/rating
GET /api/coupleMovies/:coupleId/:movieId
GET /api/coupleMovies/:coupleId

# Documentación

https://peli-valoracion.vercel.app/api/docs | http://localhost:3003/api/docs

# Arquitectura

- El proyecto se realizo con una arquitectura de capas, donde tenemos rutas -> controladores -> servicios -> repositorio.
- Se usaron Middlewares para la autenticación, validación de datos y manejo de errores.
- Mongoose como ORM para MongoDB
- JWT manejado por cookies/httpOnly
- EJS como motor de plantillas (Demostración de la api)

# Autor

Jahdiel Arciniegas, https://jahdiel-arciniegas.vercel.app/, https://www.linkedin.com/in/jahdiel-arciniegas-55714125b/
