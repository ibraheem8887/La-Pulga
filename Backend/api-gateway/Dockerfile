# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the service files
COPY . .

# Expose the service's port (same as used in server.js)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
