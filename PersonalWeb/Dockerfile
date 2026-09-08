# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build

WORKDIR /app

# copiar dependencias primero (mejor cache)
COPY package*.json ./
RUN npm install

# copiar el resto del proyecto
COPY . .

# build de Vite
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# copiar build de Vite (IMPORTANTE: dist)
COPY --from=build /app/dist /usr/share/nginx/html

COPY public/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80