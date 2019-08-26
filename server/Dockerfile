FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . .
# port exposed internally on container (match port exposed in mock api on frontend for consistency) 
EXPOSE 3001
CMD [ "npm", "start"  ]