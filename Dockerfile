#base image
from node:12.2.0

workdir /app

env PATH /app/node_modules/.bin:$PATH

copy package.json /app/package.json
run npm install
run npm install -g @angular/cli@7.3.9

copy . /app
cmd ng serve