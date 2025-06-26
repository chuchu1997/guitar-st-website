# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variable to skip API calls during build
ENV SKIP_BUILD_STATIC_GENERATION=true
ENV NODE_ENV=production

RUN npm run build

# Stage 2: Run
FROM node:22-slim 

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3900
ENV NODE_ENV=production
ENV PORT=3900
# Remove the skip flag for runtime
ENV SKIP_BUILD_STATIC_GENERATION=false

CMD ["npm", "start"]