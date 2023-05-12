FROM node:alpine
WORKDIR /patientapp
COPY ./package.json /patientapp
RUN npm install --legacy-peer-deps
COPY . /patientapp
EXPOSE 3081
CMD ["npm","start"]