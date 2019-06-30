FROM node:12
RUN node --version
RUN npm --version
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start

