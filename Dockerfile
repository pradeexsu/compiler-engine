FROM node:18

RUN mkdir /code
WORKDIR /code
COPY . .

RUN npm install
RUN npx prisma generate

RUN npm run build


RUN apt-get update && apt-get install -y python g++ default-jre nodejs

EXPOSE 3001
RUN rm -rf src tsconfig.json

CMD [ "node", "dist/index.js" ]
