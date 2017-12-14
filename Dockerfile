FROM node:8-alpine

COPY . /app

WORKDIR /app

RUN yarn install --puru-lockfile && \
    yarn build && \
    yarn install --production

CMD ["yarn", "start"]
