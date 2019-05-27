FROM node:lts

# create app directory
RUN mkdir /app
WORKDIR /app

# install nodemon globally
RUN npm i -g nodemon 

# install dependencies
COPY package*.json /app/
RUN npm install

COPY . /app

EXPOSE 3000

CMD node www.js
