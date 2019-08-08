FROM node:11-alpine

WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
#TODO: do not do it in CI
RUN npm install -g nodemon 
COPY ./ ./

EXPOSE 8081

# CMD sh -c 'if [ "$IS_CI" = "true" ]; then NODE_ENV=production npm start; else npm run dev; fi'
CMD sh -c 'npm start'
