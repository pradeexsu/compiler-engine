FROM node:16

RUN mkdir /code
WORKDIR /code

COPY package*.json  ./
RUN npm i
RUN npx prisma generate  
COPY . .
RUN npm run build

RUN apt-get update && apt-get install -y g++ default-jre python nodejs

EXPOSE 3001
RUN rm -rf src tsconfig.json

CMD [ "node", "dist/index.js" ]
