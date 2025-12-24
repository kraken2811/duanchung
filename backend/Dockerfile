# ================= BASE =================
FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ❌ KHÔNG chạy prisma ở build stage

# ================= DEV =================
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]

# ================= UAT =================
FROM base AS uat
ENV NODE_ENV=uat
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node app.js"]

# ================= PROD =================
FROM node:18-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node app.js"]
