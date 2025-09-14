# Estágio de build
FROM node:22-alpine AS BUILDER

WORKDIR /app

# Copia os arquivos de dependências
COPY ["./package.json", "./package-lock.json", "/app/"]

# Instala as dependências
RUN npm install

# Estágio de produção
FROM node:22-alpine

WORKDIR /app

# Copia node_modules do estágio de build
COPY --from=BUILDER ["/app/node_modules/", "/app/node_modules/"]

# Copia o código fonte da aplicação
COPY . . /app/

# Define o ponto de entrada
ENTRYPOINT [ "node", "index.js" ]