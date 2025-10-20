# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first (caching optimization)
COPY package*.json ./
# Install dependencies (include devDependencies for building)
RUN npm install

# Copy the rest of the source code
COPY . .

# ---- Production Stage ----
FROM node:20-alpine
WORKDIR /app

# Copy only production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ ./

# Drop privileges for security (run as non-root)
USER node

# Expose port (adjust if your app uses a different port)
EXPOSE 4000

# Start the server (use "node" instead of "npm start" for efficiency)
CMD ["node", "server.js"]
