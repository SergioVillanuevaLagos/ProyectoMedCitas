# Nombre del archivo: Dockerfile

FROM node:20-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
# En tu Dockerfile, cambia la línea de instalación por esta:
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación (necesario para producción, útil para verificar errores)
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar en modo desarrollo (hot-reload activado)
CMD ["npm", "run", "start:dev"]