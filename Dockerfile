# Stage: 1: base (development)
# 1. Define la versión de la imagen y un alias stage
FROM node:18-alpine as base

# Habilitar la terminal de instalación de recursos externos (Opcional)
# Habilitar desde la terminal de la imagen, la factibilidad de descargar procesos desde la terminal de algún recurso remoto
RUN apk add curl bash --no-cache

# Descargar el recurso de una ruta y vincularlo a la imagen (Opcional)
# La f: significa asegurarse que el recurso se instale en un 100% (forzar)
# La s: significa guardar el recurso o descarga del mismo
# sh -s: guarda lo descargado a un directorio x
# --: pasar a una siguiente etapa de otro parametro
# -b: procesar el emparejamiento a un directorio lo más rápido posible (recuperar la metadata binaria)
# /usr/local/bin: recurso local de instalaciones
RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

# 2. Se establece el directorio de trabajo raíz, donde se alojarán los archivos de la aplicación
WORKDIR /build

# 3. Copiamos primero los archivos de referencia de dependencias para optimizar el control de paquetes
# ./ Hace referencia al directorio raíz de trabajo de la imagen
COPY package.json yarn.lock ./

# 4. Ejecutar la instalación de los paquetes
# frozen-lockfile: es solamente para yarn
# si están en npm: RUN npm install ci
RUN yarn install --frozen-lockfile

# 5. Copiar todos los archivos necesarios de la aplicación (código fuente)
# punto 1: la raíz de mi app
# punt 2: la raíz de la imagen
COPY . .

# 6. Ejecutar el script para transpilar el código de ts a js
# Genera la carpeta dist o build
RUN yarn build

# 7. Reconstruimos los paquetes para que no solo queden los de producción (Opcional)
# Importante: siempre debe ser después del build para no corromper dicho proceso
# Nota: Si está --production sin node-prune, se generará la exclusión pero no vendrá
# el código comprimido ni minificado
RUN yarn install --production

# Comando para generar la imagen
# docker build -t my-nest-app:v1.0 .

# Stage 2: production -> js
# Es la imagen de salida del dockerfile
FROM node:18-alpine as production

# Generamos el directorio raíz para recibir los archivos
WORKDIR /app

# Hacemos el traspaso de una imagen a otra
COPY --from=base /build/dist ./dist
COPY --from=base /build/node_modules ./node_modules
COPY --from=base /build/package.json ./package.json
COPY --from=base /build/.env ./.

# Levantar mi app con el código de js
# En la imagen final no se ocupa el RUN para ejecutar el comando de salida
CMD ["yarn", "run", "start:prod"]

