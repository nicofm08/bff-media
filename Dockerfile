# Utiliza la imagen base de Node.js
FROM node:18-alpine

# Instala pm2 globalmente
RUN npm install -g pm2

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el contenido del directorio actual al directorio de trabajo del contenedor
COPY . .

# Si es necesario, compila el proyecto (por ejemplo, si usas TypeScript)
RUN npm run build

EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["pm2-runtime", "dist/src/main.js"]