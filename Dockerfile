# Use the official Bun image for the initial stages
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine as base
WORKDIR /usr/src/app

# Install dependencies into a temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install dependencies without excluding devDependencies
# Since some dependencies might be needed for the build process
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from the temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /usr/src/app/node_modules
COPY . /usr/src/app

# Set NODE_ENV to production and run the build
ENV NODE_ENV=production
RUN bun --bun run build --preset bun

# Copy production dependencies and built files into the final image
# Start fresh from the base to reduce the final image size
FROM base AS release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/node_modules /usr/src/app/node_modules
COPY --from=prerelease /usr/src/app/.output /usr/src/app/.output
COPY package.json /usr/src/app/

# Ensure the container runs as a non-root user
USER bun

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3000/tcp

# Get Host from environment variable
# This is used to allow the container to be run on any host
ENV NUXT_HOST=0.0.0.0

# Adjusted command to directly run the server in production
# Following Nuxt's recommendation for production deployments
# Use ENTRYPOINT to ensure the environment variable is evaluated
ENTRYPOINT ["bun", "run", "/usr/src/app/.output/server/index.mjs", "--host", "$NUXT_HOST"]