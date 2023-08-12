FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

ENV NODE_ENV production

COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
