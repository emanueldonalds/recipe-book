FROM node:18.20

RUN npm install -g @angular/cli@15.2.10

WORKDIR /app

COPY *.json .
RUN npm install --legacy-peer-deps

COPY src src
RUN ng build --configuration=production

ENTRYPOINT ["node", "dist/app.js"]
