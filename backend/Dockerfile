# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build:ts

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for tsx and migrations)
RUN npm ci

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
