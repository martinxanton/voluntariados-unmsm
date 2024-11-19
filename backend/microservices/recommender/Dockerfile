FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN npm install
RUN npm run build
EXPOSE 3003
CMD ["npm", "run", "start:prod"]
