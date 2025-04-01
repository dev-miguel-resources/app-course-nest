# Definir un argumento o parámetro dinámico
ARG NODE_VERSION=18-alpine 

# Definimos nuestra imagen base
FROM public.ecr.aws/docker/library/node:${NODE_VERSION} as base

# Utilizar la carpeta de datos para alojar archivos administrados propia de linux: usr
WORKDIR /usr/src/app

# Definir la gestión de las dependencias de cara a prod.
FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    # Limpiar la caché de Yarn para evitar problemas con versiones antiguas
    yarn cache clean && \
    # Instalar solo las dependencias de producción
    yarn install --production

# Generamos la transpilación del código
FROM base as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    # Limpiar la caché de Yarn
    yarn cache clean && \
    # Asegurar que las dependencias se instalen con el archivo de bloqueo (yarn.lock)
    yarn install --frozen-lockfile
COPY . . 
RUN yarn run build

# Definición de la imagen final
FROM base as final
RUN apk add --no-cache curl
ENV NODE_ENV production
USER node
COPY package.json . 
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./.env
CMD yarn run start:prod


















































