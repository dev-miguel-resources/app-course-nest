# Definimos nuestra imagen base para la app
ARG NODE_VERSION=18-alpine

FROM public.ecr.aws/docker/library/node:${NODE_VERSION} as base

# Utilizar la carpeta de datos para alojar archivos administrados propia de linux: usr
WORKDIR /usr/src/app

# Definir la gestión de las dependencias de cara a prod.
# Montajes: son para definir escenarios de pasos
# Tipos: bind (copiar recursos) y cache (evitar redundancias de ejecución)
# Si con yarn les sucede un problema con el directorio de cache vs lo del local ejecutar: yarn cache clean desde una terminal con permisos de admin
FROM base as deps
# \: hace referencia a un salto de linea y que viene una siguiente instrucción
COPY package.json yarn.lock ./
# Este es el truco para solucionar el problema de cache de yarn
# command -v: verificar un recurso existente
# !: denegación
# >/dev/null: directorio que emite una salida en caso de encontrar el recurso
# 2>&1: 2 (código de error que no lo encontró)
# 1: es para no exponer el error y propagar ese error a la siguiente sentencia
RUN if ! command -v yarn >/dev/null 2>&1; then npm install -g yarn@latest; fi && \
    yarn cache clean && \
    yarn install --production --frozen-lockfile

# Generamos la transpilación del código
FROM base as build
COPY package.json yarn.lock ./
RUN yarn cache clean && yarn install --frozen-lockfile

COPY . .
RUN yarn run build

# Definición de la imagen final
# Cuando se trabaja con multistage la que está definido al final es la imagen resultante
FROM base as final
# Instalar los permisos de llamada de la terminal del docker: instalar recursos externos o verificar estados del recurso
RUN apk update && apk add curl
# Podemos dejar descripciones a nivel de entorno para la imagen final: versiones, tags, entorno, etc...
ENV NODE_ENV production
# Definición para protección de los hackers: Cambiar el root admin. Por ej: cambias de root: /home/root a /home/node
USER node
# Debo traerme la referencia del archivo que ejecuta el script de levantamiento de la app
COPY package.json .
# Solicito el node_modules ya con solo el código de paquetes que ocupo para que la app funcione
COPY --from=deps /usr/src/app/node_modules ./node_modules
# Solicito el código fuente optimizado
COPY --from=build /usr/src/app/dist ./dist
# Solicito el traspaso de las variables de entorno
COPY --from=build /usr/src/app/.env ./.env
# Ejecutar el arrancado de la app
CMD yarn run start:prod
#CMD ["yarn", "run", "start:prod"]