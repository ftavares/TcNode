#
# Ubuntu Node.js Dockerfile
#
# https://github.com/dockerfile/ubuntu/blob/master/Dockerfile
# https://docs.docker.com/examples/nodejs_web_app/
#

# Pull base image.
FROM node:7
# replace this with your application's default port

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD node index.js

EXPOSE 3001

