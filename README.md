# MERN TODO Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project for creating a simple TODO application. Users can perform CRUD (Create, Read, Update, Delete) operations on TODO items.

## Demo Link
- Frontend Client - https://areness-todo-app-client.onrender.com
- Backend Server - https://areness-todo-app-server.onrender.com

## Folder Structure

```
- client
    - src
        - App.js
        - index.css
    - package.json
        - contains dependencies for React.js frontend
- server
    - models
        - Todo.js
    - server.js
    - .env
    - package.json
        - contains dependencies for Node.js backend
```

## Setup

1. **MongoDB Database**: Set up a MongoDB database to store TODO items.
2. **Backend Server**: Create a Node.js backend server to handle API requests.
3. **Frontend**: Develop a React.js frontend to interact with the backend API.

## Functionality

- **Create**: Users can add new TODO items.
- **Read**: Display a list of TODO items fetched from the backend database.
- **Update**: Users can edit/update existing TODO items.
- **Delete**: Functionality to delete TODO items.

## User Interface

Design a simple user interface using React.js components. Focus on functionality rather than extensive styling.

## Backend API

Implement RESTful API endpoints for CRUD operations. Handle appropriate error responses and edge cases.

## Getting Started

1. Clone the repository: `git clone https://github.com/MYSTYX7/Areness-Todo-App.git`
2. Set up MongoDB database and provide connection URI in the server's `.env` file.
3. Navigate to the client folder: `cd client` and install dependencies: `npm install`
4. Navigate to the server folder: `cd ../server` and install dependencies: `npm install`
5. Start MongoDB server
6. Start the server: `npm start` in the server directory
7. Start the client: `npm start` in the client directory
8. Access the application in your browser at `http://localhost:3000`

## Environment Variables

Make sure to set up the following environment variables in the `.env` file located in the server directory:

```
MONGO_URL=<your-mongodb-uri>
PORT=<your-port>
```

## Contributing

Contributions are welcome! Fork the repository and submit a pull request for any enhancements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).