FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4-alpine

COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

COPY apache.conf /usr/local/apache2/conf/extra/portfolio.conf
RUN echo "Include conf/extra/portfolio.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80