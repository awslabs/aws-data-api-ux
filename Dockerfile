# Stage 0, based on Node.js, to build and compile Angular
FROM node:14 as node
WORKDIR /app
COPY ./angular/ /app/
RUN npm install --unsafe-perm
RUN npm rebuild node-sass
ARG env=production
RUN npm run build -- --configuration $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19-alpine
EXPOSE 80
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf