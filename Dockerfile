# Define la versión de la imagen y un alias stage
# Stage: 1: base (development)
FROM node:18-alpine as base



# Stage 2: production
FROM node:18-alpine as production

