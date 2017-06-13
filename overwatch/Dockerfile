# build on top of Node 7
FROM node:7

# create a working directory
#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy dependencies
COPY package.json /usr/src/app
RUN npm install

# copy files into working dir
COPY . /usr/src/app

# build
RUN npm run build

# open port 3000
EXPOSE 3000

# start the app
CMD [ "npm", "run", "start" ]