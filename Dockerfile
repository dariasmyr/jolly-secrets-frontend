FROM node:lts-alpine
RUN apk add ca-certificates
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . ./
RUN npm run build
CMD ["npm", "run", "start:prod"]
