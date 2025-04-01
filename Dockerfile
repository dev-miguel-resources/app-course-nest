# una variable de entorno en dockerfile
ARG NODE_VERSION=18-alpine

# imagen base
FROM node:${NODE_VERSION} as base

# carpeta de datos donde dejaré los recursos de la distribución de linux: usr
WORKDIR /usr/src/app

# las dependencias del proyecto: solo la de prod.
FROM base as deps
# montajes: tipos: bind: copy
# \: hace referencia que viene otra linea, copie solo el package json
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    # mount: cache, quiero utilizar la cache de librerías para que la instalación sea más rápida
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    # Actualizamos Yarn a la última versión disponible
    RUN npm install -g yarn@latest && \
    # limpia la caché antes de la instalación
    yarn cache clean || true && \
    yarn install --production --frozen-lockfile

# transpilacion del codigo
FROM base as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    # limpio la caché antes de la instalación
    RUN yarn cache clean || true && \
    yarn install --frozen-lockfile
COPY . .
RUN yarn run build

# imagen final
FROM base as final
RUN apk add curl
ENV NODE_ENV production
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./.env

CMD yarn run start:prod



















































