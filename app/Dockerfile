FROM gcr.io/google-appengine/nodejs
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
# RUN npm run compile

CMD ["npm", "run", "start"]