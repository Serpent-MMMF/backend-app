FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# COPY prisma ./prisma

# COPY .env ./

# COPY tsconfig.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 9999

CMD ["/bin/sh", "-c", "npx prisma generate;npx prisma migrate dev --name init --preview-feature;npm run start"]
