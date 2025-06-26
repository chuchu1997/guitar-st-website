# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy source code
COPY . .

# Set build environment variables
ENV NODE_ENV=production
ENV SKIP_BUILD_STATIC_GENERATION=true
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:22-slim AS runner

WORKDIR /app


# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set runtime environment
ENV NODE_ENV=production
ENV PORT=3900
ENV SKIP_BUILD_STATIC_GENERATION=false
ENV NEXT_TELEMETRY_DISABLED=1

# Switch to non-root user
USER nextjs

EXPOSE 3900

CMD ["npm", "start"]