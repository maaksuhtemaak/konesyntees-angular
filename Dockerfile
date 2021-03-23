FROM node:10.16.1-alpine as builder
WORKDIR /konesyntees-app
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=builder /konesyntees-app/dist/konesyntees-app/ /usr/share/nginx/html