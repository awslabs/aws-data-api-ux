# Stage 0, based on Node.js, to build and compile Angular
FROM node:13 as node
WORKDIR /app
COPY ./angular/ /app/
RUN npm ci
RUN npm rebuild node-sass
ARG env=production
RUN npm run build -- --configuration $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine
EXPOSE 80
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf