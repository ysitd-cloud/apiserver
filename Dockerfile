FROM node:8-alpine

COPY . /app

WORKDIR /app

RUN apk add --no-cache git && \
    yarn install --pure-lockfile && \
    yarn build && \
    yarn install --production && \
    yarn del git

CMD ["yarn", "start"]
