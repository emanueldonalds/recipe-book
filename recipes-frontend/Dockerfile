FROM node:16.10

RUN npm install -g @angular/cli@13.3.11

WORKDIR /app

COPY *.json .
RUN npm install

COPY src src
RUN ng build --configuration=production

ENTRYPOINT ["node", "dist/app.js"]
