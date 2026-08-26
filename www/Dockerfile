FROM node:24.18.0

RUN test "$(yarn --version)" = "1.22.22"

WORKDIR /usr/src/app

COPY package.json yarn.lock lerna.json ./
COPY animations/package.json ./animations/package.json
COPY charts/package.json ./charts/package.json
COPY core/package.json ./core/package.json
COPY icons/package.json ./icons/package.json
COPY icons-rebrand/package.json ./icons-rebrand/package.json
COPY illustrations/package.json ./illustrations/package.json
COPY react/package.json ./react/package.json
COPY tokens/package.json ./tokens/package.json
COPY utils/package.json ./utils/package.json
COPY www/package.json ./www/package.json

RUN CYPRESS_INSTALL_BINARY=0 yarn install --frozen-lockfile --non-interactive

COPY www/server ./www/server

WORKDIR /usr/src/app/www
ENV PORT=80
EXPOSE 80

CMD ["yarn", "start:server"]
