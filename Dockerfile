FROM node:8-alpine

RUN yarn install --puru-lockfile && \
    yarn build && \
    yarn install --production

CMD ["yarn", "start"]
