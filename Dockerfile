FROM node:latest

# RUN npm install

WORKDIR /tmp


COPY package.json /tmp/
RUN  npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
# COPY [".env","/usr/src/app/"]
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/


# ENV NODE_ENV=production
ENV NODE_ENV=development
# ENV PORT=4000
# RUN npm start
CMD ["npm", "run" , "dev"]
# CMD [ "/usr/local/bin/node", "./index.js" ]

# EXPOSE 4000