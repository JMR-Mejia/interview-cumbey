FROM node:14.17.3

WORKDIR /app

RUN ls -a

RUN git clone https://github.com/JMR-Mejia/interview-cumbey.git .

RUN ls -a

RUN npm install

RUN npm install -g typescript

RUN npm run build


FROM node:14.17.3

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --only=production

COPY --from=0 /app/dist ./dist

RUN npm install pm2 -g

EXPOSE 80

RUN ls -a

CMD ["pm2-runtime", "app.js"]