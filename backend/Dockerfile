FROM node:18-alpine AS base

# ====== App dir ======
WORKDIR /app

# ====== Cài dependencies ======
COPY package*.json ./
RUN npm install

# ====== Copy source ======
COPY . .

# ====== Prisma ======
RUN npx prisma generate

# ====== Expose port ======
EXPOSE 3000

# ====== Dev command ======
CMD ["npm", "run", "dev"]


FROM base AS uat

ENV NODE_ENV=uat
EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && node app.js"]