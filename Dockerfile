# Definir un argumento o parámetro dinámico
ARG NODE_VERSION=18-alpine 

# Definimos nuestra imagen base
FROM node:${NODE_VERSION} as base









