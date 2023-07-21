FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma

COPY .env ./

COPY tsconfig.json ./

RUN rm -rf node_modules
RUN npm install
RUN npx prisma generate
COPY . .
EXPOSE 9999

CMD ["/bin/sh", "-c", "npx prisma generate;npx prisma migrate dev --name init --preview-feature;npm run start"]
