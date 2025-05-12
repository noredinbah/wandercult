# Use Node.js 20 base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on (adjust if not 3000)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
