# Creación de la Estructura del Proyecto

## Inicia un proyecto de Node.js en tu directorio con:
```bash
npm init -y
```
## Instala las dependencias necesarias:
```
npm install express mongoose dotenv body-parser
```
## Estructura recomendada del proyecto:
```
my-api-project/
├── models/
│   └──        # Esquema del modelo Contact
├── routes/
│   └──        # Rutas relacionadas con Contact
├──            # Servidor principal y configuración de la conexión
└── .env       # Archivo para las variables de entorno
```
## Configuración de la Conexión con MongoDB
Archivo .env: Crea un archivo .env y define la URI de conexión de MongoDB. Esta cadena de conexión te permite especificar el nombre de la base de datos y otras configuraciones.

MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=3000