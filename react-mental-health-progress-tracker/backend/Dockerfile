# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container.
COPY package.json package-lock.json ./

# Install app dependencies inside the container.
RUN npm install

# Copy the rest of the app code to the container.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Start the app.
CMD ["npm", "start"]
