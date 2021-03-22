#stage 1 
FROM node:latest as node
WORKDIR /app
copy . .
run npm install
run npm run build --prod

#stage 2
from nginx:alpine
copy --from=node /app/dist/konesyntees-app /usr/share/nginx/html