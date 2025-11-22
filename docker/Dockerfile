FROM denoland/deno:2.5.6

# Fix OpenSSL issue for prisma
RUN [ ! -e /lib/libssl.so.3 ] && ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 || echo "libssl link already exists"

# Create app directory
WORKDIR /usr/src/app

# Copy the Deno configurations
COPY deno.json ./
COPY libs/prisma/deno.json ./libs/prisma/deno.json

# Install the dependencies
RUN deno install --allow-scripts

# Copy the prisma schema
COPY prisma/schema.prisma ./prisma/schema.prisma

# Generate the prisma client
RUN deno run prisma:generate

# Copy over everything else (not optimal)
COPY . .

# Run the build command which creates the compiled build
RUN deno run build

# Start the server using the compiled build
CMD [ "dist/main" ]
