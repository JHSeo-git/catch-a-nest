FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
# COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8081
CMD [ "yarn", "start" ]