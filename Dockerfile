FROM --platform=linux/amd64 node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

RUN chmod +x ./assets/wait-for-command.sh

EXPOSE 8080

CMD [ "yarn", "start:docker" ]
