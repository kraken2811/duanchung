# ================= BASE =================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ================= DEV =================
FROM base AS dev
ENV HOST=0.0.0.0
ENV PORT=5317
ENV DISABLE_ESLINT_PLUGIN=true
EXPOSE 5317
CMD ["npm", "start"]

# ================= BUILD (UAT / PROD) =================
FROM base AS build
ENV DISABLE_ESLINT_PLUGIN=true
RUN npm run build

# ================= RUNTIME =================
FROM nginx:alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
