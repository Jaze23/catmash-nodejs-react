FROM node:11-alpine

WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
RUN npm install -g serve
COPY ./ ./

EXPOSE 8080

# CMD sh -c 'if [ "$IS_CI" = "true" ]; then npm run serve; else npm start; fi'
CMD sh -c 'npm run serve'
