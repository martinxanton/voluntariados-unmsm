# Get node image from DockerHub
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]