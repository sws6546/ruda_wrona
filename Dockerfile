FROM node:22-alpine AS base

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]