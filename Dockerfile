FROM node:18-alpine as build

RUN mkdir -p /app/node

WORKDIR /app/node

ADD . /app/node

RUN yarn install && yarn build

FROM node:18-alpine

EXPOSE 3000

WORKDIR /app/node

COPY --from=build /app/node/.next/standalone /app/node
COPY --from=build /app/node/.next/static /app/node/.next/static
COPY --from=build /app/node/public /app/node/public

CMD ["node", "/app/node/server.js"]
