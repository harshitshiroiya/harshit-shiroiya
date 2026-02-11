# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application from builder (includes server + browser bundles)
COPY --from=builder /app/dist ./dist

# Copy package files for production dependencies
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

EXPOSE 4000

# Run the Angular SSR server (enables visitor tracking middleware)
CMD ["node", "dist/resume-website/server/server.mjs"]
