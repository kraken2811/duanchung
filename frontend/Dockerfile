
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM nginx:alpine AS runtime

ARG APP_ENV=local
ENV APP_ENV=${APP_ENV}

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM base AS dev
ENV HOST=0.0.0.0
ENV PORT=5173
EXPOSE 5173
CMD ["npm", "start"]
