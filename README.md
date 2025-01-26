# MERN Authentication Backend

This is a backend server for authentication built using the MERN (MongoDB, Express, React, Node.js) stack. It includes user registration, login, and protected routes with JSON Web Tokens (JWT) for secure authentication.

## Features

- User registration with hashed passwords using **bcrypt**
- Secure login with **JWT-based authentication**
- Protected routes to restrict unauthorized access
- MongoDB as the database
- CORS enabled for cross-origin resource sharing
- Environment variables for sensitive configurations

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Chamodi0206/mern_auth_backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd mern_auth_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of your project and configure the following variables:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

5. Start the MongoDB server if running locally:

   ```bash
   mongod
   ```

6. Start the application:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication Routes

1. **Register a user**
   - **POST** `/api/auth/register`
   - Request Body:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
   - Response:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **Login a user**
   - **POST** `/api/auth/login`
   - Request Body:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
   - Response:
     ```json
     {
       "token": "your_jwt_token"
     }
     ```

3. **Access protected route**
   - **GET** `/api/auth/protected`
   - Headers:
     ```
     x-access-token: <your_jwt_token>
     ```
   - Response:
     ```json
     {
       "message": "Welcome, <username>!"
     }
     ```

## Folder Structure

```
mern_auth_backend
├── config
│   └── .env           # Environment configuration file
├── models
│   └── User.js        # User schema and model
├── routes
│   └── auth.js        # Authentication routes
├── node_modules       # Node.js dependencies
├── package.json       # Project dependencies and scripts
├── server.js          # Main server file
├── .gitignore         # Git ignored files
└── .gitattributes     # Line ending normalization
```

## Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


