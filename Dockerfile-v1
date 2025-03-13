# define la versión y le da un alias
# El archivo debe llamarse Dockerfile
# docker build -t mi-aplicacion:v1.0 .
# docker exec -it <nombre_o_id_del_contenedor> sh (entrar a un contenedor)
# ls para ver la lista
# cd /path/to/directory
FROM node:18-alpine as base

# Habilitar desde la terminal de la imagen, la factibilidad de descargas procesos desde una ruta remota
# La opción --no-cache le indica a apk que no guarde en caché los índices de los repositorios de paquetes después de la instalación.
RUN apk add curl bash --no-cache

# Descargar el recurso de una ruta y vincularlo a la imagen
# El f significa forzar la instalación en un 100%
# La s significa el save o descarga del recurso
# La b significa que el recurso se está descargando mediante procesamiento binario
RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

# Se establece el directorio de trabajo en /build, donde se colocarán los archivos de la aplicación.
WORKDIR /build

# Copia solo el archivo package.json al contenedor (para instalar dependencias antes de copiar todo el código, lo que ayuda con la caché de Docker).
# package.json se copia antes de npm install, permitiendo que Docker reutilice las dependencias si no han cambiado.
#COPY package.json .
# COPY package.json package-lock.json ./
COPY package.json yarn.lock ./

# Ejecuta npm install -f, instalando todas las dependencias en /build/node_modules.
#RUN npm install -f
# RUN npm install -f --production
# RUN npm ci
# Instalaciones 100% reproducibles (usa package-lock.json sin modificarlo).
#✔ Más rápido que npm install, ya que no recalcula dependencias.
# ✔ Evita errores en producción (asegura que las versiones sean las mismas que en desarrollo).
# # Instalar las dependencias de producción y desarrollo
RUN yarn install --frozen-lockfile #--production
# Evita cambios inesperados en dependencias
# Si yarn.lock ya está en el proyecto, Yarn usará exactamente esas versiones.
# Evita que Yarn descargue versiones más recientes de paquetes.
# Mejora la reproducibilidad y estabilidad
# Asegura que cualquier persona o servidor que construya la imagen use las mismas versiones.

# Copia todos los archivos de la aplicación al contenedor (incluyendo el código fuente).
COPY . .

# Ejecuta el script npm run build, que en la mayoría de los proyectos:
# Transpila código TypeScript a JavaScript.
# Minifica y optimiza los archivos.
# Genera la carpeta dist/, donde queda el código listo para producción.
# RUN npm run build
RUN yarn build

#Refrescamos y dejamos solo las de prod.
RUN yarn install --production

# Etapa 2
# Se usa otra vez la imagen ligera de Node.js 18 en Alpine Linux.
# Se le asigna el alias production.
FROM node:18-alpine as production

# Se establece el directorio de trabajo en /app, donde se colocará la aplicación.
WORKDIR /app

# Asegurarse de que Yarn esté instalado en la imagen de producción (si es necesario)
# RUN npm install -g yarn
# Docker usará la versión de yarn que está en la imagen, sin importar la versión que tengas instalada en tu máquina local.
# # Instalar una versión específica de Yarn
# RUN npm install -g yarn@1.22.10

# Se copian los archivos esenciales desde la etapa base, evitando archivos innecesarios:
# dist/ → Código listo para producción.
# node_modules/ → Dependencias ya instaladas.
# package.json → Archivo de configuración de dependencias.
# .env → Variables de entorno necesarias para la aplicación.
COPY --from=base /build/dist ./dist
COPY --from=base /build/node_modules ./node_modules
COPY --from=base /build/package.json ./package.json
COPY --from=base /build/.env ./.

#CMD ["npm", "run", "start:prod"]
CMD ["yarn", "run", "start:prod"]

