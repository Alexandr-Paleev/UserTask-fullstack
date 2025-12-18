FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Required for legacy OpenSSL support in Node 17+ and increased memory limit
ENV NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=4096"

EXPOSE 3000

CMD ["npm", "start"]



