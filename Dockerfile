# Definir variable de entorno para la versión de Node.js
ARG NODE_VERSION=18-alpine

# Imagen base con Node.js y autenticación a docker hub
FROM public.ecr.aws/docker/library/node:${NODE_VERSION} as base
WORKDIR /usr/src/app

# Fase de instalación de dependencias (solo producción)
FROM base as deps
COPY package.json yarn.lock ./

# Verificar si Yarn ya está instalado antes de intentar instalarlo
RUN if ! command -v yarn >/dev/null 2>&1; then npm install -g yarn@latest; fi && \
    yarn cache clean && \
    yarn install --production --frozen-lockfile

# Fase de construcción (para transpilación)
FROM base as build
COPY package.json yarn.lock ./

RUN yarn cache clean && yarn install --frozen-lockfile

COPY . .  
RUN yarn run build

# Imagen final para ejecución
FROM base as final
RUN apk update && apk add curl
ENV NODE_ENV=production
USER node

# Copiar archivos necesarios
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./.env

# Comando de inicio
CMD ["yarn", "run", "start:prod"]





















































