# versão LTS do node + alpine
FROM node:18-alpine
WORKDIR /backend

# Instalar dependencias e copiar o restante
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install
COPY . ./

# Expor a porta 3000
EXPOSE 3000

# Iniciar a aplicação
CMD [ "npm", "start" ]