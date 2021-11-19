# Get Node v14 as base image
FROM node:14

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from project source dir to container dir
COPY package*.json ./

# Install the dependencies into the container
RUN npm install

# Copy the source code of our application into the container
COPY . .

ENV PORT=4000

# Expose the given network port number for the container
EXPOSE 4000

# Command to run within the container
CMD ["npm", "start"]