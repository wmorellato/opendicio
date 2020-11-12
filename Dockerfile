FROM node:12

# app dir
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm install

# if building for production
RUN npm ci --only=production

# bundle source code
COPY . .

# listening port
EXPOSE 3000

# start server
CMD [ "npm", "run", "start" ]