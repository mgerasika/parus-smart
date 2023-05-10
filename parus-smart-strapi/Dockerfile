FROM node:14 AS builder
COPY . /app/

WORKDIR /app
RUN yarn
RUN yarn build
CMD ["yarn", "start"]

