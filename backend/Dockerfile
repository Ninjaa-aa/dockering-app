# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create .env file with correct MongoDB connection string
RUN echo "MONGODB_URI=mongodb://mongodb:27017/TODO\nPORT=5000" > .env

# Set proper permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"] 