FROM node:18-alpine

WORKDIR /app

# 1️⃣ Cài deps (bao gồm prisma)
COPY package*.json ./
RUN npm install --no-audit --no-fund

# 2️⃣ Copy source
COPY . .

EXPOSE 3000

# ❗ KHÔNG prisma generate ở đây
CMD ["node", "app.js"]
