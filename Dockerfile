FROM node:8-alpine

COPY . /app

WORKDIR /app

RUN apk add --no-cache git && \
    yarn install --pure-lockfile && \
    yarn build && \
    yarn install --production && \
    apk del git

CMD ["yarn", "start"]
