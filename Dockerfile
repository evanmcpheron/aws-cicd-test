# ---- base ----
FROM node:20-alpine AS base
ENV NODE_ENV=production \
    npm_config_loglevel=warn
WORKDIR /app

# ---- deps (dev+prod for building) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# ---- build ----
FROM deps AS build
COPY . .
RUN npm run build

# ---- runner (prod-only, non-root) ----
FROM node:20-alpine AS runner
ENV NODE_ENV=production \
    npm_config_loglevel=warn

# Use a dir owned by the node user
WORKDIR /home/node/app

# Install only prod deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Bring in compiled output only
COPY --from=build /app/dist ./dist

EXPOSE 4000
ENV NODE_OPTIONS=--enable-source-maps

CMD ["node", "dist/src/index.js"]
