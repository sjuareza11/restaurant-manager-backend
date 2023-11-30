FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --force

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]