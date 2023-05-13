FROM node:alpine
 
WORKDIR /patientapp

COPY ./ /patientapp/

RUN npm install --legacy-peer-deps

COPY . /patientapp/

CMD ["npm","start"]
