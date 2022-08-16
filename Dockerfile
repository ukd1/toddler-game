FROM jarredsumner/bun:edge
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "dev"]
