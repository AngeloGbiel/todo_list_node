# versão LTS do node + alpine
FROM node:18-alpine as build 
WORKDIR /frontend

# Instalar dependencias 
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install

# Copiar o restante da aplicação e buildar
COPY . ./
RUN npm run build

# Expor a porta 3000
EXPOSE 4000

# Iniciar a aplicação
CMD ["npm","run","dev"]