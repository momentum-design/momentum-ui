FROM node:10.15.0

# install dependencies
WORKDIR /usr/src
COPY package.json yarn.lock* ./
RUN yarn cache clean && yarn

# copy app source to image _after_ npm install so that
# application code changes don't bust the docker cache of npm install step
COPY ./server /usr/src/server

# set application PORT and expose docker PORT, 80 is what Elastic Beanstalk expects
ENV PORT 80
EXPOSE 80

CMD [ "yarn", "start:server" ]
